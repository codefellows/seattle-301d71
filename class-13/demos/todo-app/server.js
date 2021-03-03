'use strict';

// Environment variables
require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

// Page Routes
app.get('/tasks', getTasks);
app.get('/tasks/:task_id', getOneTask);
app.post('/tasks', addTask);

app.delete('/tasks/:task_id', deleteTask);
app.get('/add', showForm);


// Failsafe Routes
app.get('*', (req, res) => {
  res.status(404).send('This route does not exist');
  console.log('path', req.path);
  console.log('params', req.params);
  console.log('body', req.body);
});
app.get((error, req, res) => handleError(error, res)); // handle errors


// Route Handlers
function getTasks(req, res) {
  let SQL = 'SELECT * from task;';

  return client.query(SQL)
    .then(results => res.render('pages/show-tasks.ejs', { results: results.rows }))
    .catch(err => handleError(err, res));
}

function getOneTask(req, res) {
  let SQL = 'SELECT * FROM task WHERE id=$1;';
  let values = [req.params.task_id];

  return client.query(SQL, values)
    .then(result => {
      console.log('single', result.rows[0]);
      return res.render('pages/single-task', { task: result.rows[0] });
    })
    .catch(err => handleError(err, res));
}


function showForm(req, res) {
  res.render('pages/add-view');
}

function addTask(req, res) {
  console.log(req.body);
  let { name, due_date } = req.body;

  let SQL = 'INSERT INTO task (name, due_date) VALUES ($1, $2) RETURNING id;';
  let values = [name, due_date];

  return client.query(SQL, values)
    .then(res.redirect('/tasks'))
    .catch(err => handleError(err, res));
}

function deleteTask(req, res) {
  // need SQL to delete the specific task that we were on
  let sqlString = `DELETE FROM task WHERE id=$1;`;
  // use req.params.task_id === whatever task we were on
  let sqlArray = [req.params.task_id];
  console.log(req.query);
  client.query(sqlString, sqlArray)
    .then(res.redirect('/tasks'))
    .catch(err => handleError(err, res));
}

function handleError(error, res) {
  res.render('pages/error-view', { error: error });
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  });

