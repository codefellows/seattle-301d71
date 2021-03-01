'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs'); //NEW not potato, boilerplate
// EJS requires us to have a folder called views where the ejs lives


const studentsArr = [
  { name: 'Nicholas', hobby: 'Board Games' },
  { name: 'Jason', hobby: 'Gardening' },
  { name: 'Andy', hobby: 'Photography' },
  { name: 'Ceylin', hobby: 'Cook' }
];

app.get('/', (req, res) => {
  const ejsObject = { teacher: 'nicholas', course: '301d71', funFactor: 7 };
  res.render('index.ejs', ejsObject); // TWO arguments: string of the file where the ejs html lives, AND an object with key value pairs
  // remember mustache Mustache.render(html, object)
});

app.get('/students', (req, res) => {
  const ejsObject = {studentsArray: studentsArr};
  res.render('pages/student-view.ejs', ejsObject);
});

app.post('/create-students', (req, res) => {
  console.log(req.body);
  studentsArr.push(req.body);
  // res.redirect('/students');
  // res.send('we added the student for you');
  res.redirect('/students');
});


app.get('/book-data', (req, res) => {
  // https://www.googleapis.com/books/v1/volumes?q=intitle:dune
  // https://www.googleapis.com/books/v1/volumes?q=inauthor:frank herbert
  // they will send a radio button value in req.body of either 'title' or 'author'
  // the if statement can be based on req.body

  superagent.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:frank herbert')
    .then(data => res.send(data));


});
app.listen(PORT, () => console.log(`up on http://localhost:${PORT}`));

