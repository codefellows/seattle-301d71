const pg = require('pg');


const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);

client.connect();

module.exports = client;
