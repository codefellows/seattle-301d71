# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```
'use strict';

const express = require('express');

const app = app();

app.post(('/') => (request, response) {
  let SQL = 'Insert into users values $0, $1, $2';

  let values = {id, request.username, request.password};
  
  client.query(SQL)
    .then({
      response.send(result.rowsCount);
    })
})

app.listen(PORT, () {
  console.log('Listening on ${PORT}')}
);
```

## schema.sql

```
DROP TABLE IF NOT EXISTS users

CREATE TABLE users() {
  id SERIAL KEY;
  username VARCHAR;
  password VARCHAR;
  age NUM;
}
```
