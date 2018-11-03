const express = require('express');
const router = express.Router(); 
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/edvo1';
const todaysDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //today's date format YYYY-MM-DD HH:MM:SS

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html');
});



// /* Create a single todo */
// router.post('/api/v1/todos', (req,res,next)=> {
//   const result = [];
//   //grab data from http request
//   const data = {text: req.body.text, complete: false};
//   // get a postgres client from the connection pool
//   pg.connect(connectionString, (err, client, done)=> {
//     //handle connection error
//     if(err){
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     //SQL Query > insert data
//     client.query('INSERT INTO items(text, complete) values($1, $2)', [data.text, data.complete]);
//     //SQL Query > select data
//     const query = client.query('SELECT * FROM items ORDER BY id ASC');
//     //stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });
//   });
// });

// /*GET ALL TODOS */
// router.get('/api/v1/todos', (req, res, next) => {
//   const results = [];
//   //get postgres client from connection pool
//   pg.connect(connectionString, (err, client, done) => {
//     //handle connection errors
//     if(err){
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     //sql query > select data
//     const query = client.query('SELECT * FROM items ORDER BY id ASC;');
//     //stream results back one by one
//     query.on('row', (row) =>{
//       results.push(row);
//     });
//     //after all data is returned, close connection and return results
//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });
//   });
// });

// /* Update a single todo*/
// router.put('/api/v1/todos/:todo_id', (req, res, next) => {
//   const results =[];
//   //grab data from url parameters
//   const id = req.params.todo_id;
//   //grab data from http request
//   const data = {text: req.body.text, complete: req.body.complete};
//   //get postgres client from connection pool
//   pg.connect(connectionString, (err, client, done)=>{
//     //handle connection errors
//     if(err){
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     //SQL query > update data
//     client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)', [data.text, data.complete, id]);
//     //SQL query > select data
//     const query= client.query("SELECT * FROM items ORDER BY id ASC");
//     //stream results by one row at a time
//     query.on('row', (row)=>{
//       results.push(row);
//     });
//     //after all data returned, close connection and return results
//     query.on('end', () =>{
//       done();
//       return res.json(results);
//     });
//   });
// });

// /* Delete a single todo*/
// router.delete('/api/v1/todos/:todo_id', (req, res, next)=>{
//   const results = [];
//   //grab data from url parameters
//   const id = req.params.todo_id;
//   //get a postgres client from connection pool
//   pg.connect(connectionString, (err, client, done)=> {
//     //handle connection errors
//     if(err){
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     //SQL query > delete data
//     client.query('DELETE FROM items WHERE id=($1)', [id]);
//     //SQL query > select data
//     var query = client.query('SELECT * FROM items ORDER BY id ASC');
//     //stream results one row at a time
//     query.on('row', (row)=>{
//       results.push(row);
//     });
//     //after all data is returned close connection and return results
//     query.on('end', ()=>{
//       done();
//       return res.json(results);
//     });
//   });
// });

module.exports = router;
