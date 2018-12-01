const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const jwt = require('express-jwt');
const cors = require('cors');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');
const moment = require('moment');
const val= require('./validate'); //validate inputs
var stripe = require("stripe")("sk_test_ebcuCvU5u6D6hO2Uj8UEDOnI");
const connectionString = process.env.DATABASE_URL || 'postgres://root:Edv@tech18@localhost:5432/edvo1';
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

/* Modify user basic info */
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
//GET recommendations created by mentor
router.get('/recommendations', checkJwt, (req,res,next)=> {
  const results = [];
  const recommendations = [];
  //grab data from http request
  const data = {
      userid: req.user.sub, //change to req.query.userid for testing
    };
  //verify inputs are valid
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
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type mentor
        //SQL Query > select recommendations written by mentor
        const query1 = client.query('with teacher_recom as (SELECT recomid, location, subject, spanish, english, type, schooltype, format, groupsize, level, mentorid, active FROM recommendations WHERE mentorid= $1), recom_body as (SELECT rb.recomid, title, multimedia, header, description, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid), recom_target as (Select rt.recomid, strategies, material, timemanagement, tech, instructions, topica,topicb,topicc FROM recommendation_target rt INNER JOIN recommendation_topics ON rt.recomid = recommendation_topics.recomid) SELECT * FROM recom_body tr NATURAL INNER JOIN recom_target NATURAL INNER JOIN teacher_recom;', [data.userid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          recommendations.push(row);
        });
        query1.on('end', () => {
          done();
          return res.status(200).json({statusCode: 200, recommendations});
        });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

/*CREATE recommendation*/
router.post('/recommendations/create', checkJwt, (req,res,next)=> {
  const results = [];
  const recomidresult = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,
      title : req.body.title,
      multimedia : req.body.multimedia,
      header : req.body.header,
      description : req.body.description,
      strategies : req.body.strategies,
      material : req.body.material,
      timemanagement : req.body.timemanagement,
      tech : req.body.tech,
      instructions : req.body.instructions,
      moodle : req.body.moodle,
      googleclassroom : req.body.google,
      emails : req.body.emails,
      books : req.body.books,
      apps : req.body.applications,
      socialmedia : req.body.socialmedia,
      projector : req.body.projector,
      computer : req.body.computer,
      tablet : req.body.tablet,
      stylus : req.body.stylus,
      internet : req.body.internet,
      smartboard : req.body.smartboard,
      smartpencil : req.body.smartpencil,
      speakers : req.body.speakers,
      topica : req.body.topica,
      topicb : req.body.topicb,
      topicc : req.body.topicc,
      location : req.body.location,
      subject : req.body.subject,
      spanish : req.body.spanish,
      english : req.body.english,
      type : req.body.type,
      schooltype : req.body.schooltype,
      format : req.body.format,
      groupsize : req.body.size,
      level : req.body.level,
      question : req.body.question,
      choices : req.body.choices
    };
  //verify no input is empty
  if(val.validateUserID(data.userid) || val.validateLongText(data.title) || val.validateLongText(data.header) || val.validateLongText(data.description) || val.validateNoSpace(data.schooltype) || val.validateBool(data.strategies) || val.validateBool(data.material) || val.validateBool(data.timemanagement) || val.validateBool(data.tech) 
  || val.validateBool(data.instructions) || val.validateBool(data.moodle) || val.validateBool(data.googleclassroom) || val.validateBool(data.emails) || val.validateBool(data.books) || val.validateBool(data.apps) || val.validateBool(data.socialmedia) || val.validateBool(data.projector) 
  || val.validateBool(data.computer) || val.validateBool(data.tablet) || val.validateBool(data.stylus) || val.validateBool(data.internet) || val.validateBool(data.smartboard) || val.validateBool(data.smartpencil) || val.validateBool(data.speakers) || val.validateLongText(data.topica)
    || val.validateLongText(data.subject) || val.validateStrings(data.type) || val.validateBool(data.spanish) || val.validateBool(data.english) || val.validateLongText(data.format) || val.validateGroup(data.groupsize) || val.validateLevel(data.level) 
    || val.validateLongText(data.question) || val.validateLongText(data.choices) || !Array.isArray(data.choices) ){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,});
  }
  
  var choicejson = data.choices;
  var length = choicejson.length;
  
  //verify all choices have both parameters
  for(var i=0; i<length ; i++){
    if(val.validateLongText(choicejson[i].choice) || val.validateBool(choicejson[i].correctanswer)){
      return res.status(403).json({statusCode: 403,
          message: 'Inputs were not received as expected.',
        isBase64Encoded: false,});
    }
  }
  
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, data: err});
    }
    //verify if mentorid exists in database records and is of type menotr
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      resultsexist.push(row);
    });
    query.on('end', () => {
      done();
      if (resultsexist.length  === 1){ //user exists and is of type mentor
      
        //SQL Query > insert recommendation into table recommendations
        const query1 = client.query('INSERT into recommendations (location, subject, spanish, english, type, schooltype, format, groupsize, level, mentorid, active) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING recomid', [data.location, data.subject, data.spanish, data.english, data.type, data.schooltype, data.format, data.groupsize, data.level, data.userid, true,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          recomidresult.push(row);
        });
        query1.on('end', () => {
          done();
          var recomid = recomidresult[0].recomid;
          //SQL Query > insert into recommendation_topics
          client.query('INSERT into recommendation_topics (recomid, topica,topicb,topicc) values ($1, $2, $3, $4)', [recomid, data.topica, data.topicb, data.topicc,]);
          //SQL QUERY > insert into recommendation_target
          client.query('INSERT  into recommendation_target(recomid, strategies, material, timemanagement, tech, instructions) values ($1, $2, $3, $4, $5, $6)', [recomid, data.strategies, data.material, data.timemanagement, data.tech, data.instructions,]);
          //SQL query > insert into recommendation_body
          client.query('INSERT  into recommendation_body (recomid, title, multimedia, header, description) values ($1, $2, $3, $4, $5)', [recomid, data.title, data.multimedia, data.header, data.description]);
          //SQL query > insert into recommendation_req
          client.query('INSERT  into recommendation_req(recomid, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [recomid, data.moodle, data.googleclassroom, data.emails, data.books, data.apps, data.socialmedia, data.projector, data.computer, data.tablet, data.stylus, data.internet, data.smartboard, data.smartpencil, data.speakers,]);
          //SQL query > insert into quiz_question
          const query2 = client.query('INSERT into quiz_question (question, recomid) values ($1, $2) RETURNING quizquestionid;', [data.question, recomid,]);
          //stream results back one row at a time
          query2.on('row', (row) => {
            results.push(row);
          });
          query2.on('end', () => {
            done();
            var qqid = results[0].quizquestionid; //quizquestionid for choices
            for(var i=0; i<length; i++){
              client.query('INSERT into quiz_question_choice (quizquestionid, choice, correctanswer) values ($1, $2, $3)', [qqid, choicejson[i].choice, choicejson[i].correctanswer,]);
            }
            return res.status(201).json({statusCode: 201});
          });
        });
      }else//if user doesn't exist in record or isnt of type mentor send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

/*Modify recommendation*/
router.post('/recommendations/modify', checkJwt, (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,
      recomid: req.body.recomid,
      title : req.body.title,
      multimedia : req.body.multimedia,
      header : req.body.header,
      description : req.body.description,
      strategies : req.body.strategies,
      material : req.body.material,
      timemanagement : req.body.timemanagement,
      tech : req.body.tech,
      instructions : req.body.instructions,
      moodle : req.body.moodle,
      googleclassroom : req.body.google,
      emails : req.body.emails,
      books : req.body.books,
      apps : req.body.applications,
      socialmedia : req.body.socialmedia,
      projector : req.body.projector,
      computer : req.body.computer,
      tablet : req.body.tablet,
      stylus : req.body.stylus,
      internet : req.body.internet,
      smartboard : req.body.smartboard,
      smartpencil : req.body.smartpencil,
      speakers : req.body.speakers,
      topica : req.body.topica,
      topicb : req.body.topicb,
      topicc : req.body.topicc,
      location : req.body.location,
      subject : req.body.subject,
      spanish : req.body.spanish,
      english : req.body.english,
      type : req.body.type,
      schooltype : req.body.schooltype,
      format : req.body.format,
      groupsize : req.body.size,
      level : req.body.level,
      active : true
    };
  //verify no input is empty
  if(val.validateInt(data.recomid) || val.validateUserID(data.userid) || val.validateLongText(data.title) || val.validateLongText(data.header) || val.validateLongText(data.description) || val.validateBool(data.strategies) || val.validateBool(data.material) || val.validateBool(data.timemanagement) || val.validateBool(data.tech) 
  || val.validateBool(data.instructions) || val.validateBool(data.moodle) || val.validateBool(data.googleclassroom) || val.validateBool(data.emails) || val.validateBool(data.books) || val.validateBool(data.apps) || val.validateBool(data.socialmedia) || val.validateBool(data.projector) 
  || val.validateBool(data.computer) || val.validateBool(data.tablet) || val.validateBool(data.stylus) || val.validateBool(data.internet) || val.validateBool(data.smartboard) || val.validateBool(data.smartpencil) || val.validateBool(data.speakers) || val.validateLongText(data.topica)
  || val.validateLongText(data.subject) || val.validateLongText(data.type) || val.validateBool(data.spanish) || val.validateBool(data.english) || val.validateLongText(data.format) || val.validateGroup(data.groupsize) || val.validateLevel(data.level) || val.validateBool(data.active)){
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
    //verify if mentorid exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      resultsexist.push(row);
    });
    query.on('end', () => {
      done();
      if (resultsexist.length  === 1){ //user exists and is of type mentor
        //SQL Query > select recommendation
        const query1 = client.query('SELECT * FROM recommendations WHERE recomid = $1',[data.recomid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          results.push(row);
        });
        query1.on('end', () => {
          done();
          if(results.length === 1){ //recommendation exists
            //SQL Query > UPDATE recommendation into table recommendations
            client.query('UPDATE recommendations SET location=$1, subject = $2, spanish=$3, english = $4, type=$5, schooltype=$6, format= $7, groupsize =$8, level=$9, mentorid=$10, active = $11 WHERE recomid =$12', [data.location, data.subject, data.spanish, data.english, data.type, data.schooltype, data.format, data.groupsize, data.level, data.userid, data.active, data.recomid]);
            //SQL Query > update into recommendation_topics
            client.query('UPDATE recommendation_topics SET topica=$1, topicb= $2, topicc=$3 WHERE recomid =$4', [data.topica, data.topicb, data.topicc,data.recomid,]);
            //SQL QUERY > update into recommendation_target
            client.query('UPDATE recommendation_target SET strategies= $1, material = $2, timemanagement=$3, tech= $4, instructions= $5 WHERE recomid =$6', [data.strategies, data.material, data.timemanagement, data.tech, data.instructions, data.recomid,]);  
            //SQL query > UPDATE into recommendation_body
            client.query('UPDATE recommendation_body SET title= $1, multimedia = $2, header= $3, description = $4 WHERE recomid =$5', [data.title, data.multimedia, data.header, data.description, data.recomid,]); 
            //SQL query > UPDATE into recommendation_req
            client.query('UPDATE recommendation_req SET moodle = $1, googleclassroom= $2, emails = $3, books=$4, applications=$5, socialmedia=$6, projector=$7, computer=$8, tablet=$9, stylus= $10, internet= $11, smartboard= $12, smartpencil= $13, speakers=$14 WHERE recomid=$15', [data.moodle, data.googleclassroom, data.emails, data.books, data.apps, data.socialmedia, data.projector, data.computer, data.tablet, data.stylus, data.internet, data.smartboard, data.smartpencil, data.speakers, data.recomid,]);
            
            return res.status(201).json({statusCode: 201});
          }else{
            return res.status(402).json({statusCode: 402,
              message: 'Recommendationid doesn\'t exist in records. Inputs were not received as expected.',
              isBase64Encoded: false,});
          }
        });
      }else//if user doesn't exist in record or isnt of type mentor send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

/* REMOVE recommendation*/
router.post('/recommendations/remove', checkJwt, (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub, 
      recomid : req.body.recomid
    };
  if(val.validateUserID(data.userid) || val.validateInt(data.recomid)){
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
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type mentor
        //SQL Query > select recommendation
        const query1 = client.query('SELECT * FROM recommendations WHERE recomid = $1',[data.recomid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          resultsexist.push(row);
        });
        query1.on('end', () => {
          done();
          if(resultsexist.length === 1){ //recommendation exists
            //SQL Query > UPDATE recommendation into table recommendations
            client.query('UPDATE recommendations SET active = $1 WHERE recomid =$2', [false, data.recomid]);
            
            return res.status(200).json({statusCode: 200});
          }else{
            return res.status(402).json({statusCode: 402,
              message: 'Recommendationid doesn\'t exist in records. Inputs were not received as expected.',
              isBase64Encoded: false,});
          }
        });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});



/* ASSIGN recommendation*/
router.post('/recommendations/assign', checkJwt, (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  const uservalid = [];
  //grab data from http request
  const data = {
      userid: req.user.sub, 
      recomid : req.body.recomid,
      usersAssign : req.body.usersToAssign
    };
  //verify inputs are valid
  if(val.validateUserID(data.userid) || val.validateInt(data.recomid) || val.validateUserID(data.usersAssign)){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,});
  }
  // var usersjson = data.usersAssign;
  // var length = usersjson.length;
  
  // //verify all choices have both parameters
  // for(var i=0; i<length ; i++){
  //   if(usersjson[i].userid)){
  //     return res.status(403).json({statusCode: 403,
  //         message: 'Inputs for userid to assign recommendation were not received as expected.',
  //       isBase64Encoded: false,});
  //   }
  // }

  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, data: err});
    }
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type mentor
        //verify if user exists in database records and is of type teacher
        const query2 = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.usersAssign, 'teacher',]);
        //stream results back one row at a time
        query2.on('row', (row) => {
          uservalid.push(row);
        });
        query2.on('end', () => {
          done();
          console
          if (uservalid.length === 1){ // user exists and is of type teacher

            //SQL Query > select recommendation active
            const query1 = client.query('SELECT * FROM recommendations WHERE recomid = $1 AND active = $2',[data.recomid, true,]);
            //stream results back one row at a time
            query1.on('row', (row) => {
              resultsexist.push(row);
            });
            query1.on('end', () => {
              done();
              if(resultsexist.length === 1){ //recommendation exists and is active
                  //SQL Query > Insert into edu_recommendation
                  client.query('INSERT into edu_recommendations (recomid, userid, date, read, favorite) values ($1 ,$2, $3, $4, $5)',[data.recomid, data.usersAssign, todaysDate, false, false]);
                return res.status(201).json({statusCode: 201});
              }else{
                return res.status(403).json({statusCode: 403,
                  message: 'Recommendationid doesn\'t exist in records. Inputs were not received as expected.',
                  isBase64Encoded: false,});
              }
            });
          }else{//user to asign isnt teacher or doesnt exist
            return res.status(401).json({statusCode: 401,
              message: 'User to assign doesn\'t exist in records or is not teacher type. Inputs were not received as expected.',
              isBase64Encoded: false,});
          }
        });

      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

