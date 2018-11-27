const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const jwt = require('express-jwt');
const cors = require('cors');
const jwksRsa = require('jwks-rsa');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://edvo-test.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
  issuer: `https://edvo-test.auth0.com/`,
  algorithms: ['RS256']
});

router.post('/settings/info', checkJwt, (req,res,next)=> {
  const info = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub, 
      name: req.body.name,
      lastname: req.body.lastname,
      gender: req.body.gender,
      dob: req.body.dob
    };
  //verify no input is empty
  if(val.validateUserID(data.userid) || val.validateLongText(data.name) || val.validateLongText(data.lastname) || val.validateNoSpace(data.gender) || val.validateDate(data.dob)){
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
      return res.status(500).json({statusCode: 500, data: err});
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
        const query = client.query('SELECT userid, name, lastname, dob, gender, email FROM users WHERE userid = $1', [data.userid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
        info.push(row);
        });
        query.on('end', () => {
          done();
          return res.status(201).json({statusCode: 201, info});
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'User does not exists in records. Inputs were not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});

/* Get basic info*/
router.get('/settings/info', checkJwt,(req,res,next)=> {
  const info = [];
  //grab data from http request
  const data = {
      userid: req.user.sub
    };
  //verify no input is empty
  if(val.validateUserID(data.userid) ){
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
      return res.status(500).json({statusCode: 500, data: err});
    }
    //verify if user exists in database records
    const query1 = client.query('SELECT userid, name, lastname, dob, gender, email FROM users WHERE userid = $1', [data.userid,]);
    //stream results back one row at a time
    query1.on('row', (row) => {
      info.push(row);
    });
    query1.on('end', () => {
      done();
      if (info.length === 1){ // user exists
        return res.status(200).json({statusCode: 200 , info: info[0]});
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'User does not exists in records. Inputs were not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});

/* GET HOME PAGE*/
router.get('/home', checkJwt, (req,res,next)=> {
  const validuser = [];
  const teachersdays = [];
  const averageQuestionsRate = [];
  const averageRecommendationsRate = [];
  const toptargets = [];
  const toptargetsordered = [];
  //grab data from http request
  const data = {
      userid: req.user.sub, 
    };
   //verify inputs
   if(val.validateUserID(data.userid)){
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
      return res.status(500).json({statusCode: 500, data: err});
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
        //SQL Query > get number of days teachers have logged in to platform
        const query1 = client.query('SELECT count(distinct date) as teachersdays FROM log_record WHERE userid in (SELECT userid FROM users WHERE institutionid = $1)', [validuser[0].institutionid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          teachersdays.push(row);
        });
        query1.on('end', () => {
          done();
          //SQL Query > get average questions rate
          const query2 = client.query('SELECT ROUND(AVG(rate::smallint), 1) as averagequestionsrate FROM questions WHERE userid in (SELECT userid FROM users WHERE institutionid = $1)', [validuser[0].institutionid,]);
          //stream results back one row at a time
          query2.on('row', (row) => {
            averageQuestionsRate.push(row);
          });
          query2.on('end', () => {
            done();
            
            //SQL Query > get average recommendations rate
            const query3 = client.query('SELECT ROUND(AVG(rate::smallint), 1) as averagerecommendationsrate FROM edu_recommendations WHERE userid in (SELECT userid FROM users WHERE institutionid = $1)', [validuser[0].institutionid,]);
            //stream results back one row at a time
            query3.on('row', (row) => {
              averageRecommendationsRate.push(row);
            });
            query3.on('end', () => {
              done();
              //SQL Query > get count of true targets counts for teachers
              const query4 = client.query('with mat as (SELECT count(material) as materialtrue FROM user_info WHERE userid in (SELECT userid FROM users WHERE institutionid = $1) AND material = true), tech as (SELECT count(tech) as techtrue FROM user_info WHERE userid in (SELECT userid FROM users WHERE institutionid = $2) AND tech = true), strat as (SELECT count(strategies) as strategiestrue FROM user_info WHERE userid in (SELECT userid FROM users WHERE institutionid = $3) AND strategies = true), tim as (SELECT count(timemanagement) as timemanagementtrue FROM user_info WHERE userid in (SELECT userid FROM users WHERE institutionid = $4) AND timemanagement = true), ins as (SELECT count(instructions) as instructionstrue FROM user_info WHERE userid in (SELECT userid FROM users WHERE institutionid = $5) AND instructions = true) SELECT * FROM mat natural inner join tech natural inner join strat natural inner join tim natural inner join ins', [validuser[0].institutionid, validuser[0].institutionid, validuser[0].institutionid, validuser[0].institutionid, validuser[0].institutionid,]);
              //stream results back one row at a time
              query4.on('row', (row) => {
                toptargets.push(row);
              });
              query4.on('end', () => {
                done();
                //SQL Query > get ordered top targets on temporary table
                client.query('CREATE TEMP TABLE toptargets(target varchar(30),value bigint)');
                client.query('INSERT into toptargets values (\'Updated Material\', $1)', [toptargets[0].materialtrue,]);
                client.query('INSERT into toptargets values (\'Technology Integration\', $1)', [toptargets[0].techtrue,]);
                client.query('INSERT into toptargets values (\'Teaching Strategies\', $1)', [toptargets[0].strategiestrue,]);
                client.query('INSERT into toptargets values (\'Time Management\', $1)', [toptargets[0].timemanagementtrue,]);
                client.query('INSERT into toptargets values (\'Instruction Alignment\', $1)', [toptargets[0].instructionstrue,]);
                const query5 = client.query('SELECT * FROM toptargets ORDER BY value DESC LIMIT 3');
                client.query('DROP TABLE toptargets');
                //stream results back one row at a time
                query5.on('row', (row) => {
                  toptargetsordered.push(row);
                });
                query5.on('end', () => {
                  done();
                  return res.status(200).json({statusCode: 200, teachersdays: teachersdays[0].teachersdays, averageQuestionsRate: averageQuestionsRate[0].averagequestionsrate, averageRecommendationsRate: averageRecommendationsRate[0].averagerecommendationsrate, toptargetsordered});
                });
              });
            });
          });
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'User does not exists in records or is not of type school. Inputs were not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});


module.exports = router;