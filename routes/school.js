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
    //verify no input is empty
    if(data.userid == null || data.name == null || data.lastname ==null || data.gender == null || data.dob == null){
      return res.status(403).json({statusCode: 403,
        body:{
          message: 'Inputs were not received as expected.',
        },
        isBase64Encoded: false,});
    }
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
                message: 'User does not exists in records. Inputs were not received as expected.',
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
   //verify inputs
   if(data.userid == null){
    return res.status(403).json({statusCode: 403,
      body:{
        message: 'Inputs were not received as expected.',
      },
      isBase64Encoded: false,});
  }
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
              message: 'User does not exists in records. Inputs were not received as expected.',
            },
            isBase64Encoded: false,});
      }
    });
  });
});


/* GET HOME PAGE*/
router.get('/home', (req,res,next)=> {
  const validuser = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
    };
   //verify inputs
   if(data.userid == null){
    return res.status(403).json({statusCode: 403,
      body:{
        message: 'Inputs were not received as expected.',
      },
      isBase64Encoded: false,});
  }
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
    }
    //verify if user exists in database records and type school
    const query = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'school',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      validuser.push(row);
    });
    query.on('end', () => {
      done();
      if (validuser.length === 1){ // user exists and is school type
        
        //edit here---------------
        //--------- add home page aggregates
        return res.status(201).json({statusCode: 201, success: true, validuser});
      }else
      {
        return res.status(401).json({statusCode: 401,
            body:{
              message: 'User does not exists in records or is not of type school. Inputs were not received as expected.',
            },
            isBase64Encoded: false,});
      }
    });
  });
});


module.exports = router;