//GET users to assign recomendation
//this users must have not been assigned a recomendation in the last 7 days
router.get('/recommendations/users', checkJwt, (req,res,next)=> {
  const results = [];
  const users = [];
  //grab data from http request
  const data = {
      userid: req.user.sub, //change to req.query.userid for testing
    };
  //verify inputs are valid
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
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type mentor
        //SQL Query > select users with no recommendation in last 7 days and active subscription
        const query1 = client.query('with userlist as (SELECT users.userid, institutionid, usertype, name, lastname, email FROM users WHERE usertype = $1), newlist as (SELECT userlist.userid, institutionid, usertype, name, lastname, email, status FROM userlist NATURAL INNER JOIN subscription WHERE status = $2), needsOfUser as (SELECT english, spanish, strategies, material, timemanagement, tech, instructions, user_info.userid, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM user_info natural inner join school_info) SELECT userid, institutionid, usertype, name, lastname, email, classinfoid, subject, format, language, level, groupsize, topica, topicb, topicc, strategies, tech, instructions, timemanagement, material, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM newlist NATURAL INNER JOIN needsOfUser natural inner join class_info WHERE userid NOT IN (SELECT userid FROM edu_recommendations WHERE date > (now() - INTERVAL \'7 DAYS\' ))', ['teacher','active',]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          users.push(row);
        });
        query1.on('end', () => {
          done();
          return res.status(200).json({statusCode: 200, users});
        });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

//GET recommendations to assign to a user
router.get('/user/recommendations', checkJwt, (req, res, next) => {
  const results = [];
  const userValid = [];
  const recommendations = [];
  //grab data from http request
  const data = {
    userid: req.user.sub, //change to req.query.userid for testing
    userToAssign: req.query.userToAssign
  };
    //verify inputs are valid
    if(val.validateUserID(data.userid) || val.validateUserID(data.userToAssign)){
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
      //verify if user exists in database records and is of type mentor
      const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
      //stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        if (results.length === 1){ // user exists and is of type mentor
          //SQL Query > verify user to assign recommendation exist and is teacher type
          const query1 = client.query('SELECT * FROM users WHERE userid=$1 AND usertype = $2', [data.userToAssign, 'teacher',]);
          //stream results back one row at a time
          query1.on('row', (row) => {
            userValid.push(row);
          });
          query1.on('end', () => {
            done();
            if(userValid.length === 1){ //user to assign to exists and is a teacher
              //SQL Query > select recommendations not asigned to the user selected and that apply
              const query2 = client.query('WITH fullunassignedrecomlist as (SELECT * FROM recommendations natural inner join recommendation_topics natural inner join recommendation_target natural inner join recommendation_body natural inner join recommendation_req WHERE active = true AND recomid not in (SELECT recomid FROM edu_recommendations WHERE userid = $1)), userinfo as (with school as (select userid, name as schoolname, location, schooltype, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers FROM school_info) SELECT * FROM users natural inner join user_info natural inner join class_info natural inner join school WHERE userid = $1) SELECT recomid, frec.location, frec.subject, frec.spanish, frec.english, frec.type, frec.schooltype, frec.format, frec.groupsize, frec.level, frec.active, frec.topica, frec.topicb, frec.topicc, frec.strategies, frec.material, frec.timemanagement, frec.tech, frec.instructions, frec.title, frec.multimedia, frec.header, frec.description, frec.moodle, frec.googleclassroom, frec.emails, frec.books, frec.applications, frec.socialmedia, frec.projector, frec.computer, frec.tablet, frec.stylus, frec.internet, frec.smartboard, frec.smartpencil, frec.speakers FROM fullunassignedrecomlist as frec inner join userinfo as ui ON  (frec.moodle = ui.moodle AND frec.googleclassroom= ui.googleclassroom AND frec.emails = ui.emails AND frec.books = ui.books AND frec.applications = ui.applications AND frec.socialmedia = ui.socialmedia AND frec.projector = ui.projector AND frec.computer = ui.computer AND frec.tablet = ui.tablet AND frec.stylus = ui.stylus AND frec.internet = ui.internet AND frec.smartboard = ui.smartboard AND frec.smartpencil = ui.smartpencil AND frec.speakers = ui.speakers) AND (frec.strategies = ui.strategies OR frec.material = ui.material OR frec.timemanagement = ui.timemanagement OR frec.tech= ui.tech OR frec.instructions = ui.instructions)', [data.userToAssign,]);
              //stream results back one row at a time
              query2.on('row', (row) => {
                recommendations.push(row);
              });
              query2.on('end', () => {
                done();
                return res.status(200).json({statusCode: 200, recommendations});
              });
            }else{
              return res.status(401).json({statusCode: 401,
                  message: 'User to assign recomendation doesn\'t exist in records or is not teacher type. Inputs were not received as expected.',
                isBase64Encoded: false,});
            }
          });
        }else// user doesn't exist in record or isnt of type mentor, send error statuscode
        {
          return res.status(401).json({statusCode: 401,
              message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
            isBase64Encoded: false,});
        }
      });
    });
  });

