const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const jwt = require('express-jwt');
const cors = require('cors');
const val= require('./validate'); //validate inputs 
const jwksRsa = require('jwks-rsa');
const moment = require('moment');
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
/*teachers homepage */
router.get('/home', checkJwt, (req, res, next) => {
  const results = [];
  const resultsexist = [];
  const logs = [];
  var daysInPlatforms = 0;
  var questionsasked = 0;
  const recomCount = [];
  var recommendationsRead = 0;
  const topRecommendations = [];
  const recentRecommendations = [];
  const status = [];

  //grab data from http request
  const data = {
      userid: req.user.sub, //change to req.query.userid for testing
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
      return res.status(500).json({statusCode: 500, message: err});
    }

    //verify if user exists in database records and is teacher type
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype = $2', [data.userid, 'teacher',]);
    //stream results back one row at a time
    query.on('row', (row) => {
      resultsexist.push(row);
    });
    query.on('end', () => {
      done();
      if (resultsexist.length === 1){ //user exists and is teacher type
        //SQL QUERY > aggregate count of questionsasked
        const query1 = client.query('Select count(question) as questionsasked from questions where userid = $1', [data.userid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          results.push(row);
        });
        query1.on('end', () => {
          done();
          questionsasked = results[0].questionsasked;
          //SQL QUERY > aggregate count of recommendations read
          const query2 = client.query('SELECT count(recomid) as readrecom FROM edu_recommendations WHERE userid = $1 and read = $2', [data.userid, true]);
          //stream results back one row at a time
          query2.on('row', (row) => {
            recomCount.push(row);
          });
          query2.on('end', () => {
            done();
            recommendationsRead = recomCount[0].readrecom;
            //SQL QUERY > get recent recommendations
            const query3 = client.query('with teacher_recom as (SELECT er.recomid, date, rate, favorite, read, location  FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid=$1), recom_body as (SELECT rb.recomid, title, multimedia, header, description FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid) SELECT * FROM recom_body tr NATURAL INNER JOIN teacher_recom ORDER BY date DESC LIMIT 3', [data.userid,]);
            //stream results back one row at a time
            query3.on('row', (row) => {
              recentRecommendations.push(row);
            });
            query3.on('end', () => {
              done();
              //SQL QUERY > get top recommendations
              const query4 = client.query('with teacher_recom as (SELECT er.recomid, date, rate, favorite, read, location  FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid=$1), recom_body as (SELECT rb.recomid, title, multimedia, header, description FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid) SELECT * FROM recom_body tr NATURAL INNER JOIN teacher_recom ORDER BY rate DESC nulls last, date DESC LIMIT 3', [data.userid,]);
              //stream results back one row at a time
              query4.on('row', (row) => {
                topRecommendations.push(row);
              });
              query4.on('end', () => {
                done();
                //SQL Query > select different login dates
                const query5 = client.query('SELECT distinct date FROM log_record WHERE userid = $1 GROUP BY date', [data.userid,]);
                //stream results back one row at a time
                query5.on('row', (row) => {
                  logs.push(row);
                });
                query5.on('end', () => {
                  done();
                  daysInPlatforms = logs.length;
                  //SQL Query > select subscription status
                  const query6 = client.query('SELECT status FROM subscription WHERE userid = $1 ', [data.userid,]);
                  //stream results back one row at a time
                  query6.on('row', (row) => {
                    status.push(row);
                  });
                  query6.on('end', () => {
                    done();
                    return res.status(200).json({statusCode: 200, daysInPlatforms, questionsasked, recommendationsRead, recentRecommendations, topRecommendations, status});
                  });
                });
              });
            });
          });
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            message: 'User does not exist or is not of type teacher.',
            isBase64Encoded: false,});
      }
    });
  });
});

