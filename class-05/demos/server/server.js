'use strict';

// ===========================Import our packages/libraries into this file
const express = require('express'); // require means load
// EXPRESS is a library that handles creating servers and talking on the internet through http
const cors = require('cors');
// CORS means cross origin resource sharing - enables firewall like behavior controls
// It releases a restriction that your computer cannot talk to your computer
// it lets your computer talk to itself.

const PORT = 3001; // we pick 3000 because devs just decided to do that and we are sheep people

// =============== instantiate a server ============- an object that contains methods that respond to requests
const appPotato = express();
// add settings / middleware to the server. Middleware is code that runs in the middle of two other functions / behind the scenes
appPotato.use(cors()); // cors totally takes in all sorts of custom settings as arguments, the default works great for us

appPotato.use(express.static('./publicPotato'));
// this allows me to send any files in the folder publicPotato
// it also creates one route  at `/` (like there is an app.get('/', req, res => sends(index.html)))
// to devs static means files that do not change, once the server is running, the html doesn't get edited

// ================ define how people can talk to us=====================
// define the routes
appPotato.get('/ginger', (requestPotato, responsePotato) => {
  console.log('visiting the ginger route');
  responsePotato.send('Ginger loves you so much');
});

appPotato.get('/snowdrop', handleSnowdropRequests);

function handleSnowdropRequests(req, res){
  res.send({love: 'tolerates you', thingsYouOweMe: ['treats', 'playtime', 'scritches'], owner: 'I own nich'});
}

// ========================= start the server
appPotato.listen(PORT, () => console.log(`app is working on port ${PORT}`));
