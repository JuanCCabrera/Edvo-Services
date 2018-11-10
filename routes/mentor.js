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

/*CREATE recommendation*/
router.post('/recommendations/create', (req,res,next)=> {
  const results = [];
  const recomidresult = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid,
      title : req.body.title,
      multimedia : req.body.multimedia,
      header : req.body.header,
      description : req.body.description,
      strategies : req.body.strategies,
      material : req.body.material,
      timemanagement : req.body.timeManagement,
      tech : req.body.tech,
      instructions : req.body.instructions,
      moodle : req.body.moodle,
      google : req.body.googleClassroom,
      emails : req.body.emails,
      books : req.body.books,
      apps : req.body.applications,
      socialmedia : req.body.socialMedia,
      projector : req.body.projector,
      computer : req.body.computer,
      tablet : req.body.tablet,
      stylus : req.body.stylus,
      internet : req.body.internet,
      smartboard : req.body.smartboard,
      smartpencil : req.body.smartpencil,
      speakers : req.body.speakers,
      topica : req.body.topicA,
      topicb : req.body.topicB,
      topicc : req.body.topicC,
      location : req.body.location,
      subject : req.body.subject,
      spanish : req.body.spanish,
      english : req.body.english,
      type : req.body.type,
      schooltype : req.body.schoolType,
      format : req.body.format,
      groupsize : req.body.groupSize,
      level : req.body.level,
      question : req.body.question,
      choices : req.body.choices
    };

  //verify no input is empty
  if(data.userid ==null || data.title ==null || data.header == null || data.description == null || data.strategies == null || data.material == null || data.timemanagement == null || data.tech == null 
    ||data.instructions == null ||data.moodle == null || data.google == null || data.emails == null || data.books == null || data.apps == null || data.socialmedia == null || data.projector == null 
    || data.computer == null || data.tablet == null || data.stylus == null || data.internet == null || data.smartboard == null || data.smartpencil == null || data.speakers == null || data.topica == null
    || data.subject == null || data.type == null || data.spanish == null || data.english == null || data.schooltype == null || data.format == null ||data.groupsize == null || data.level == null 
    || data.question == null || data.choices == null){
    return res.status(403).json({statusCode: 403,
      body:{
        message: 'Inputs were not received as expected.',
      },
      isBase64Encoded: false,});
  }
  
  var choicejson = data.choices;
  var length = choicejson.length;
  
  //verify all choices have both parameters
  for(var i=0; i<length ; i++){
    if(choicejson[i].choice == null || choicejson[i].correctanswer == null){
      return res.status(403).json({statusCode: 403,
        body:{
          message: 'Inputs were not received as expected.',
        },
        isBase64Encoded: false,});
    }
  }
  
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
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
          client.query('INSERT  into recommendation_req(recomid, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [recomid, data.moodle, data.google, data.emails, data.books, data.apps, data.socialmedia, data.projector, data.computer, data.tablet, data.stylus, data.internet, data.smartboard, data.smartpencil, data.speakers,]);
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
            return res.status(201).json({statusCode: 201, success: true});
          });
        });
      }else//if user doesn't exist in record or isnt of type mentor send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});

/*Modify recommendation*/
router.post('/recommendations/modify', (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      recomid: req.body.recomid,
      userid: req.body.userid,
      title : req.body.title,
      multimedia : req.body.multimedia,
      header : req.body.header,
      description : req.body.description,
      strategies : req.body.strategies,
      material : req.body.material,
      timemanagement : req.body.timeManagement,
      tech : req.body.tech,
      instructions : req.body.instructions,
      moodle : req.body.moodle,
      google : req.body.googleClassroom,
      emails : req.body.emails,
      books : req.body.books,
      apps : req.body.applications,
      socialmedia : req.body.socialMedia,
      projector : req.body.projector,
      computer : req.body.computer,
      tablet : req.body.tablet,
      stylus : req.body.stylus,
      internet : req.body.internet,
      smartboard : req.body.smartboard,
      smartpencil : req.body.smartpencil,
      speakers : req.body.speakers,
      topica : req.body.topicA,
      topicb : req.body.topicB,
      topicc : req.body.topicC,
      location : req.body.location,
      subject : req.body.subject,
      spanish : req.body.spanish,
      english : req.body.english,
      type : req.body.type,
      schooltype : req.body.schoolType,
      format : req.body.format,
      groupsize : req.body.groupSize,
      level : req.body.level,
      active : req.body.active,
    };

  //verify no input is empty
  if(data.recomid == null || data.userid ==null || data.title ==null || data.header == null || data.description == null || data.strategies == null || data.material == null || data.timemanagement == null || data.tech == null 
    ||data.instructions == null ||data.moodle == null || data.google == null || data.emails == null || data.books == null || data.apps == null || data.socialmedia == null || data.projector == null 
    || data.computer == null || data.tablet == null || data.stylus == null || data.internet == null || data.smartboard == null || data.smartpencil == null || data.speakers == null || data.topica == null
    || data.subject == null || data.type == null || data.spanish == null || data.english == null || data.schooltype == null || data.format == null ||data.groupsize == null || data.level == null 
    || data.active == null ){
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
            client.query('UPDATE recommendation_req SET moodle = $1, googleclassroom= $2, emails = $3, books=$4, applications=$5, socialmedia=$6, projector=$7, computer=$8, tablet=$9, stylus= $10, internet= $11, smartboard= $12, smartpencil= $13, speakers=$14 WHERE recomid=$15', [data.moodle, data.google, data.emails, data.books, data.apps, data.socialmedia, data.projector, data.computer, data.tablet, data.stylus, data.internet, data.smartboard, data.smartpencil, data.speakers, data.recomid,]);
            
            return res.status(201).json({statusCode: 201, success: true});
          }else{
            return res.status(402).json({statusCode: 402,
              body:{
                message: 'Recommendationid doesn\'t exist in records. Inputs were not received as expected.',
              },
              isBase64Encoded: false,});
          }
        });
      }else//if user doesn't exist in record or isnt of type mentor send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});


