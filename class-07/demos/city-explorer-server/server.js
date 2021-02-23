/*
  Updating heroku
  we need to get the api keys onto heroku
  Go to settings
  Reveal config vars
  add any api keys you need

  Two steps for every route: 1 create a working url and replace dataFromJson with dataFromSuperagent
  2: Make everything dynamic using the data from the client (req.query)
*/

// ============== Packages ==============================

const express = require('express');
const cors = require('cors');
const superagent = require('superagent'); // fetches data from other servers, it stores it in response.body
require('dotenv').config();

// ============== App ===================================

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3009;
const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
const RESTAURANT_API_KEY = process.env.RESTAURANT_API_KEY;
console.log(process.env.candy);


// ============== Routes ================================


app.get('/location', handleGetLocation);
function handleGetLocation(req, res){
  // const dataFromTheFile = require('./data/location.json'); // in an express server, we can synchronously
  // TODO: go to the internet and get data
  // we need superagent: npm install -S superagent
  // TODO: make this dynamic using what the client is searching for (req.query.city);

  const city = req.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATION_API_KEY}&q=${city}&format=json`;

  superagent.get(url)
    .then(stuffThatComesBack => {
      // console.log(stuffThatComesBack.body); // anytime this week that data comes back it will be in the body
      // dataFromTheFile === stuffThatComeBAck.body so we can replace dataFromTheFile
      const output = new Location(stuffThatComesBack.body, req.query.city);

      res.send(output);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      res.status(500).send('Sorry something went wrong');
    });




}


function Location(dataFromTheFile, cityName){
  this.search_query = cityName;
  this.formatted_query = dataFromTheFile[0].display_name;
  this.latitude = dataFromTheFile[0].lat;
  this.longitude = dataFromTheFile[0].lon;
}



app.get('/restaurants', handleGetRestaurants);

function handleGetRestaurants(req, res){
  // const restaurantJSON = require('./data/restaurants.json');
  //TODO: make this dynamic
  console.log(req.query);
  const url = `https://developers.zomato.com/api/v2.1/geocode?lat=52.8278656&lng=-122.3053932`;
  // Set the header 'user-key' to your api key
  superagent.get(url)
    .set('user-key', RESTAURANT_API_KEY)
    .then(dataFromTheFile => {
      // console.log(dataFromTheFile.body);

      // req.query === {
      //   search_query: 'idaho city',
      //     formatted_query: 'Idaho City, Boise County, Idaho, USA',
      //       latitude: '43.8280309',
      //         longitude: '-115.8344968'
      // }



      const output = [];
      for (let i = 0; i < dataFromTheFile.body.nearby_restaurants.length; i++) {
        output.push(new Restaurant(dataFromTheFile.body.nearby_restaurants[i].restaurant));
      }

      res.send(output);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      res.status(500).send('Sorry something went wrong');
      // 200 things went well
      // 300 redirect
      // 400 you did something wrong
      // 500 I did something wrong
    });



  // $.get('/location?city=idaho city')
  //   .then(stuffThatComesBAckFromTheServerUS => {

  //     Mustache.render(picAndTitleTemplate, stuffThatComesBAckFromTheServerUS);

  //     $.get('/restaurants', stuffThatComesBAckFromTheServerUS)
  //     // {
  //     //   search_query: 'idaho city',
  //     //     formatted_query: 'Idaho City, Boise County, Idaho, USA',
  //     //       latitude: '43.8280309',
  //     //         longitude: '-115.8344968'
  //     // }
  //       .then(restaurantsThatcomebackfromserver => {
  //         Mustache.render(restaurantTemplate, restaurantsThatcomebackfromserver);
  //       });
  //   });





}


function Restaurant(object){
  {
    this.name = object.name;
    this.area = object.location.locality_verbose;
    this.cuisines = object.cuisines;
  }
}


// ============== Initialization ========================

// I can visit this server at http://localhost:3009
app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`)); // this is what starts the server