/*Ask a question */
router.post('/questions/ask', checkJwt, (req,res,next)=> {
    const results = [];
    const resultsexist = [];
    const subscription = [];
    //grab data from http request
    const data = {
        userid: req.user.sub,
        subject: req.body.subject,
        question: req.body.question
      };
    //verify inputs
    if(val.validateUserID(data.userid) || val.validateLongText(data.subject) || val.validateLongText(data.question)){
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
  
      //verify if user exists in database records and is teacher type
      const query2 = client.query('SELECT * FROM users WHERE userid = $1 and usertype = $2', [data.userid, 'teacher',]);
      //stream results back one row at a time
      query2.on('row', (row) => {
        resultsexist.push(row);
      });
      query2.on('end', () => {
        done();
        if (resultsexist.length === 1){ //user exists and is teacher type
          //add verify active subscription
          //SQL QUEry > get subsciption status
          const query = client.query('SELECT * FROM subscription WHERE userid= $1', [data.userid,]);
          //stream results back one row at a time
          query.on('row', (row) => {
            subscription.push(row);
          });
          query.on('end', () => {
            done();
            if(subscription.length >0){
              if(subscription[0].status == 'active'){
                //SQL Query > insert data
                  const todaysDateForQuery = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS
                client.query('INSERT into questions (askeddate, userid, subject, question, read, favorite) values ($1, $2, $3, $4, $5, $6);', [todaysDateForQuery, data.userid, data.subject, data.question, false, false,]);
                //SQL Query > select data
                const query = client.query('SELECT * FROM questions WHERE userid = $1 and askeddate = $2', [data.userid, todaysDateForQuery]);
                //stream results back one row at a time
                query.on('row', (row) => {
                results.push(row);
                });
                query.on('end', () => {
                done();
                return res.status(201).json({statusCode: 201, results});
                });
              }
              else{
                return res.status(402).json({statusCode: 402,
                  message: 'User doesn\'t have a subscription active.',
                  isBase64Encoded: false,});
              }
            }else{
              return res.status(402).json({statusCode: 402,
                message: 'User doesn\'t have a subscription active.',
                isBase64Encoded: false,});
            }
          });
        }else
        {
          return res.status(401).json({statusCode: 401,
              message: 'User is not of type teacher or does not exist in records.',
              isBase64Encoded: false,});
        }
      });
    });
});
/* GET questions of a user*/
router.get('/questions', checkJwt, (req,res,next)=> {
    const questions = [];
    const resultsexist = [];
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
        return res.status(500).json({statusCode: 500, message: err});
      }
      //verify if user exists in database records
      const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype=$2', [data.userid,'teacher']);
      //stream results back one row at a time
      query1.on('row', (row) => {
        resultsexist.push(row);
      });
      query1.on('end', () => {
        done();
        if (resultsexist.length === 1){ // user exists
        
          //SQL Query > select data
          const query = client.query('SELECT * FROM questions WHERE userid = $1 ORDER BY askeddate DESC', [data.userid,]);
          //stream results back one row at a time
          query.on('row', (row) => {
          questions.push(row);
          });
          query.on('end', () => {
            done();
            if(questions.length > 0){
                return res.status(200).json({statusCode: 200, questions});
            }else
            {
                return res.status(202).json({statusCode: 202,
                    message: 'User does not have questions in records.'
                    });
            }
          });
        }else
        {
          return res.status(401).json({statusCode: 401,
                message: 'User does not exists in records or is not of type teacher. Inputs where not received as expected.',
              isBase64Encoded: false,});
        }
      });
    });
});

