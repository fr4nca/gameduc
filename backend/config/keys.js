let config = {};

if (process.env.NODE_ENV !== "production") {
  config = {
    dbhost: "localhost",
    dbuser: "root",
    dbpassword: "12345",
    dbname: "gameduc",
    jwtsecret: "secret"
  };
} else {
  config = {
    dbhost: process.env.DB_HOST,
    dbuser: process.env.DB_USER,
    dbpassword: process.env.DB_PASSWORD,
    dbname: process.env.DB_DATABASE,
    jwtsecret: process.env.JWT_SECRET
  };
}

module.exports = config;
