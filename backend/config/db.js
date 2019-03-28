const mysql = require("mysql");
const keys = require("./keys");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: keys.dbhost,
      user: keys.dbuser,
      password: keys.dbpassword,
      database: keys.dbname,
      multipleStatements: true
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = new Database();
