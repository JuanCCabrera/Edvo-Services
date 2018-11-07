const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
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

module.exports = router;
