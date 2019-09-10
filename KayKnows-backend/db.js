require('dotenv').config({path: 'mysql.env'});

const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

exports.getCapabilities = function (callback) {
  db.query('SELECT * FROM capabilities',
      (error, rows) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, rows);
      })
};

exports.getFamilies = function (callback) {
  db.query('SELECT * FROM families',
      (error, rows) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, rows);
      })
};

