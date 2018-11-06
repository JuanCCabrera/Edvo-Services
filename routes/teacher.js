const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS


/*Ask a question */
router.post('/questions/ask', (req,res,next)=> {
    const results = [];
    const resultsexist = [];
    //grab data from http request
    const data = {
        userid: req.body.userid,
        subject: req.body.subject,
        question: req.body.question
      };
    // get a postgres client from the connection pool
    pg.connect(connectionString, (err, client, done)=> {
      //handle connection error
      if(err){
        done();
        console.log(err);
        return res.status(500).json({statusCode: 500, success: false, data: err});
      }
  
      //verify if user exists in database records and is teacher type
      const query2 = client.query('SELECT * FROM users WHERE userid = $1 and usertype = $2', [data.userid, 'teacher',]);
      //stream results back one row at a time
      query2.on('row', (row) => {
        resultsexist.push(row);
      });
      query2.on('end', () => {
        done();
        if (resultsexist.length === 1){ //if user exists and is teacher type
        
          //SQL Query > insert data
          client.query('INSERT into questions (askeddate, userid, subject, question, read, favorite) values ($1, $2, $3, $4, $5, $6);', [todaysDate, data.userid, data.subject, data.question, false, false,]);
          //SQL Query > select data
          const query = client.query('SELECT * FROM questions WHERE userid = $1 and askeddate = $2', [data.userid, todaysDate]);
          //stream results back one row at a time
          query.on('row', (row) => {
          results.push(row);
          });
          query.on('end', () => {
          done();
          return res.status(201).json({statusCode: 201, success: true, results});
          });
        }else
        {
          return res.status(401).json({statusCode: 401,
              body:{
                message: 'User is not of type teacher.',
              },
              isBase64Encoded: false,});
        }
      });
    });
});

/* GET questions of a user*/
router.get('/questions', (req,res,next)=> {
    const questions = [];
    const resultsexist = [];
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
        resultsexist.push(row);
      });
      query1.on('end', () => {
        done();
        if (resultsexist.length === 1){ // user exists
        
          //SQL Query > select data
          const query = client.query('SELECT * FROM questions WHERE userid = $1', [data.userid,]);
          //stream results back one row at a time
          query.on('row', (row) => {
          questions.push(row);
          });
          query.on('end', () => {
            done();
            if(questions.length > 0){
                return res.status(201).json({statusCode: 201, success: true, questions});
            }else
            {
                return res.status(403).json({statusCode: 403,
                    body:{
                    message: 'User does not have questions in records.',
                    },
                    isBase64Encoded: false,});
            }
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

/* Mark read answered question*/  
router.post('/questions/read', (req,res,next)=> {
    const results = [];
    const resultsexist = [];
    //grab data from http request
    const data = {
        userid: req.body.userid,
        askeddate: req.body.askeddate,
      };
    // get a postgres client from the connection pool
    pg.connect(connectionString, (err, client, done)=> {
      //handle connection error
      if(err){
        done();
        console.log(err);
        return res.status(500).json({statusCode: 500, success: false, data: err});
      }
  
      //verify if question exists in database records
      const query2 = client.query('SELECT * FROM questions WHERE userid = $1 and askeddate = $2', [data.userid, data.askeddate,]);
      //stream results back one row at a time
      query2.on('row', (row) => {
        resultsexist.push(row);
      });
      query2.on('end', () => {
        done();
        if (resultsexist.length === 1){ // question exists
        
          //SQL Query > update read data
          client.query('UPDATE questions SET read=$1 WHERE userid = $2 AND askeddate = $3 AND answer is not null', [true, data.userid, data.askeddate,]);
          //SQL Query > select data
          const query = client.query('SELECT * FROM questions WHERE userid = $1 and askeddate = $2', [data.userid, data.askeddate,]);
          //stream results back one row at a time
          query.on('row', (row) => {
          results.push(row);
          });
          query.on('end', () => {
          done();
          return res.status(201).json({statusCode: 201, success: true, results});
          });
        }else
        {
          return res.status(401).json({statusCode: 401,
              body:{
                message: 'Question does not exists in records. Inputs where not received as expected.',
              },
              isBase64Encoded: false,});
        }
      });
    });
});


/* Rate answered question*/  
router.post('/questions/rate', (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid,
      askeddate: req.body.askeddate,
      rate: req.body.rate
    };
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
    }

    //verify if question exists in database records
    const query2 = client.query('SELECT * FROM questions WHERE userid = $1 and askeddate = $2', [data.userid, data.askeddate,]);
    //stream results back one row at a time
    query2.on('row', (row) => {
      resultsexist.push(row);
    });
    query2.on('end', () => {
      done();
      if (resultsexist.length === 1){ //if question exists
      
        //SQL Query > update rate data
        client.query('UPDATE questions SET rate=$1 WHERE userid = $2 AND askeddate = $3 AND answer is not null', [data.rate, data.userid, data.askeddate,]);
        //SQL Query > select data
        const query = client.query('SELECT * FROM questions WHERE userid = $1 and askeddate = $2', [data.userid, data.askeddate,]);
        //stream results back one row at a time
        query.on('row', (row) => {
        results.push(row);
        });
        query.on('end', () => {
        done();
        return res.status(201).json({statusCode: 201, success: true, results});
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            body:{
              message: 'Question does not exists in records. Inputs where not received as expected.',
            },
            isBase64Encoded: false,});
      }
    });
  });
});


/* Mark read recommendation*/  
router.post('/recommendations/read', (req,res,next)=> {
    const resultsexist = [];
    //grab data from http request
    const data = {
        userid: req.body.userid,
        recomid: req.body.recomid,
      };
    // get a postgres client from the connection pool
    pg.connect(connectionString, (err, client, done)=> {
      //handle connection error
      if(err){
        done();
        console.log(err);
        return res.status(500).json({statusCode: 500, success: false, data: err});
      }
  
      //verify if recommendation exists in database records
      const query2 = client.query('SELECT * FROM edu_recommendations WHERE recomid = $1 AND userid= $2', [data.recomid, data.userid]);
      //stream results back one row at a time
      query2.on('row', (row) => {
        resultsexist.push(row);
      });
      query2.on('end', () => {
        done();
        if (resultsexist.length === 1){ // recommendation exist and is of specified user
        
          //SQL Query > update read data
          client.query('UPDATE edu_recommendations SET read=$1 WHERE recomid = $2', [true, data.recomid,]);
          
          return res.status(201).json({statusCode: 201, success: true});
        }else
        {
          return res.status(401).json({statusCode: 401,
              body:{
                message: 'Invalid recommendation. Inputs where not received as expected.',
              },
              isBase64Encoded: false,});
        }
      });
    });
});


/* Rate recommendation*/  
router.post('/recommendations/rate', (req,res,next)=> {
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid,
      recomid: req.body.recomid,
      rate: req.body.rate
    };
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done)=> {
    //handle connection error
    if(err){
      done();
      console.log(err);
      return res.status(500).json({statusCode: 500, success: false, data: err});
    }

    //verify if recommendation exists in database records
    const query2 = client.query('SELECT * FROM edu_recommendations WHERE recomid = $1 AND userid= $2', [data.recomid, data.userid]);
    //stream results back one row at a time
    query2.on('row', (row) => {
      resultsexist.push(row);
    });
    query2.on('end', () => {
      done();
      if (resultsexist.length === 1){ // recommendation exist and is of specified user
      
        //SQL Query > update read data
        client.query('UPDATE edu_recommendations SET rate=$1 WHERE recomid = $2', [data.rate, data.recomid,]);
        
        return res.status(201).json({statusCode: 201, success: true});
      }else
      {
        return res.status(401).json({statusCode: 401,
            body:{
              message: 'Invalid recommendation. Inputs where not received as expected.',
            },
            isBase64Encoded: false,});
      }
    });
  });
});


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

