const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS


/* Subscribe to a plan*/
router.post('/', (req,res,next)=> {
  const results = [];
  const resultsexist = []; //save rows of tables that exist
  //grab data from http request
  const data = {
      userid: req.body.userid,
      plan: req.body.plan, 
      couponid: req.body.couponid, 
      token: req.body.token,
    };
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
    }
    //verify if userid or email exists in database records
    const query2 = client.query('SELECT * FROM subscription WHERE userid = $1', [data.userid, ]);
    //stream results back one row at a time
    query2.on('row', (row) => {
      resultsexist.push(row);
    });
    query2.on('end', () => {
      done();
      if (resultsexist.length  === 0){ //if userid doesn't have subscription cancelled, suspended or active
      
        //SQL Query > insert user subscription into subscription table with active status
        client.query('insert into subscription (userid, token, status, type) values ($1, $2, $3, $4)', [data.userid, data.token, 'active', data.plan,]);
        
        //SQL Query > insert into coupon table
        client.query('insert into coupons_used (couponid, userid, dateused) values ($1, $2, $3)', [data.couponid, data.userid, todaysDate,]);
        
        //SQL Query > select data of institutions
        const query =  client.query('SELECT institutionid FROM institution WHERE institutionid = $1', [data.couponid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
          results.push(row);
        });
        query.on('end', () => {
          done();
          if(results.length === 1){//if coupon is institutional
            //SQL Query > update user to include institutionid
            client.query('UPDATE users SET institutionid = $1 WHERE userid = $2', [data.couponid, data.userid,]);
        
            //-------------------------------start edit here-------------------------- 
            //------falta modificar # de cuentas usadas en la institucion
            console.log("This is the code: "+ results[0]);
          }
          
          //return res.json(results);
          //return res.status(201).json({statusCode: 201, success: true);
        });
      }else//if user does exist in record send error statuscode
      {
        return res.status(401).json({statusCode: 401, success: false,
          body:{
            message: 'Userid already has a subscription.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});

module.exports = router;