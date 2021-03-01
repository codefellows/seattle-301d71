'use strict';

/*
Forms are the superagent of html - they go onto the internet
the action is the url we visit
the inputs are the query string parameters
*/

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const flavors = ['vanilla', 'chocolate'];

app.use(express.static('./public')); // serve all the files in the specified folder
app.use(express.urlencoded({extended: true}));

app.get('/ice-cream', (req, res) => {
  res.send(flavors);
});

// we use app.post because the goal is to CREATE new ice cream
// Cannot GET /add-ice-cream-flavor :: the GET route on the server does not exist
// /add-ice-cream-flavor can only be visited by a POST type method
// default form behavior is GET but it can be POST

// GET url:  http://localhost:3000/add-ice-cream-flavor?flavor=candy+corn
// POST url: http://localhost:3000/add-ice-cream-flavor

// POST method forms do not create query string parameters with the input
// POST methods encode the data inside the request

app.post('/add-ice-cream-flavor', (req, res) => {
  // flavors.push(req.query.flavor); // For GET / things on the url
  // there is a property on the response from superagent called .body - it stores data
  // there is a property on request from http POSTS called .body - it stores the data
  console.log(req.body);
  res.send(flavors);
});

app.listen(PORT, () => console.log(`up on http://localhost:${PORT}`));


/*
  The forms need to have an action of the route name you want to talk to
  You need to match the method of the form to the method on the server POST -> .post GET -> .get
  you need the middleware express.urlEncoded({extended:true}) to read req.body in the server
*/
