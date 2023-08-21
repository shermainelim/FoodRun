const mysql = require("mysql");

const db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "bc99e83281124f",
  password: "498352de",
  database: "heroku_e3d09080d56a833",
});

module.exports = db;
