const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS


/* Modify user basic info */
router.post('/settings/info', (req,res,next)=> {
    const info = [];
    const resultsexist = [];
    //grab data from http request
    const data = {
        userid: req.body.userid, 
        name: req.body.name,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob
      };
    // get a postgres client from the connection pool
    pg.connect(connectionString, (err, client, done)=> {
      //handle connection error
      if(err){
        done();
        console.log(err);
        return res.status(500).json({statusCode: 500, success: false, data: err});
      }
      //verify if user exists in database records
      const query1 = client.query('SELECT * FROM users WHERE userid = $1', [data.userid,]);
      //stream results back one row at a time
      query1.on('row', (row) => {
        resultsexist.push(row);
      });
      query1.on('end', () => {
        done();
        if (resultsexist.length === 1){ // user exists
        
          //SQL Query > update data
          client.query('UPDATE users SET name= $1, lastname= $2, gender= $3,  dob = $4 WHERE userid = $5', [data.name, data.lastname, data.gender, data.dob, data.userid,]); 
          //SQL Query > select data
          const query = client.query('SELECT * FROM users WHERE userid = $1', [data.userid,]);
          //stream results back one row at a time
          query.on('row', (row) => {
          info.push(row);
          });
          query.on('end', () => {
            done();
            return res.status(201).json({statusCode: 201, success: true, info});
          });
        }else
        {
          return res.status(401).json({statusCode: 401,
              body:{
                message: 'User does not exists in records. Inputs where not received as expected.',
              },
              isBase64Encoded: false,});
        }
      });
    });
});

/* Get basic info*/
router.get('/settings/info', (req,res,next)=> {
  const info = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
    };
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
    }
    //verify if user exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1', [data.userid,]);
    //stream results back one row at a time
    query1.on('row', (row) => {
      info.push(row);
    });
    query1.on('end', () => {
      done();
      if (info.length === 1){ // user exists
        return res.status(201).json({statusCode: 201, success: true, info});
      }else
      {
        return res.status(401).json({statusCode: 401,
            body:{
              message: 'User does not exists in records. Inputs where not received as expected.',
            },
            isBase64Encoded: false,});
      }
    });
  });
});

/* Add institution */
router.post('/settings/institutions/add', (req,res,next)=> {
  const institution = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
      institutionid : req.body.institutionid,
      name: req.body.name.toLowerCase(),
      location: req.body.location.toLowerCase(),
      schooltype: req.body.schooltype.toLowerCase(),
      accounts: req.body.accounts
    };
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
    }
    //verify if user exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'admin']);
    //stream results back one row at a time
    query1.on('row', (row) => {
      resultsexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (resultsexist.length === 1){ // user exists and is of type admin
      
        //SQL Query > select data
        const query = client.query('SELECT * FROM institution WHERE institutionid = $1', [data.institutionid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
        institution.push(row);
        });
        query.on('end', () => {
          done();
          if(institution.length === 0){
            //SQL Query > insert data
            client.query('INSERT into institution (institutionid, name, location, schooltype, accounts, accountsused) values ($1, $2, $3, $4, $5, $6)', [data.institutionid, data.name, data.location, data.schooltype, data.accounts, 0]); 
            return res.status(201).json({statusCode: 201, success: true});
          }else{
            return res.status(402).json({statusCode: 402,
              body:{
                message: 'Institutionid is already in database. Inputs where not received as expected.',
              },
              isBase64Encoded: false,});
          }
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            body:{
              message: 'User does not exists in records or is not type admin. Inputs where not received as expected.',
            },
            isBase64Encoded: false,});
      }
    });
  });
});

/* Remove user */
router.post('/settings/users/remove', (req,res,next)=> {
  const user = [];
  const resultsexist = [];
  const tokenstripe = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
      removeid: req.body.userIDToRemove
    };
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
    }
    //verify if user exists in database records and is admin
    const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'admin']);
    //stream results back one row at a time
    query1.on('row', (row) => {
      resultsexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (resultsexist.length === 1){ // user exists and is of type admin
      
        //SQL Query > select data
        const query = client.query('SELECT * FROM users WHERE userid = $1', [data.removeid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
        user.push(row);
        });
        query.on('end', () => {
          done();
          if(user.length === 1){
            //SQL Query > update data
            const query2 = client.query('UPDATE subscription SET status = $1 WHERE userid= $2 returning token', ['cancelled', data.removeid,]);
             //stream results back one row at a time
            query2.on('row', (row) => {
              tokenstripe.push(row);
              });
            query2.on('end', () => {
              done();
              console.log("token: ", tokenstripe[0].token);//delete this after debug (this is the token variable holder)
              //-------------------------EDIT HERE----------------------------
              //REMOVE STRIPE Charging

              return res.status(201).json({statusCode: 201, success: true});
            });
          }else{
            return res.status(402).json({statusCode: 402,
              body:{
                message: 'The user to be deleted doesn\'t exist in database. Inputs where not received as expected.',
              },
              isBase64Encoded: false,});
          }
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            body:{
              message: 'User does not exists in records or is not type admin. Inputs where not received as expected.',
            },
            isBase64Encoded: false,});
      }
    });
  });
});



module.exports = router;