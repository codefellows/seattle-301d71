'use strict';
//' Create Read update delete'
// This app will focus on creating TODOS and reading them
// in your app today you are saving books which is a lot like saving a task

/*
  if we want an app built around a resource : Dog
  app.get('/dogs) // show the page with all dogs
  app.get('/dog/5) // show the page with 1 dog(dog 5)
  app.post('dog') // add a dog
  app.put('/dog/5') // update dog 5
  app.delete('/dog/5); // delete dog 5

    if we want an app built around a resource : cat
  app.get('/cats) // show the page with all cats
  app.get('/cat/5) // show the page with 1 cat(cat 5)
  app.post('cat') // add a cat
  app.put('/cat/5') // update cat 5
  app.delete('/cat/5); // delete cat 5

  if we want an app built around a resource : task
  app.get('/tasks) // show the page with all tasks
  app.get('/task/5) // show the page with 1 task(task 5)
  app.post('task') // add a task
  app.put('/task/5') // update task 5
  app.delete('/task/5); // delete task 5


  There are now 3 ways we can get data from a client
  req.query: anything after the `?` in the url
  req.body: any data from a form or encoded in the url on a POST
  req.params: any data in the url that fills in a :VARIABLENAME (ALWAYS BEFORE THE ?)
*/

const express = require('express');
require('dotenv').config();
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3111;

app.set('view engine', 'ejs'); // this changes the setting of how we render html to use ejs, express will run const ejs = require('ejs') behind the scenes and will use ejs because of this
app.use(express.urlencoded({extended:true})); // this decodes the form data

const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));

// const allTasks = [
//   { name: 'walk Ginger', dueDate: 'today' },
//   {name: 'clean the roof', dueDate: 'tomorrow'},
//   {name: 'do homework', dueDate: 'today'},
//   {name: 'paint something', dueDate: 'wednesday'},
// ];

app.get('/tasks', getAllTasks); //finished 1st // lab 1st

// A dynamic variable in the route is called a path variable
// a path variable is defined by putting a `:` in front of part of the route
// the text after the `:` is the variable name

app.get('/task/:task_id_potato', getSingleTask); // we will do this third // lab 2nd
app.post('/task', addTask); // finished 2nd // lab 3rd

app.put('/task/1', updateSingleTask);
app.delete('/task/1', deleteSingleTask);

function getAllTasks(req, res){
  // res.send('getAllTasks');
  // Purpose: take all the tasks from the global variable, render them to the page
  // const ejsObject = { allTasks: allTasks };

  const sqlString = 'SELECT * FROM task;';
  client.query(sqlString) // takes in a sqlQueryString, and the template array
    .then(result => {
      const ejsObject = { allTasks: result.rows };
      res.render('pages/show-tasks.ejs', ejsObject);
    });

}

// http://localhost:3000/task/1 :: means go to task 1's detail view
// http://localhost:3000/task/5 :: means go to task 5's detail view
// app.get('/task/:task_id_potato',

function getSingleTask(req, res) {
  // res.send('getSingleTask');
  // :task_id_potato can be found at `req.params.task_id_potato`

  console.log('params', req.params);
  const taskId = req.params.task_id_potato;

  const sqlString = 'SELECT * FROM task WHERE id=$1';
  const sqlArray = [taskId];
  client.query(sqlString, sqlArray)
    .then(result => {
      // [ { id: 1, name: 'pet ginger', due_date: 'now' } ][0]
      const task = result.rows[0];
      const ejsObject = { task };
      res.render('pages/single-task.ejs', ejsObject);

    });




}

function addTask(req, res) {
  // console.log(req.body);
  // res.send('addTask');
  // Purpose: add a task to the list of items, when it is successful,
  //  OK: show them all tasks with the update
  //  like lab: show them the detail view of that specific task (/task/1)

  // allTasks.push(req.body);

  const sqlString = 'INSERT INTO task (name, due_date) VALUES ($1, $2) RETURNING id;';
  const sqlArray = [req.body.name, req.body.due_date];
  client.query(sqlString, sqlArray)
    .then(result => {
      // THIS LINE IS THE FIRST TIME MY NEW TASK HAS AN ID
      // potentially: look in the result of the insert
      // console.log(result.rows);
      const newThingId = result.rows[0].id;
      res.redirect(`/task/${newThingId}`);

    });
}

function updateSingleTask(req, res) {
  res.send('updateSingleTask');
  // purpose: update a tasks
  //  like lab: show them the detail view of that specific task (/task/1)
}

function deleteSingleTask(req, res) {
  res.send('deleteSingleTask');
  // purpose: delete a task, send them to the all tasks page
}

client.connect().then(() => {
  app.listen(PORT, function(){console.log(`up on http://localhost:${PORT}`);});

});
