'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

const client = new pg.Client('postgres://ncarignan:password@localhost:5432/ncarignan');
client.on('error', console.log);

app.set('view engine', 'ejs');

app.get('/goGetJobData', goGetJobData);

app.get('/staticStuffWeCanSave', showSavingStuff);

app.post('/save', saveStuff);

function goGetJobData(req, res){
  // if someone visits this they want to see jobs
  // we don;t have job postings so lets go get some from superagent
  // console.log('job route');

  // https://jobs.github.com/positions.json?description=java&location=seattle
  superagent.get('https://jobs.github.com/positions.json?description=java&location=seattle')
    .then(whatComesBack => {
      console.log(whatComesBack.body);
      res.render('jobs.ejs', { jobs: whatComesBack.body });

    });

}

function showSavingStuff(req, res){

  const pets = ['Ginger', 'Ratcat', 'Rufus', 'Hamburger', 'Hamilton', 'Luna', 'FishSticks'];

  res.render('pets.ejs', {pets});
}

function saveStuff(req, res){
  console.log(req.body.petName);
  // take the petName and save it to the db
  client.query('INSERT into pet (name) VALUES ($1)', [req.body.petName])
    .then(() => {
      res.send('saving');

    });
}



client.connect()
  .then(() => {
    app.listen(3000, () => console.log('on hardcoded port 3000'));
  });
