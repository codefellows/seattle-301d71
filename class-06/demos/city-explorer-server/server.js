/*
- create and clone down a github repository
- touch server.js
- npm init
- npm install -S express dotenv cors
- setup the server.js file
  - load the packages
  - create the app
  - create routes
  - start the server
- THEN work on your routes
*/

/*
The Environment: the collection of all variables that belong the the terminal window your code is running in
I want to use the PORT the computer wants me to use since the port is a computerish thing
I will pick my port from the environment.

creating a variable in your terminal's env is `export VARNAME=value`
It is semantic to name your variables in all caps
If I want to look at the env variables in the terminal type: `env`
if I want to see them in javascript: `process.env.VARNAME`

As devs, we can save our environment variables in a file called `.env`

When data is sent from the client to the back end it comes in a property: `request.query`
*/


// ============== Packages ==============================

const express = require('express');
const cors = require('cors'); // just kinda works and we need it
// If this line of code comes, delete it const { response } = require('express');
require('dotenv').config(); // read the `.env` file's saved env variables AFTER reading the terminal's real env's variables


// ============== App ===================================

const app = express(); // express() will return a fully ready to run server object
app.use(cors()); // enables local processes to talk to the server // Cross Origin Resource Sharing

const PORT = process.env.PORT || 3009; // process.env is boilerplace the variable name is potato
console.log(process.env.candy);


// ============== Routes ================================

const ginger = {
  name: 'ginger',
  age: 2,
  friends: 1
};

// this route can be visited http://localhost:3009/puppy
app.get('/puppy', puppyCallback); // this is a route that lives at /puppy and sends a ginger object
// the first parameter will always be given request data
// the second parameter will always be given response data
function puppyCallback(requestPotato, responsePotato){
  ginger.friends++;
  responsePotato.send(ginger);
}

/*
Lab requirement approximation: create a route named `/location` that sends location data to the client
An example of how the data should look is this: {
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}
*/

app.get('/location', handleGetLocation);
function handleGetLocation(req, res){
  // console.log(req, res);
  console.log(req.query); // {city: seattle} /// req.query.city : seattle
  const dataFromTheFile = require('./data/location.json'); // in an express server, we can synchronously get data from a local json file without a .then

  // const output = {
  //   search_query: '',
  //   formatted_query:
  //   latitude: dataFromTheFile[0].lat,
  //   longitude: dataFromTheFile[0].lon
  // };

  const output = new Location(dataFromTheFile, req.query.city);

  res.send(output);
  // res.send({
  //   'search_query': 'seattle',
  //   'formatted_query': 'Seattle, WA, USA',
  //   'latitude': '47.606210',
  //   'longitude': '-122.332071'
  // });
}


function Location(dataFromTheFile, cityName){
  this.search_query = cityName;
  this.formatted_query = dataFromTheFile[0].display_name;
  this.latitude = dataFromTheFile[0].lat;
  this.longitude = dataFromTheFile[0].lon;
}



app.get('/restaurants', handleGetRestaurants);

function handleGetRestaurants(req, res){
  // example data : [{name: 'Burger King', area: 'skyline', cuisines: 'classy american'}, {name: 'Burger King', area: 'skyline', cuisines: 'classy american'}];
  const restaurantJSON = require('./data/restaurants.json');

  // const firstRest = {
  //   name: restaurantJSON.nearby_restaurants[0].restaurant.name,
  //   area: restaurantJSON.nearby_restaurants[0].restaurant.location.locality_verbose,
  //   // Cannot read property 'locality_verbose' of undefined // the thing to the left is undefined
  //   cuisines: restaurantJSON.nearby_restaurants[0].restaurant.cuisines,
  // };
  const output = [];
  for (let i = 0; i < restaurantJSON.nearby_restaurants.length; i++){
    output.push(new Restaurant(restaurantJSON.nearby_restaurants[i].restaurant));
  }

  res.send(output);
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
