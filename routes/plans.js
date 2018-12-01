const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const jwt = require('express-jwt');
const cors = require('cors');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');
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


/* Subscribe to a plan*/
router.post('/', checkJwt, (req, res, next) => {
  const results = [];
  const resultsexist = [];
  const userexist = [];
  //grab data from http request
  const data = {
    userid: req.user.sub,
    plan: req.body.plan,
    couponid: req.body.couponid,
    token: req.body.token,
  };
  //verify inputs
  if (val.validateUserID(data.userid) || val.validateLongText(data.plan) || val.validatetoken(data.token)) {
    return res.status(403).json({
      statusCode: 403,
      message: 'Inputs were not received as expected.',
      isBase64Encoded: false,
    });
  }
  if(data.couponid != null){
    if(val.validatecoupon(data.couponid)){
      return res.status(403).json({
        statusCode: 403,
        message: 'Inputs were not received as expected.',
        isBase64Encoded: false,
      });
    }
  }
  // get a postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //handle connection error
    if (err) {
      done();
      return res.status(500).json({ statusCode: 500, mesage: err });
    }
    //verify if userid exists in database records
    const query1 = client.query('SELECT * FROM users WHERE userid = $1', [data.userid,]);
    //stream results back one row at a time
    query1.on('row', (row) => {
      userexist.push(row);
    });
    query1.on('end', () => {
      done();
      if (userexist.length === 1) {//USER IS IN DATABASE
        //verify if userid has a subscription in database records
        const query2 = client.query('SELECT * FROM subscription WHERE userid = $1', [data.userid,]);
        //stream results back one row at a time
        query2.on('row', (row) => {
          resultsexist.push(row);
        });
        query2.on('end', () => {
          done();
          if (resultsexist.length === 0) { //if userid doesn't have subscription cancelled, suspended or active
            //verify there is a coupon being used
            if (data.couponid != '') {
              //SQL Query > select data of institutions
              const query = client.query('SELECT * FROM institution WHERE institutionid = $1', [data.couponid,]);
              //stream results back one row at a time
              query.on('row', (row) => {
                results.push(row);
              });
              query.on('end', () => {
                done();
                if (results.length === 1) {//if coupon is institutional
                  if (results[0].accountsused < results[0].accounts) {//verify instiution has accounts available
                    var accountsupdated = results[0].accountsused + 1;
                    try {
                      stripe.customers.create({
                        source: data.token,
                        description: data.userid
                      }, function (err, response) {
                        if (err) {
                          return res.status(403).json({
                            statusCode: 403,
                              message: 'Invalid card',
                            isBase64Encoded: false,
                          });
                        }
                        stripe.subscriptions.create({
                          customer: response.id,
                          billing: 'charge_automatically',
                          items: [
                            {
                              plan: "plan_D7HTWmx4J01DoB",
                            },
                          ],
                          coupon: data.couponid
                        }, function (err, subscription) {
                          if (err) {
                            return res.status(402).json({
                              statusCode: 402, 
                                message: 'Could not subscribe, card or data might be incomplete',
                              isBase64Encoded: false,
                            });
                          }
                          else {
                            data.token = subscription.id;//SQL Query > insert user subscription into subscription table with active status
                            client.query('insert into subscription (userid, token, status, type) values ($1, $2, $3, $4)', [data.userid, data.token, 'active', data.plan,]);
                            //SQL Query > insert into coupon table
                            client.query('insert into coupons_used (couponid, userid, dateused) values ($1, $2, $3)', [data.couponid, data.userid, todaysDate]);
                            //SQL Query > update user to include institutionid
                            client.query('UPDATE users SET institutionid = $1 WHERE userid = $2', [data.couponid, data.userid,]);
                            //SQL Query > update accounts used
                            client.query('UPDATE institution SET accountsused = $1 WHERE institutionid = $2', [accountsupdated, data.couponid,]);
                            return res.status(201).json({ statusCode: 201});
                          }
                        })
                      });

                    } catch (err) {
                      return res.status(403).json({
                        statusCode: 403,
                          message: 'Userid already has a subscription.',
                        isBase64Encoded: false,
                      });
                    }

                  } else { //no accounts avilable for that institution
                    return res.status(402).json({
                      statusCode: 402,
                        message: 'No account available for that institution',
                      isBase64Encoded: false,
                    });
                  }
                }
                else {
                  try {
                    stripe.customers.create({
                      source: data.token,
                      description: data.userid
                    }, function (err, response) {
                      if (err) {
                        return res.status(402).json({
                          statusCode: 402,
                            message: 'Invalid card',
                          isBase64Encoded: false,
                        });
                      }
                      stripe.subscriptions.create({
                        customer: response.id,
                        billing: 'charge_automatically',
                        items: [
                          {
                            plan: "plan_D7HTWmx4J01DoB",
                          },
                        ],
                        coupon: data.couponid
                      }, function (err, subscription) {
                        if (err) {
                          return res.status(402).json({
                            statusCode: 402,
                              message: 'Could not subscribe, card or data might be incomplete',
                            isBase64Encoded: false,
                          });
                        }
                        else {
                          //SQL Query > insert user subscription into subscription table with active status
                          data.token = subscription.id;
                          //SQL Query > insert user subscription into subscription table with active status
                          client.query('insert into subscription (userid, token, status, type) values ($1, $2, $3, $4)', [data.userid, data.token, 'active', data.plan,]);

                          //SQL Query > insert into coupon table
                          client.query('insert into coupons_used (couponid, userid, dateused) values ($1, $2, $3)', [data.couponid, data.userid, todaysDate,]);
                          return res.status(201).json({ statusCode: 201});
                        }
                      })
                    });

                  } catch (err) {
                    if(err)
                      return res.status(403).json({statusCode: 403, message: 'Userid already has a subscription.',isBase64Encoded: false,});
                  }
                }
              });
            } 
              else { //no coupon is used
              try {
                stripe.customers.create({
                  source: data.token,
                  description: data.userid
                }, function (err, response) {
                  if (err) {
                    return res.status(402).json({
                      statusCode: 402,
                        message: 'Invalid card',
                      isBase64Encoded: false,
                    });
                  }
                  stripe.subscriptions.create({
                    customer: response.id,
                    billing: 'charge_automatically',
                    items: [
                      {
                        plan: "plan_D7HTWmx4J01DoB",
                      },
                    ]
                  }, function (err, subscription) {
                    if (err) {
                      return res.status(402).json({statusCode: 402, message: 'Could not subscribe, card or data might be incomplete',isBase64Encoded: false,});
                    }
                    //SQL Query > insert user subscription into subscription table with active status
                    else {
                      data.token = subscription.id;
                      client.query('insert into subscription (userid, token, status, type) values ($1, $2, $3, $4)', [data.userid, data.token, 'active', data.plan,]);
                      return res.status(201).json({ statusCode: 201});
                    }
                  })
                });

              } catch (err) {
                if(err)
                return res.status(403).json({statusCode: 403, message: 'Userid already has a subscription.',isBase64Encoded: false,
                });
              }
            }
          }
          else// user has a subscription send error statuscode
          {
            return res.status(403).json({
              statusCode: 403,
              message: 'Userid already has a subscription.',
              isBase64Encoded: false,
            });
          }
        });
      } else//user does not exist in record send error statuscode
      {
        return res.status(401).json({
          statusCode: 401,
          message: 'User does not exist in database.',
          isBase64Encoded: false,
        });
      }
    });
  });
});

module.exports = router;