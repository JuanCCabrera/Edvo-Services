const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS


/* Subscribe to a plan*/
router.post('/', (req,res,next)=> {
  const results = [];
  const resultsexist = []; 
  const userexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid,
      plan: req.body.plan, 
      couponid: req.body.couponid, 
      token: req.body.token,
    };
  //verify inputs
  if(data.userid == null || data.plan == null || data.token == null){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,});
  }
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, mesage: err});
    }
    //verify if userid exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1', [data.userid, ]);
    //stream results back one row at a time
    query1.on('row', (row) => {
      userexist.push(row);
    });
    query1.on('end', () => {
      done();
      if(userexist.length === 1){//USER IS IN DATABASE
        //verify if userid has a subscription in database records
        const query2 = client.query('SELECT * FROM subscription WHERE userid = $1', [data.userid, ]);
        //stream results back one row at a time
        query2.on('row', (row) => {
          resultsexist.push(row);
        });
        query2.on('end', () => {
          done();
          if (resultsexist.length  === 0){ //if userid doesn't have subscription cancelled, suspended or active
            //verify there is a coupon being used
            if(data.couponid != undefined){ 
              
              //SQL Query > select data of institutions
              const query =  client.query('SELECT * FROM institution WHERE institutionid = $1', [data.couponid,]);
              //stream results back one row at a time
              query.on('row', (row) => {
                results.push(row);
              });
              query.on('end', () => {
                done();
                if(results.length === 1){//if coupon is institutional
                  if(results[0].accountsused <  results[0].accounts){//verify instiution has accounts available
                    var accountsupdated = results[0].accountsused +1;
                    //SQL Query > insert user subscription into subscription table with active status
                    client.query('insert into subscription (userid, token, status, type) values ($1, $2, $3, $4)', [data.userid, data.token, 'active', data.plan,]);
                    //SQL Query > insert into coupon table
                    client.query('insert into coupons_used (couponid, userid, dateused) values ($1, $2, $3)', [data.couponid, data.userid, todaysDate,]);
                    //SQL Query > update user to include institutionid
                    client.query('UPDATE users SET institutionid = $1 WHERE userid = $2', [data.couponid, data.userid,]);
                    //SQL Query > update accounts used
                    client.query('UPDATE institution SET accountsused = $1 WHERE institutionid = $2', [accountsupdated, data.couponid,]);
              
                    return res.status(201).json({statusCode: 201});
                  }else{ //no accounts avilable for that institution
                    return res.status(402).json({statusCode: 402,
                      message: 'Institution has no accounts available for subscription.',
                      isBase64Encoded: false,});
                  }
                }
                else{
                  //SQL Query > insert user subscription into subscription table with active status
                  client.query('insert into subscription (userid, token, status, type) values ($1, $2, $3, $4)', [data.userid, data.token, 'active', data.plan,]);
                  
                  //SQL Query > insert into coupon table
                  client.query('insert into coupons_used (couponid, userid, dateused) values ($1, $2, $3)', [data.couponid, data.userid, todaysDate,]);
                  return res.status(201).json({statusCode: 201});
                }
              });
            }else{ //no coupon is used
              //SQL Query > insert user subscription into subscription table with active status
              client.query('insert into subscription (userid, token, status, type) values ($1, $2, $3, $4)', [data.userid, data.token, 'active', data.plan,]);
              return res.status(201).json({statusCode: 201});
            }
          }else// user has a subscription send error statuscode
          {
            return res.status(402).json({statusCode: 402,
              message: 'Userid already has a subscription.',
              isBase64Encoded: false,});
          }
        });
      }else//user does not exist in record send error statuscode
      {
        return res.status(401).json({statusCode: 401, 
          message: 'User does not exist in database.',
          isBase64Encoded: false,});
      }
    });
  });
});

module.exports = router;