'use strict';

/*
1. Make a db `CREATE DATABASE book_people`
2. is make a schema file for your table ('s)
3. run the schema.sql file with `psql -f book_people_schema.sql -d book_people`
3. run the schema.sql file with `psql -f SCHEMA_FILE_NAME -d DATABASE_NAME`
4. install pg `npm install -S pg`
5. setup pg in your app

stuff from the url from the client: req.query
stuff from superagent: result.body
stuff from postgres: result.rows
*/

const express = require('express');
const pg = require('pg');
require('dotenv').config();

const app = express();

// const DBURL     = 'postgres://PGUSERNAME:PGPASSWD @localhost:5432/DATABASENAME
const DATABASE_URL = process.env.DATABASE_URL; //not potato
const client = new pg.Client(DATABASE_URL); // like app: an object that will be the connection to postgres
client.on('error', error => console.log(error));

// const students = [{name: 'leaundrae', favBook: 'the unspoken name', class: 301}];

app.get('/', (req, res) => {
  // client.query(SQL_COMMAND_STRING, AN_ARRAY_OF_ANY_OPTIONS)
  client.query('SELECT * FROM book_people')
    .then(stuffThatComesBackFromPostgresql => {
      // console.log(stuffThatComesBackFromPostgresql);
      res.send(stuffThatComesBackFromPostgresql.rows);

    });
})
;

app.get('/makeStudent', (req, res) => {
  // students.push(req.query);

  // SELECT * FROM book_people WHERE name = 'James M'
  // SELECT * FROM location_data WHERE search_query='seattle'

  const sqlCheckingString = 'SELECT * FROM book_people WHERE name=$1';
  const sqlCheckingArray = [req.query.name];

  client.query(sqlCheckingString, sqlCheckingArray)
    .then(stuffThatComesBackFromPostgresql => {
      console.log(stuffThatComesBackFromPostgresql);
      if(stuffThatComesBackFromPostgresql.rows.length > 0){
        //dont even bother
        res.send('yo you are already in the class, get outta here');
      } else {
        // const sqlString = 'INSERT INTO book_people (name, fav_book, class) VALUES(\'Yulia\', \'Crime and Punishment\', 301')
        const sqlString = 'INSERT INTO book_people (name, fav_book, class) VALUES($1, $2, $3)';
        const sqlArray = [req.query.name, req.query.fav_book, req.query.class];

        client.query(sqlString, sqlArray)
          .then(() => {
            res.redirect('/');
          });
      }
    });


});


// Start everything in the app
client.connect().then(() => {
  app.listen(3000, () => console.log('up on 3000 '));
});


