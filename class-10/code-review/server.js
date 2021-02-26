'use strict';

/*
1. created our files
2. Npm init
3. npm install -S ...
4. Created our schema
5. psql -f sql/schema.sql -d city_explorer_301d71_10
6. Build the server
7. Build all the routes and callbacks, send the default json data
8. Actually hit apis and stuff


Model : Data's shape. SQL tables, Mustache templating, constructors
View : front end - everything the user sees and interacts with
Controller: how the user interacts / the logic, anything that moved data between the model and the view

*/

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));

// document.getE;lementById('clicky').addEventListener('/location', callbackFunction)
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/parks', getParks);
app.get('/yelp', getYelp);
app.get('/movies', getMovies);

function getLocation(req, res){
  // I want to get the data from the api if the data is not in our database

  // I dont want to get the data from the api if it is in our database

  const sqlSearch = 'SELECT * FROM city WHERE search_query=$1';
  const sqlSearchArray = [req.query.city];

  client.query(sqlSearch, sqlSearchArray) // search our db for city
    .then(function(dataFromTheDatabase){ // city results came back // .addEventListener(data coming back)
      if(dataFromTheDatabase.rowCount > 0){
        res.send(dataFromTheDatabase.rows[0]);
      } else {
        const url = 'https://us1.locationiq.com/v1/search.php';

        const queryStringParams = {
          key: process.env.LOCATION_API_KEY,
          city: req.query.city,
          format: 'json',
          limit: 1
        };

        superagent.get(url, queryStringParams) // search api for city
          .then( function (dataFromApi) { // api results come back
            const newCity = new Location(dataFromApi.body[0], req.query.city);
            res.send(newCity);

            const sqlSave = 'INSERT INTO city (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
            const sqlSaveArr = [newCity.search_query, newCity.formatted_query, newCity.latitude, newCity.longitude];

            client.query(sqlSave, sqlSaveArr)
              .then(() => console.log('saved'));
          });
      }
    })
    .catch(err => console.log(err));





}

function Location(someObj, userSearch){
  this.search_query = userSearch;
  this.formatted_query = someObj.display_name;
  this.latitude = someObj.lat;
  this.longitude = someObj.lon;
}

function getWeather(req, res){
  res.send([
    {
      'forecast': 'Partly cloudy until afternoon.',
      'time': 'Mon Jan 01 2001'
    },
    {
      'forecast': 'Mostly cloudy in the morning.',
      'time': 'Tue Jan 02 2001'
    }
  ]
  );
}

function getParks(req, res){
  res.send([
    {
      'name': 'Klondike Gold Rush - Seattle Unit National Historical Park',
      'address': '319 Second Ave S., Seattle, WA 98104',
      'fee': '0.00',
      'description': 'Seattle flourished during and after the Klondike Gold Rush. Merchants supplied people from around the world passing through this port city on their way to a remarkable adventure in Alaska. Today, the park is your gateway to learn about the Klondike Gold Rush, explore the area\'s public lands, and engage with the local community.',
      'url': 'https://www.nps.gov/klse/index.htm'
    },
    {
      'name': 'Mount Rainier National Park',
      'address': '55210 238th Avenue East, Ashford, WA 98304',
      'fee': '0.00',
      'description': 'Ascending to 14,410 feet above sea level, Mount Rainier stands as an icon in the Washington landscape. An active volcano, Mount Rainier is the most glaciated peak in the contiguous U.S.A., spawning five major rivers. Subalpine wildflower meadows ring the icy volcano while ancient forest cloaks Mount Rainier’s lower slopes. Wildlife abounds in the park’s ecosystems. A lifetime of discovery awaits.',
      'url': 'https://www.nps.gov/mora/index.htm'
    }

  ]);
}

function getMovies(req, res){
  res.send([
    {
      'title': 'Sleepless in Seattle',
      'overview': 'A young boy who tries to set his dad up on a date after the death of his mother. He calls into a radio station to talk about his dad’s loneliness which soon leads the dad into meeting a Journalist Annie who flies to Seattle to write a story about the boy and his dad. Yet Annie ends up with more than just a story in this popular romantic comedy.',
      'average_votes': '6.60',
      'total_votes': '881',
      'image_url': 'https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg',
      'popularity': '8.2340',
      'released_on': '1993-06-24'
    },
    {
      'title': 'Love Happens',
      'overview': 'Dr. Burke Ryan is a successful self-help author and motivational speaker with a secret. While he helps thousands of people cope with tragedy and personal loss, he secretly is unable to overcome the death of his late wife. It\'s not until Burke meets a fiercely independent florist named Eloise that he is forced to face his past and overcome his demons.',
      'average_votes': '5.80',
      'total_votes': '282',
      'image_url': 'https://image.tmdb.org/t/p/w500/pN51u0l8oSEsxAYiHUzzbMrMXH7.jpg',
      'popularity': '15.7500',
      'released_on': '2009-09-18'
    }
  ]);
}

function getYelp(req, res){
  const queryParams = {
    latitude: req.query.latitude,
    term: 'restaurant',
    longitude: req.query.longitude,
    format: 'json',
    limit: 5,
    offset: (req.query.page - 1) * 5
  };


  const url = `https://api.yelp.com/v3/businesses/search`;
  superagent.get(url, queryParams)
    .set('authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(data =>{
      console.log('here', data.body.businesses);

      const yelpSummaries = data.body.businesses.map(business => {
        try{
          return new Yelp(business);
        } catch(e) {
          return {};
        }
      });
      console.log(yelpSummaries);
      return yelpSummaries;
    })
    .then(stuff => res.send(stuff))
    .catch(console.log);
}


function Yelp(business) {
  this.name = business.name;
  this.image_url = business.image_url;
  this.price = business.price;
  this.rating = business.rating;
  this.url = business.url;
  this.created_at = Date.now();
}

client.connect()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => console.log(`we are up on http://localhost:${PORT}`));
  });