/* ANSWER question */
router.post('/questions/answer', checkJwt, (req, res, next) => {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
    userid: req.user.sub,
    askeddate: moment(req.body.askeddate).format("YYYY-MM-DD HH:mm:ss"),
    teacherid: req.body.teacherid,
    answer: req.body.answer
  };
  //verify inputs are valid
  if(val.validateUserID(data.userid) || val.validateTime(data.askeddate) || val.validateUserID(data.teacherid) || val.validateLongText(data.answer)){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,});
  }
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //handle connection error
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ statusCode: 500, data: err });
    }
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1) { // user exists and is of type mentor
        //SQL Query > select question
        const query1 = client.query('SELECT * FROM questions WHERE userid = $1 AND askeddate = $2', [data.teacherid, data.askeddate,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          resultsexist.push(row);
        });
        query1.on('end', () => {
          done();
          if (resultsexist.length === 1) { //question exists
            //SQL Query > update question with answer
            client.query('UPDATE questions SET answer = $1, answerdate = $2, mentorid = $3 WHERE userid=$4 AND askeddate = $5', [data.answer, todaysDate, data.userid, data.teacherid, data.askeddate,]);
            return res.status(201).json({ statusCode: 201 });
          } else {
            return res.status(402).json({
              statusCode: 402,
              message: 'Question doesn\'t exist in records. Inputs were not received as expected.',
              isBase64Encoded: false,
            });
          }
        });
      } else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({
          statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,
        });
      }
    });
  });
});

