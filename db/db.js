const { Client } = require('pg');
const dbParams = require('../lib/db');
const db = new Client(dbParams);

db.connect(() => {
  console.log("connected to database");
});

module.exports = db;