/* REMOVE recommendation*/
router.post('/recommendations/remove', (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
      recomid : req.body.recomid
    };
  if(data.userid == null || data.recomid == null){
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
            
            return res.status(201).json({statusCode: 201, success: true});
          }else{
            return res.status(402).json({statusCode: 402,
              body:{
                message: 'Recommendationid doesn\'t exist in records. Inputs were not received as expected.',
              },
              isBase64Encoded: false,});
          }
        });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});

/* ASSIGN recommendation*/
router.post('/recommendations/assign', (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
      recomid : req.body.recomid,
      usersAssign : req.body.usersToAssign
    };
  if(data.userid == null || data.recomid == null || data.usersAssign == null){
    return res.status(403).json({statusCode: 403,
      body:{
        message: 'Inputs were not received as expected.',
      },
      isBase64Encoded: false,});
  }
  var usersjson = data.usersAssign;
  var length = usersjson.length;
  
  //verify all choices have both parameters
  for(var i=0; i<length ; i++){
    if(usersjson[i].userid == null){
      return res.status(403).json({statusCode: 403,
        body:{
          message: 'Inputs for userid to assign recommendation were not received as expected.',
        },
        isBase64Encoded: false,});
    }
  }

  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
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
        //SQL Query > select recommendation active
        const query1 = client.query('SELECT * FROM recommendations WHERE recomid = $1 and active =$2',[data.recomid, true,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          resultsexist.push(row);
        });
        query1.on('end', () => {
          done();
          if(resultsexist.length === 1){ //recommendation exists and is active
            for(var i=0; i<length ; i++){
              //SQL Query > Insert into edu_recommendation
              client.query('INSERT into edu_recommendations (recomid, userid, date, read, favorite) values ($1 ,$2, $3, $4, $5)',[data.recomid, usersjson[i].userid, todaysDate, false, false]);
              }
            return res.status(201).json({statusCode: 201, success: true});
          }else{
            return res.status(402).json({statusCode: 402,
              body:{
                message: 'Recommendationid doesn\'t exist in records. Inputs were not received as expected.',
              },
              isBase64Encoded: false,});
            }
          });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});


/* ANSWER question */
router.post('/questions/answer', (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
      askeddate : req.body.askeddate,
      teacherid : req.body.teacherid,
      answer : req.body.answer
    };
  //verify inputs are valid
  if(data.userid == null || data.askeddate == null || data.teacherid == null || data.answer == null){
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
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type mentor
        //SQL Query > select question
        const query1 = client.query('SELECT * FROM questions WHERE userid = $1 AND askeddate = $2',[data.teacherid, data.askeddate,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          resultsexist.push(row);
        });
        query1.on('end', () => {
          done();
          if(resultsexist.length === 1){ //question exists
            //SQL Query > update question with answer
            client.query('UPDATE questions SET answer = $1, answerdate = $2, mentorid = $3 WHERE userid=$4 AND askeddate = $5',[data.answer, todaysDate, data.userid, data.teacherid, data.askeddate,]);
            return res.status(201).json({statusCode: 201, success: true});
          }else{
            return res.status(402).json({statusCode: 402,
              body:{
                message: 'Question doesn\'t exist in records. Inputs were not received as expected.',
              },
              isBase64Encoded: false,});
            }
          });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});

/*Unanswered Questions list */
router.get('/staff/questions', (req,res,next)=> {
  const results = [];
  const questions = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, //change to req.query.userid for testing
    };
  //verify inputs are valid
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
    //verify if user exists in database records and is of type mentor
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype= $2', [data.userid, 'mentor',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type mentor
        //SQL Query > select question
        const query1 = client.query('SELECT question, askeddate, subject, userid FROM questions WHERE answer is null ORDER BY askeddate');
        //stream results back one row at a time
        query1.on('row', (row) => {
          questions.push(row);
        });
        query1.on('end', () => {
          done();
          return res.status(201).json({statusCode: 201, success: true, questions});
        });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});

//GET recommendations created by mentor
router.get('/recommendations', (req,res,next)=> {
  const results = [];
  const recommendations = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, //change to req.query.userid for testing
    };
  //verify inputs are valid
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
          return res.status(201).json({statusCode: 201, success: true, recommendations});
        });
      }else// user doesn't exist in record or isnt of type mentor, send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'User doesn\'t exist in records or is not mentor type. Inputs were not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});

module.exports = router;