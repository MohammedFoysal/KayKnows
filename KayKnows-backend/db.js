require('dotenv').config({path: 'mysql.env'})

const mysql = require('mysql');
const env = process.env.NODE_ENV === 'test' || 'dev';

const connection = (env === 'dev') ? process.env.DB_DATABASE
    : process.env.DB_TEST_DATABASE;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: connection
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

exports.getAll = function (callback) {
  db.query(
      'SELECT families.family_id, family_name, capability_id, capability_name, role_id, role_name, band_id FROM families LEFT JOIN capabilities USING(family_id) LEFT JOIN roles USING(capability_id)',
      (error, rows) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, rows);
      })
};

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

exports.getRoles = function (callback) {
  db.query('SELECT * FROM roles',
      (error, rows) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, rows);
      })
};

exports.getBands = function (callback) {
  db.query('SELECT * FROM bands',
      (error, rows) => {
        if (error) {
          return callback(null, error);
        }
        callback(rows, null)
      })
};



