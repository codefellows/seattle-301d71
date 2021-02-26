# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```
'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.post( '/',  (request, response) => { // app.post is totally valid and we will learn more monday
  let SQL = 'INSERT INTO users VALUES ($1, $2)';

  let values = [request.body.username, request.body.password]; // id auto adds, we probably want to add an age
  
  client.query(SQL, values)
    .then(function(result){
      response.send(result.rowCount);
    })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)}
);
```

## schema.sql

```
DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  age INT
);
```
