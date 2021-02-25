'use strict';

const express = require('express');
require('dotenv').config();

const app = express();

const client = require('./client.js');

const getPeopleCallback = require('./getPeople');

app.get('/', getPeopleCallback)
;
const add = require('./number.js');
console.log(add(2,3));

app.get('/makeStudent', (req, res) => {

  saveToSql(req)
    .then(turnTheResultIntoTheRowsArray)
    .then(rows => ifItIsThenSendAMessage(rows, res))
    .then(() => ifItIsNotInDBRedirectThemHome(req, res))
    .catch(error => {
      if(error) console.log(error.message);
      console.log(error);
    });
// currying: wrapping a function in another function so it can receive the variables it needs
});

function turnTheResultIntoTheRowsArray(stuffThatComesBackFromPostgresql) {
  return stuffThatComesBackFromPostgresql.rows;

}

function ifItIsThenSendAMessage(rows, res){
  if (rows.length > 0) {
    res.send('yo you are already in the class, get outta here');
    return Promise.reject();
  }
}

function ifItIsNotInDBRedirectThemHome(req, res){
  console.log('did i end up in the last function????');

  const sqlString = 'INSERT INTO book_people (name, fav_book, class) VALUES($1, $2, $3)';
  const sqlArray = [req.query.name, req.query.fav_book, req.query.class];

  client.query(sqlString, sqlArray)
    .then(() => res.redirect('/'));

}

function saveToSql(req){
  const sqlCheckingString = 'SELECT * FROM book_people WHERE name=$1';
  const sqlCheckingArray = [req.query.name];

  return client.query(sqlCheckingString, sqlCheckingArray);
}




app.listen(3000, () => console.log('up on 3000 '));


