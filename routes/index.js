const express = require('express');
const router = express.Router();
const pg = require('pg');
const val = require('./validate'); //validate inputs
const path = require('path');
const jwt = require('express-jwt');
const cors = require('cors');
const jwksRsa = require('jwks-rsa');
const sendmail = require('sendmail')();
var stripe = require("stripe")("sk_test_ebcuCvU5u6D6hO2Uj8UEDOnI");
const connectionString = process.env.DATABASE_URL || 'postgres://root:Edv@tech18@localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T..+/, '');

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
 //HTTP REQUEST NO ESTA NI COMMENTARIOS DE CODIGO
router.get('/user', checkJwt, (req, res, next) => {
  user = [];
  subscription = [];
  const data = {
    userid: req.user.sub
  };

  pg.connect(connectionString, (err, client, done) => {
    const query1 = client.query('SELECT * FROM users WHERE userid = $1', [data.userid]);
    query1.on('row', (row) => {
      user.push(row);
    });
    query1.on('end', () => {
      done();
      if (user.length) {
        if (user[0].usertype == 'teacher') { //added this to verify usertype
          const query2 = client.query('SELECT * FROM subscription WHERE userid = $1', [data.userid]);
          query2.on('row', (row) => {
            subscription.push(row);
          });
          query2.on('end', () => {
            done();
            if (subscription.length > 0) {
              stripe.subscriptions.retrieve(
                subscription[0].token,
                function (err, subscriptionStatus) {
                  if (err) {
                    return res.status(402).json({ statusCode: 402 });
                  }
                  else {
                    if (subscriptionStatus.status === 'active'){
                      return res.status(201).json({ statusCode: 201, subscription: 'active', user: user });
                    }
                    else if (subscriptionStatus.status !== 'active' && subscription[0].status !== 'cancelled') {
                      client.query('UPDATE subscription SET status = $1 WHERE userid = $2', ['suspended', data.userid]);
                      return res.status(201).json({ statusCode: 201, subscription: 'suspended', user: user });
                    }
                    else{
                      return res.status(201).json({ statusCode: 201, subscription: 'cancelled', user: user });                        
                    }
                  }
                }
              );
            }
            else {
              return res.status(201).json({ statusCode: 201, user: user, subscription: null });
            }
          });

        } else {//return if usertype is not teacher
          return res.status(201).json({ statusCode: 201, user: user, subscription: null });
        }

      }
      else {
        return res.status(403).json({ statusCode: 403 });
      }

    });
  });

});

/* Contact us email*/
router.post('/contact', (req, res, next) => {
  //grab data from http request
  const data = {
    email: req.body.email,
    message: req.body.message,
    name: req.body.name
  };
  //verify inputs are valid
  if (val.validateEmail(data.email) || val.validateLongText(data.message) || val.validateLongText(data.name)) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Inputs were not received as expected.',
    });
  }
  //create email
  sendmail({
    from: data.email,
    to: 'daniel.rodriguez22@upr.edu', //change to jahannie's edvo email
    subject: 'Contact Us | Deseo saber mas de EDVO',
    html: 'Name: ' + data.name + '<br> <br>' + data.message,
  }, function (err, reply) {
    if (err) {
      console.log(err && err.stack);
      return res.status(403).json({ statusCode: 403, message: "Email failed to send." });
    }
    else {
      return res.status(200).json({ statusCode: 200, message: "Email sent succesfully." });
    }
  });
});

/*LOG USERS HISTORY*/
router.post('/log', checkJwt, (req, res, next) => {
  const resultsexist = [];
  //grab data from http request
  const data = {
    userid: req.user.sub,
  };
  //verify inputs
  if (val.validateUserID(data.userid)) {
    return res.status(403).json({
      statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false
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
    const query1 = client.query('SELECT * FROM users WHERE userid = $1', [data.userid,]);
    //stream results back one row at a time
    query1.on('row', (row) => {
      resultsexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (resultsexist.length === 1) { // user exists
        const todaysQueryDate = new Date().toISOString().replace(/T..+/, ''); //today's date format YYYY-MM-DD 00:00:00
        //SQL Query > insert log data
        client.query('INSERT into log_record (userid, date) values ($1, $2)', [data.userid, todaysQueryDate,]);
        return res.status(201).json({ statusCode: 201 });
      } else {
        return res.status(401).json({
          statusCode: 401,
          message: 'User does not exists in records. Inputs where not received as expected.',
          isBase64Encoded: false
        });
      }
    });
  });
});
module.exports = router;