/* add classes */
router.post('/settings/classes/add', (req,res,next)=> {
    const classes = [];
    const resultsexist = [];
    //grab data from http request
    const data = {
        userid: req.body.userid, 
        subject: req.body.classsubject.toLowerCase(),
        format: req.body.format.toLowerCase(),
        language: req.body.language.toLowerCase(),
        level: req.body.level,
        groupsize: req.body.groupsize,
        topica: req.body.topica.toLowerCase(),
        topicb: req.body.topicb.toLowerCase(),
        topicc: req.body.topicc.toLowerCase()
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
      const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'teacher']);
      //stream results back one row at a time
      query1.on('row', (row) => {
        resultsexist.push(row);
      });
      query1.on('end', () => {
        done();
        if (resultsexist.length === 1){ // user exists and is of type teacher
        
          //SQL Query > insert data
          client.query('insert into class_info(userid, subject, format, language, level, groupsize, topica, topicb, topicc) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', [data.userid, data.subject, data.format, data.language, data.level, data.groupsize, data.topica, data.topicb, data.topicc,]); 
          //SQL Query > select data
          const query = client.query('SELECT * FROM class_info WHERE userid = $1', [data.userid,]);
          //stream results back one row at a time
          query.on('row', (row) => {
          classes.push(row);
          });
          query.on('end', () => {
            done();
            return res.status(201).json({statusCode: 201, success: true, classes});
          });
        }else
        {
          return res.status(401).json({statusCode: 401,
              body:{
                message: 'User does not exists in records or is not type teacher. Inputs where not received as expected.',
              },
              isBase64Encoded: false,});
        }
      });
    });
});

/* Remove classes*/ 
router.delete('/settings/classes/remove', (req,res,next)=> {
  const classes = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.body.userid, 
      classid: req.body.classInfoID
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
    const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, "teacher"]);
    //stream results back one row at a time
    query1.on('row', (row) => {
      resultsexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (resultsexist.length === 1){ // user exists and is of type teacher
        //SQL Query > select data
        const query = client.query('SELECT * FROM class_info WHERE userid = $1', [data.userid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
        classes.push(row);
        });
        query.on('end', () => {
          done();
          if(classes.length > 1){//if user has more than one class proceed
            //SQL Query > delete data
            client.query('DELETE FROM class_info WHERE userid= $1 AND classinfoid = $2', [data.userid, data.classid,]);
            return res.status(201).json({statusCode: 201, success: true});
          }else{
            return res.status(402).json({statusCode: 402,
              body:{
                message: 'User does not have more than one class. Invalid deleting.',
              },
              isBase64Encoded: false,});
          }
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            body:{
              message: 'User does not exists in records or is not type teacher. Inputs where not received as expected.',
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



module.exports = router;