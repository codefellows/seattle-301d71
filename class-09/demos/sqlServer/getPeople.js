const client = require('./client.js');

const callback = (req, res) => {
  getPeopleFromSQL() // {promise} => {rows:[123]}
    .then(getMyPeepsFromSQLResult) // [123] // the return from this line, gets passed into the next .then's function
    .then(res.send);// receives [123] => sends


}
;


function getPeopleFromSQL() {
  return client.query('SELECT * FROM book_people');
}

function getMyPeepsFromSQLResult(stuffThatComesBackFromPostgresql) {
  return stuffThatComesBackFromPostgresql.rows; // []
}


module.exports = callback;
