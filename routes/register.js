const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS


/* Create a single user with user_info, class_info and school_info*/
router.post('/', (req,res,next)=> {
  const user = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid,
      name: req.body.name, 
      lastname: req.body.lastname, 
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      membersince: todaysDate,
      policies: req.body.policies,
      teachersince: req.body.teachersince,
      education: req.body.education,
      english: req.body.english,
      spanish: req.body.spanish, 
      strategies: req.body.strategies, 
      material: req.body.material, 
      timemanagement: req.body.timemanagement, 
      tech: req.body.tech, 
      instructions: req.body.instructions,
      schoolname: req.body.schoolname, 
      location: req.body.location, 
      schooltype: req.body.schooltype,  
      moodle: req.body.moodle, 
      googleclassroom: req.body.googleclassroom, 
      emails: req.body.emails, 
      books: req.body.books, 
      applications: req.body.apps, 
      socialmedia: req.body.socialmedia, 
      projector: req.body.projector, 
      computer: req.body.computer, 
      tablet: req.body.tablet, 
      stylus: req.body.stylus, 
      internet: req.body.internet, 
      smartboard: req.body.smartboard, 
      smartpencil: req.body.smartpencil, 
      speakers: req.body.speakers,
      class: req.body.class
    };
    console.log("this is the input: ", data);
    if(data.userid == null || data.name == null || data.lastname ==null || data.gender == null 
      || data.email == null || data.dob == null || data.policies == null || data.teachersince == null
      || data.education == null || data.spanish == null || data.english == null || data.schooltype == null || data.strategies == null || data.material == null || data.timemanagement == null || data.tech == null 
      ||data.instructions == null ||data.moodle == null || data.googleclassroom == null || data.emails == null || data.books == null || data.applications == null || data.socialmedia == null || data.projector == null 
      || data.computer == null || data.tablet == null || data.stylus == null || data.internet == null || data.smartboard == null || data.smartpencil == null || data.speakers == null || data.class == null || data.schoolname == null || data.location == null){
      return res.status(403).json({statusCode: 403,
          message: 'Inputs were not received as expected.',
          isBase64Encoded: false,});
    }
    console.log("data variable: ", data.class);

    var classesjson = data.class
    console.log("classjson: ", classesjson );
    if(classesjson.subject == null || classesjson.format == null || classesjson.language== null 
      || classesjson.level== null || classesjson.groupsize== null || classesjson.topica== null){
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
      return res.status(500).json({statusCode: 500, message: err});
    }
    //verify if userid or email exists in database records
    const query2 = client.query('SELECT * FROM users WHERE userid = $1 OR email = $2', [data.userid, data.email,]);
    //stream results back one row at a time
    query2.on('row', (row) => {
      resultsexist.push(row);
    });
    query2.on('end', () => {
      done();
      if (resultsexist.length  === 0){ //if userid or email doesnt exist proceed to create user
      
        //SQL Query > insert user table data
        client.query('insert into users(userid, usertype, name, lastname, gender, email, password, dob, membersince, policies) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [data.userid, 'teacher', data.name, data.lastname, data.gender, data.email, data.password, data.dob, data.membersince, data.policies]);
        
        //SQL Query > insert user_info table data
        client.query('insert into user_info(userid, teachersince, education, english, spanish, strategies, material, timemanagement, tech, instructions) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [data.userid, data.teachersince, data.education, data.english, data.spanish, data.strategies, data.material, data.timemanagement, data.tech, data.instructions]);
        
        //SQL Query > insert school_info table data
        client.query('insert into school_info(userid, name, location, schooltype, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)', [data.userid, data.schoolname, data.location, data.schooltype, data.moodle, data.googleclassroom, data.emails, data.books, data.applications, data.socialmedia, data.projector, data.computer, data.tablet, data.stylus, data.internet, data.smartboard, data.smartpencil, data.speakers]);
        
        //SQL Query > insert class_info table data
        client.query('insert into class_info(userid, subject, format, language, level, groupsize, topica, topicb, topicc) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [data.userid, classesjson.subject.toLowerCase(), classesjson.format, classesjson.language, classesjson.level, classesjson.groupsize, classesjson.topica.toLowerCase(), classesjson.topicb, classesjson.topicc]);
        
        
        //SQL Query > select data of a single user
        const query =  client.query('SELECT * FROM users WHERE userid = $1', [data.userid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
          user.push(row);
        });
        query.on('end', () => {
          done();
          //return res.json(results);
          return res.status(201).json({statusCode: 201, user});
        });
      }else//if user does exist in record send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          message: 'Userid and/or email already exists in records. Inputs were not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

module.exports = router;