/* REMOVE question*/
router.delete('/questions/remove', checkJwt, (req, res, next) => {
  const resultsexist = [];
  const userexist = [];
  //grab data from http request
  const data = {
    usermentor: req.user.sub,
    userid: req.body.userid,
    askeddate: moment(req.body.askeddate).format("YYYY-MM-DD HH:mm:ss")
  };

  //verify inputs
  if (val.validateUserID(data.userid) || val.validateUserID(data.usermentor) || val.validateTime(data.askeddate)) {
    return res.status(403).json({
      statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,
    });
  }
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //handle connection error
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ statusCode: 500, message: err });
    }

    //verify if user exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.usermentor, 'mentor']);
    //stream results back one row at a time
    query1.on('row', (row) => {
      userexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (userexist.length === 1) { // user exists and is of type mentor
        //verify if question exists in database records
        const query2 = client.query('SELECT * FROM questions WHERE userid = $1 and askeddate = $2', [data.userid, data.askeddate]);
        //stream results back one row at a time
        query2.on('row', (row) => {
          resultsexist.push(row);
        });
        query2.on('end', () => {
          done();
          if (resultsexist.length === 1) { // question exists

            //SQL Query > update read data
            client.query('DELETE FROM questions WHERE userid = $1 AND askeddate = $2', [data.userid, data.askeddate,]);
            return res.status(200).json({ statusCode: 200 });
          } else {
            return res.status(401).json({
              statusCode: 401,
              message: 'Question does not exists in records. Inputs where not received as expected.',
              isBase64Encoded: false,
            });
          }
        });
      } else {
        return res.status(401).json({
          statusCode: 401,
          message: 'User does not exists in records or is not a teacher. Inputs where not received as expected.',
          isBase64Encoded: false,
        });
      }
    });
  });
});

/*Unanswered Questions list */
router.get('/staff/questions', checkJwt, (req, res, next) => {
  const results = [];
  const questions = [];
  //grab data from http request
  const data = {
    userid: req.user.sub, //change to req.query.userid for testing
  };
  //verify inputs are valid
  if(val.validateUserID(data.userid)){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,});
  }
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //handle connection error
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ statusCode: 500, data: err });
    }
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1) { // user exists and is of type mentor
        //SQL Query > select question
        const query1 = client.query('SELECT question, askeddate, subject, userid FROM questions WHERE answer is null ORDER BY askeddate');
        //stream results back one row at a time
        query1.on('row', (row) => {
          questions.push(row);
        });
        query1.on('end', () => {
          done();
          return res.status(200).json({ statusCode: 200, questions });
        });
      } else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({
          statusCode: 401,
          message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          isBase64Encoded: false,
        });
      }
    });
  });
});
module.exports = router;
