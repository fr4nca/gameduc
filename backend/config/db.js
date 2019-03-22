const mysql = require("mysql");
const keys = require("./keys");

const db = mysql.createConnection({
  host: keys.dbhost,
  user: keys.dbuser,
  password: keys.dbpassword,
  database: keys.dbname,
  multipleStatements: true
});

module.exports = db;
