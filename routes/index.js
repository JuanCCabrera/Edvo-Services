const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T..+/, ''); //today's date format YYYY-MM-DD 00:00:00
const sendmail = require('sendmail')();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

/* Contact us email*/
router.post('/contact',(req, res, next) =>{
  //grab data from http request
  const data = {
    email: req.body.email, 
    message: req.body.message
  };
  //verify inputs are valid
  if(data.email == null || data.message == null){
    return res.status(403).json({statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,});
  }
  //create email
  sendmail({
      from: data.email,
      to: 'info@edvotech.com', //change to jahannie's edvo email
      subject: 'Contact Us | Deseo saber mas de EDVO',
      html: data.message,
    }, function(err, reply) {
      if(err){
      console.log(err && err.stack);
      return res.status(402).json({statusCode : 402, success: false, message: "Email failed to send."});
      }
      else{
      return res.status(200).json({statusCode : 200, success: true, message: "Email sent succesfully."});
      }
  });
});

/*LOG USERS HISTORY*/
router.post('/log', (req,res,next)=> {
  const resultsexist = [];
  console.log(todaysDate);
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
      resultsexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (resultsexist.length === 1){ // user exists
      
        //SQL Query > insert log data
        client.query('INSERT into log_record (userid, date) values ($1, $2)', [data.userid, todaysDate,]);
        return res.status(201).json({statusCode: 201, success: true});
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
