# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```
const express = require('express');
// const cors = require('cors')
const PORT = process.env.PORT;

http://localhost:3000/username?username=ncarigna&password=supersecretpassword
app.get('/username', (req, res) => {
  const userInfo = {};

  userInfo.name = req.query.username;
  userInfo.password = req.query.password;

  res.sendFile('index.html')
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
```
