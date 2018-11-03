const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS


/* Create a single user with user_info, class_info and school_info*/
router.post('/', (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid,
      usertype: req.body.usertype,
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
      classes: req.body.classes
    };
    var classesjson = data.classes
    var length = classesjson.length;
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
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
        client.query('insert into users(userid, usertype, name, lastname, gender, email, password, dob, membersince, policies) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [data.userid, data.usertype, data.name, data.lastname, data.gender, data.email, data.password, data.dob, data.membersince, data.policies]);
        
        // //SQL Query > insert user_info table data
        client.query('insert into user_info(userid, teachersince, education, english, spanish, strategies, material, timemanagement, tech, instructions) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [data.userid, data.teachersince, data.education, data.english, data.spanish, data.strategies, data.material, data.timemanagement, data.tech, data.instructions]);
        
        // //SQL Query > insert school_info table data
        client.query('insert into school_info(userid, name, location, schooltype, moodle, googleclassroom, emails, books, applications, socialmedia, projector, computer, tablet, stylus, internet, smartboard, smartpencil, speakers) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)', [data.userid, data.schoolname, data.location, data.schooltype, data.moodle, data.googleclassroom, data.emails, data.books, data.applications, data.socialmedia, data.projector, data.computer, data.tablet, data.stylus, data.internet, data.smartboard, data.smartpencil, data.speakers]);
        
        for(var i=0; i<length; i++){
            client.query('insert into class_info(userid, subject, format, language, level, groupsize, topica, topicb, topicc) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [data.userid, classesjson[i].subject, classesjson[i].format, classesjson[i].language, classesjson[i].level, classesjson[i].groupsize, classesjson[i].topica, classesjson[i].topicb, classesjson[i].topicc]);
        }
        
        //SQL Query > select data of a single user
        const query =  client.query('SELECT * FROM users WHERE userid = $1', [data.userid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
          results.push(row);
        });
        query.on('end', () => {
          done();
          //return res.json(results);
          return res.status(201).json({statusCode: 201, body:{results}});
        });
      }else//if user does exist in record send error statuscode
      {
        return res.status(401).json({statusCode: 401,
          body:{
            message: 'Userid and/or email already exists in records. Inputs where not received as expected.',
          },
          isBase64Encoded: false,});
      }
    });
  });
});

module.exports = router;