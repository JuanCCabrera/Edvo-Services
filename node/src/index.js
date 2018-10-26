const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const uuid = require('uuid');
const jwksRsa = require('jwks-rsa');
const stripe = require('stripe')('sk_test_ebcuCvU5u6D6hO2Uj8UEDOnI');
const schools = [];
const users = [];
let user= {
  name : 'Daniel',
  lastname : 'Rodriguez',
  dob : '10-24-2018',
  gender : 'male'
};

// define the Express app
const app = express();

// the database
const questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

//app.use(require("body-parser").text());

// retrieve all questions
app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length,
  }));
  res.send(qs);
});

app.get('/info', (req, res) => {
  res.send(user);
  res.send(200);
});

app.post('/info', (req, res) => {
  user = req.body;
  res.send(201);
});


app.get('/schools', (req, res) => {
  res.send(schools);
});

app.post('/school/add', (req, res) => {
  schools.push(req.body);
  res.send(200);
});

app.post('/user/add', (req, res) => {
  users.push(req.body);
  res.send(200);
});

app.post('/recommendation/add', (req, res) => {
  console.log(req.body);
  res.send(200);
});

app.get('/users', (req, res) => {  
  res.send(users);
});

app.get('/coupon/:id', (req, res) => {
  stripe.coupons.retrieve(
    req.params.id,
    function(err, coupon) {
      console.log("ERROR COUPO: ", err);
      console.log("COUPON SUCC: ", coupon);
      res.send(coupon.valid);
    }
  );
});

// get a specific question
app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

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

// insert a new question
app.post('/', checkJwt, (req, res) => {
  const {title, description} = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name,
  };
  questions.push(newQuestion);
  res.status(200).send();
});

// insert a new question
app.post('/login',  (req, res) => {
  const {email, password} = req.body;
  console.log("EMAIL: ",email);
  console.log("PASSWORD ", password);
  res.status(200).send();
});

// insert a new question
app.post('/registration',  (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});


app.post("/charge", async (req, res) => {
  try {
    console.log("THIS IS THE BODY: ", req.body);
    let status = await stripe.customers.create({
      source: req.body.token
    });

    stripe.subscriptions.create({
      customer: status.id,
      billing: 'charge_automatically',
      items: [
        {
          plan: "plan_D7HTWmx4J01DoB",
        },
      ]
    }, function(err, subscription) {
        console.log(subscription);
      }
    );

    res.json({status});
  } catch (err) {
    console.log(err.message);
    res.status(500).end();
  }
});

// insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
  const {answer} = req.body;

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  question[0].answers.push({
    answer,
    author: req.user.name,
  });
  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