/* Mark read answered question*/  
router.post('/questions/read',checkJwt,  (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  const userexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,
      askeddate: moment(req.body.askeddate).format("YYYY-MM-DD HH:mm:ss"),
    };

  //verify inputs
  if(val.validateUserID(data.userid) || val.validateTime(data.askeddate)){
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

     //verify if user exists in database records
     const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'teacher']);
     //stream results back one row at a time
     query1.on('row', (row) => {
       userexist.push(row);
     });
     query1.on('end', () => {
       done();
       if (userexist.length === 1){ // user exists and is of type teacher
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
            return res.status(201).json({statusCode: 201 , results});
            });
          }else
          {
            return res.status(401).json({statusCode: 401,
                  message: 'Question does not exists in records. Inputs where not received as expected.',
                isBase64Encoded: false,});
          }
        });
      }else{
        return res.status(401).json({statusCode: 401,
          message: 'User does not exists in records or is not a teacher. Inputs where not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});


/* Rate answered question*/  
router.post('/questions/rate', checkJwt, (req,res,next)=> {
  const results = [];
  const resultsexist = [];
  const userexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,
      askeddate: moment(req.body.askeddate).format("YYYY-MM-DD HH:mm:ss"),
      rate: req.body.rate
    };
console.log(data);
  //verify inputs
  if(val.validateUserID(data.userid) || val.validateTime(data.askeddate) || val.validateRate(data.rate)){
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
    
    //verify if user exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'teacher']);
    //stream results back one row at a time
    query1.on('row', (row) => {
      userexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (userexist.length === 1){ // user exists and is of type teacher
          
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
            return res.status(201).json({statusCode: 201, results});
            });
          }else
          {
            return res.status(401).json({statusCode: 401,
                message: 'Question does not exists in records. Inputs where not received as expected.',
                isBase64Encoded: false,});
          }
        });
      }else{
        return res.status(401).json({statusCode: 401,
          message: 'User does not exists in records or is not a teacher. Inputs where not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});


/* Mark read recommendation*/  
router.post('/recommendations/read', checkJwt, (req,res,next)=> {
    const resultsexist = [];
    const userexist = [];
    const quizresult =[];
    const quizid =[];
    const quizqid =[];
    //grab data from http request
    const data = {
        userid: req.user.sub,
        recomid: req.body.recomid,
      };
    //verify inputs
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
        return res.status(500).json({statusCode: 500, message: err});
      }
       //verify if user exists in database records
    const query = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'teacher']);
    //stream results back one row at a time
    query.on('row', (row) => {
      userexist.push(row);
    });
    query.on('end', () => {
      done();
      if (userexist.length === 1){ // user exists and is of type teacher----------------
        //verify if recommendation exists in database records
        const query1 = client.query('SELECT * FROM edu_recommendations WHERE recomid = $1 AND userid= $2', [data.recomid, data.userid]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          resultsexist.push(row);
        });
        query1.on('end', () => {
          done();
          if (resultsexist.length === 1){ // recommendation exist and is of specified user
            if(resultsexist[0].read == false){
              //SQL Query > update read data
              client.query('UPDATE edu_recommendations SET read=$1 WHERE recomid = $2', [true, data.recomid,]);
              //verify a quiz exists and has empty questions spaces
              const query2 = client.query('SELECT * FROM quiz WHERE userid = $1 AND count < $2', [data.userid, 12,]);
              //stream results back one row at a time
              query2.on('row', (row) => {
                quizresult.push(row);
              });
              query2.on('end', () => {
                done();
                //quiz exists and has empty slots
                if(quizresult.length === 1){ 
                  //SQL QUERY > update count of quizes questions
                  client.query('UPDATE quiz SET count = $1 WHERE quizid = $2', [quizresult[0].count+1, quizresult[0].quizid]);
                  //SQL QUERY> get recomendation question
                  const query4 = client.query('SELECT * FROM quiz_question NATURAL INNER JOIN recommendation_body WHERE recomid = $1', [data.recomid,]);
                  //stream results back one row at a time
                  query4.on('row', (row) => {
                    quizqid.push(row);
                  });
                  query4.on('end', () => {
                    done();
                    //SQL Query > insert question for quiz
                    client.query('INSERT INTO quiz_qs(quizid, quizquestionid, recommendationtitle) values ($1, $2, $3)',[quizresult[0].quizid, quizqid[0].quizquestionid, quizqid[0].title]);  
                  });
                }else{//there isn't a quiz with available space
                  //create quiz
                  //SQL Query > create quiz data
                  const query3 = client.query('INSERT INTO quiz(userid, count, created) values($1, $2, $3) returning quizid',[data.userid, 1, todaysDate,]);
                  //stream results back one row at a time
                  query3.on('row', (row) => {
                    quizid.push(row);
                  });
                  query3.on('end', () => {
                    done();
                    //SQL QUERY> get recomendation question
                    const query4 = client.query('SELECT * FROM quiz_question NATURAL INNER JOIN recommendation_body WHERE recomid = $1', [data.recomid,]);
                    //stream results back one row at a time
                    query4.on('row', (row) => {
                      quizqid.push(row);
                    });
                    query4.on('end', () => {
                      done();
                      //SQL Query > insert first question for quiz
                      client.query('INSERT INTO quiz_qs(quizid, quizquestionid, recommendationtitle) values ($1, $2, $3)',[quizid[0].quizid, quizqid[0].quizquestionid, quizqid[0].title]);  
                    });
                  });
                }
                return res.status(201).json({statusCode: 201}); 
              });
            }else{
              return res.status(201).json({statusCode: 201});
            }
          }else
          {
            return res.status(401).json({statusCode: 401,
                message: 'Invalid recommendation. Inputs where not received as expected.',
                isBase64Encoded: false,});
          }
        });
      }else{
        return res.status(401).json({statusCode: 401,
          message: 'User does not exists in records or is not a teacher. Inputs where not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

/* Rate recommendation*/  
router.post('/recommendations/rate', checkJwt, (req,res,next)=> {
  const resultsexist = [];
  const userexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,
      recomid: req.body.recomid,
      rate: req.body.rate
    };
  //verify inputs
  if(val.validateUserID(data.userid) || val.validateInt(data.recomid) || val.validateRate(data.rate)){
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
    //verify if user exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, 'teacher']);
    //stream results back one row at a time
    query1.on('row', (row) => {
      userexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (userexist.length === 1){ // user exists and is of type teacher
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
            
            return res.status(201).json({statusCode: 201 });
          }else
          {
            return res.status(401).json({statusCode: 401,
                message: 'Invalid recommendation. Inputs where not received as expected.',
                isBase64Encoded: false,});
          }
        });
      }else{
        return res.status(401).json({statusCode: 401,
          message: 'User does not exists in records or is not a teacher. Inputs where not received as expected.',
          isBase64Encoded: false,});
      }
    });
  });
});

/* Favorite recommendation*/  
router.post('/recommendations/favorite', checkJwt, (req,res,next)=> {
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,
      recomid: req.body.recomid,
      favorite: req.body.favorite
    };
  //verify inputs
  if(val.validateUserID(data.userid) || val.validateInt(data.recomid) || val.validateBool(data.favorite)){
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
        client.query('UPDATE edu_recommendations SET favorite=$1 WHERE recomid = $2 and userid = $3', [data.favorite, data.recomid, data.userid,]);
        
        return res.status(201).json({statusCode: 201 });
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'Invalid recommendation or user. Inputs where not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});


/* Favorite question*/  
router.post('/questions/favorite', checkJwt, (req,res,next)=> {
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,
      askeddate: moment(req.body.askeddate).format("YYYY-MM-DD HH:mm:ss"),
      favorite: req.body.favorite
    };
  //verify inputs
  if(val.validateUserID(data.userid) || val.validateTime(data.askeddate) || val.validateBool(data.favorite)){
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

    //verify if question exists in database records
    const query2 = client.query('SELECT * FROM questions WHERE askeddate = $1 AND userid= $2', [data.askeddate, data.userid]);
    //stream results back one row at a time
    query2.on('row', (row) => {
      resultsexist.push(row);
    });
    query2.on('end', () => {
      done();
      if (resultsexist.length === 1){ // question exist and is of specified user
      
        //SQL Query > update favorite data
        client.query('UPDATE questions SET favorite=$1 WHERE askeddate = $2 and userid = $3', [data.favorite, data.askeddate, data.userid,]);
        
        return res.status(201).json({statusCode: 201 });
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'Invalid question. Inputs where not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});


/* add classes */ //(UNUSED)
router.post('/settings/classes/add', checkJwt, (req,res,next)=> {
    const classes = [];
    const resultsexist = [];
    //grab data from http request
    const data = {
        userid: req.user.sub, 
        subject: req.body.classsubject,
        format: req.body.format,
        language: req.body.language,
        level: req.body.level,
        groupsize: req.body.groupsize,
        topica: req.body.topica,
        topicb: req.body.topicb,
        topicc: req.body.topicc
      };
    //verify inputs
    if(val.validateUserID(data.userid) || val.validateLongText(data.subject) || val.validateNoSpace(data.format) || val.validateNoSpace(data.language) || val.validateLevel(data.level) || val.validateGroup(data.groupsize) || val.validateLongText(data.topica)){
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
            return res.status(201).json({statusCode: 201 , classes});
          });
        }else
        {
          return res.status(401).json({statusCode: 401,
                message: 'User does not exists in records or is not type teacher. Inputs where not received as expected.',
              isBase64Encoded: false,});
        }
      });
    });
});

/* Remove classes*/  //unused
router.delete('/settings/classes/remove', checkJwt, (req,res,next)=> {
  const classes = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub, 
      classid: req.body.classInfoID
    };
 //verify inputs
 if(val.validateUserID(data.userid) || val.validateInt(data.classid)){
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
    //verify if user exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1 AND usertype = $2', [data.userid, "teacher"]);
    //stream results back one row at a time
    query1.on('row', (row) => {
      resultsexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (resultsexist.length === 1){ // user exists and is of type teacher
        //SQL Query > select classes info
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
            return res.status(200).json({statusCode: 200 });
          }else{
            return res.status(402).json({statusCode: 402,
                message: 'User does not have more than one class. Invalid deleting.',
              isBase64Encoded: false,});
          }
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'User does not exists in records or is not type teacher. Inputs where not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});

/* GET classes to modify */ //unused
router.get('/settings/classes', checkJwt, (req,res,next)=> {
  const classes = [];
  const resultsexist = [];
  //grab data from http request
  const data = {
      userid: req.user.sub  //change to req.query.userid for testing
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
      return res.status(500).json({statusCode: 500, message: err});
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
        //SQL Query > select data
        const query = client.query('SELECT * FROM class_info WHERE userid = $1', [data.userid,]);
        //stream results back one row at a time
        query.on('row', (row) => {
        classes.push(row);
        });
        query.on('end', () => {
          done();
          return res.status(200).json({statusCode: 200 , classes});
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'User does not exists in records or is not type teacher. Inputs where not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});

/* View recommendations list */
router.get('/recommendations', checkJwt, (req,res,next)=> {
  const results = [];
  const recommendations = [];
  const favoriterecommendations = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,  //change to req.query.userid for testing
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
      return res.status(500).json({statusCode: 500, message: err});
    }
    //verify if user exists in database records and is teacher
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype = $2', [data.userid, 'teacher']);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type teacher
        //SQL query > select all recomendations
        const query1 = client.query('with teacher_recom as (SELECT er.recomid, userid, date, rate, favorite, read, location FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid=$1), recom_body as (SELECT rb.recomid, title, multimedia, header, description FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid) SELECT * FROM recom_body tr NATURAL INNER JOIN teacher_recom ORDER BY date DESC',[data.userid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          recommendations.push(row);
        });
        query1.on('end', () => {
          done();
          //SQL query > select favorite recommendation
          const query2 = client.query('with teacher_recom as (SELECT er.recomid, userid, date, rate, favorite, read, location FROM edu_recommendations er LEFT JOIN recommendations ON er.recomid = recommendations.recomid WHERE userid=$1 AND favorite = $2), recom_body as (SELECT rb.recomid, title, multimedia, header, description FROM recommendation_body rb INNER JOIN recommendation_req ON rb.recomid = recommendation_req.recomid) SELECT * FROM recom_body tr NATURAL INNER JOIN teacher_recom ORDER BY date DESC',[data.userid, true]);
          //stream results back one row at a time
          query2.on('row', (row) => {
            favoriterecommendations.push(row);
          });
          query2.on('end', () => {
            done();
          return res.status(200).json({statusCode: 200 , recommendations, favoriterecommendations});
          });
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
              message: 'User does not exists in records or isn\'t a teacher. Inputs were not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});

/*GET to MODIFY PLAN*/
router.get('/settings/plans', checkJwt, (req,res,next)=> {
  const results = [];
  const subscription = [];
  //grab data from http request
  const data = {
      userid: req.user.sub,  //change to req.query.userid for testing
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
      return res.status(500).json({statusCode: 500, message: err});
    }
    //verify if user exists in database records and is teacher
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype = $2', [data.userid, 'teacher']);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1){ // user exists and is of type teacher
        //SQL query > select all recomendations
        const query1 = client.query('SELECT * FROM subscription WHERE userid = $1',[data.userid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          subscription.push(row);
        });
        query1.on('end', () => {
          done();
          if(subscription.length == 1)
            return res.status(200).json({statusCode: 200 , subscription: subscription[0]});
          else
          {
            return res.status(402).json({statusCode: 402, message: 'User has never subscribed.'});
          }
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            message: 'User does not exists in records or isn\'t a teacher. Inputs were not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});


/*MODIFY PLAN*/
router.post('/settings/plans', checkJwt, (req, res, next) => {
  const results = [];
  const subscription = [];
  //grab data from http request
  const data = {
    userid: req.user.sub,
    action: req.body.action //solo puede ser active o suspended
  };
  //verify inputs
  if (val.validateUserID(data.userid) || val.validateNoSpace(data.action)) {
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
    //verify if user exists in database records and is teacher
    const query = client.query('SELECT * FROM subscription WHERE userid = $1', [data.userid]);
    //stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      if (results.length === 1) {

        if (data.action == 'active') {
          stripe.subscriptions.del(results[0].token, function(err, response){
            if(err){
              return res.status(402).json({statusCode: 402, message: 'Update failed.'});
            }

            const query1 = client.query('UPDATE subscription SET status = $1 WHERE userid = $2 returning *',['suspended', data.userid]);
            //stream results back one row at a time
            query1.on('row', (row) => {
              subscription.push(row);
            });
            query1.on('end', () => {
              done();
              if(subscription.length == 1)
                return res.status(201).json({statusCode: 201, subscription});
              else
              {
                return res.status(402).json({statusCode: 402, message: 'Update failed.'});
              }
            });
          });
        }
        else if (data.action == 'suspended') {
            
          stripe.subscriptions.retrieve(results[0].token, function(err, response){
         stripe.subscriptions.create({
                    customer: response.customer,
                    billing: 'charge_automatically',
                    items: [
                      {
                        plan: "plan_D7HTWmx4J01DoB",
                      },
                    ]
                  }, function (err, response) {
            if (err) {
              return res.status(402).json({ statusCode: 402, message: 'Update failed.' });
            }
            const query1 = client.query('UPDATE subscription SET status = $1, token = $2 WHERE userid = $3 returning *', ['active', response.id, data.userid]);
            //stream results back one row at a time
            query1.on('row', (row) => {
              subscription.push(row);
            });
            query1.on('end', () => {
              done();
              if (subscription.length == 1){
                return res.status(201).json({ statusCode: 201, subscription });
              }
              else {
                return res.status(402).json({ statusCode: 402, message: 'Update failed.' });
              }
            });
          });
        });
        }
        else {
          return res.status(401).json({
            statusCode: 401,
            message: 'User does not exists in records or isn\'t a teacher. Inputs were not received as expected.',
            isBase64Encoded: false,
          });
        }
      }

      else {
        return res.status(403).json({ statusCode: 403, message: 'Inputs were not received as expected.', isBase64Encoded: false, });
      }
    });
  });
});

/*ANSWER QUIZ*/
router.post('/quizzes/take', checkJwt, (req,res,next)=> {
  const results = [];
  const userexist = [];
  const qresults =[];
  //grab data from http request
  const data = {
      userid: req.user.sub, 
      quizid: req.body.quizid,
      answers: req.body.answers
    };
  //verify inputs
  if(val.validateUserID(data.userid) || val.validateInt(data.quizid) || val.validateLongText(data.answers) || !Array.isArray(data.answers)){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,});
  }
  if(data.answers.length <12){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected. Missing answers.',
      isBase64Encoded: false,});
  }
  for(var i=0; i< data.answers.length; i++){
    if(val.validateInt(data.answers[i].quizquestionid) || val.validateInt(data.answers[i].choiceid) || val.validateBool(data.answers[i].correctanswer)){
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
      return res.status(500).json({statusCode: 500, message: err});
    }
    //verify if user exists in database records and is teacher
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype = $2', [data.userid, 'teacher']);
    //stream results back one row at a time
    query.on('row', (row) => {
      userexist.push(row);
    });
    query.on('end', () => {
      done();
      if (userexist.length === 1){ // user exists and is of type teacher
        //SQL Query > get quiz score
        const query2 = client.query('SELECT score FROM quiz WHERE userid =$1 AND quizid =$2',[data.userid, data.quizid]);
        //stream results back one row at a time
        query2.on('row', (row) => {
          qresults.push(row);
        });
        query2.on('end', () => {
          done();
          if(qresults.length == 0){
            return res.status(403).json({statusCode: 403,
              message: 'Quiz doesn\'t exist',
              isBase64Encoded: false,});

          }else{
            if(qresults[0].score != null ){
              return res.status(402).json({statusCode: 402,
                message: 'Quiz has been answered',
                isBase64Encoded: false,});
            }else{
              //var to store score
              var score =0;
              //post answers
              for(var i=0; i< data.answers.length; i++){
                //SQL query > update choice
                client.query('UPDATE quiz_qs SET choiceid = $1 WHERE quizid = $2 AND quizquestionid =$3',[data.answers[i].choiceid, data.quizid, data.answers[i].quizquestionid,]);
                if(data.answers[i].correctanswer === true){
                  score = score+1;
                  //SQL Query > update quiz score
                  client.query('UPDATE quiz SET score =$1 WHERE userid =$2 AND quizid =$3',[score, data.userid, data.quizid]);
                }else if(i == 11){
                  client.query('UPDATE quiz SET score =$1 WHERE userid =$2 AND quizid =$3',[score, data.userid, data.quizid]);
                }
              }
              //SQL Query > get quiz score
              const query1 = client.query('SELECT * FROM quiz WHERE userid =$1 AND quizid =$2',[data.userid, data.quizid]);
              //stream results back one row at a time
              query1.on('row', (row) => {
                results.push(row);
              });
              query1.on('end', () => {
                done();
                return res.status(201).json({statusCode: 201 , results});
              });
            }
          }
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            message: 'User does not exists in records or isn\'t a teacher. Inputs were not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});


//GET quizzes 
router.get('/quizzes', checkJwt, (req,res,next)=> {
  const results = [];
  const userexist = [];
  const quizzes =[];
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
      return res.status(500).json({statusCode: 500, message: err});
    }
    //verify if user exists in database records and is teacher
    const query = client.query('SELECT * FROM users WHERE userid = $1 and usertype = $2', [data.userid, 'teacher']);
    //stream results back one row at a time
    query.on('row', (row) => {
      userexist.push(row);
    });
    query.on('end', () => {
      done();
      if (userexist.length === 1){ // user exists and is of type teacher
        //SQL Query > get quizzes
        const query1 = client.query('WITH body as(WITH qchoices as(WITH qqs as (SELECT qq.quizid, qq.choiceid as answerid, qq.quizquestionid, recommendationtitle, question FROM quiz_qs as qq natural inner join quiz_question) SELECT qqs.quizquestionid, array_to_json(array_agg(quiz_question_choice)) as choices FROM  quiz_question_choice natural inner join qqs GROUP BY qqs.quizquestionid), qqs as (SELECT qq.quizid, qq.choiceid as answerid, qq.quizquestionid, recommendationtitle, question FROM quiz_qs as qq natural inner join quiz_question) SELECT qqs.quizid, answerid, qqs.quizquestionid, recommendationtitle, question, choices FROM qqs natural inner join qchoices) SELECT quiz.quizid, score, created, userid, array_to_json(array_agg(body)) as questions FROM body natural inner join quiz WHERE count= 12 AND userid = $1 GROUP BY quiz.quizid, score, userid, created',[data.userid,]);
        //stream results back one row at a time
        query1.on('row', (row) => {
          quizzes.push(row);
        });
        query1.on('end', () => {
          done();
          if(quizzes.length == 0){
            return res.status(402).json({statusCode: 402,
              message: 'No quiz available for user.',
              isBase64Encoded: false});

          }else{
            return res.status(200).json({statusCode: 200 , quizzes});
          }
        });
      }else
      {
        return res.status(401).json({statusCode: 401,
            message: 'User does not exists in records or isn\'t a teacher. Inputs were not received as expected.',
            isBase64Encoded: false,});
      }
    });
  });
});



module.exports = router;
