require('dotenv').config({path: 'mysql.env'})
const util = require('util');

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

const query = util.promisify(db.query).bind(db);

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

exports.getAll = function (callback) {
  db.query(
      'SELECT families.family_id, family_name, capability_id, capability_name, role_id, role_name, band_id, band_name FROM families LEFT JOIN capabilities USING(family_id) LEFT JOIN roles USING(capability_id) LEFT JOIN bands USING(band_id)',
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

exports.getCapabilitiesByFamilyId = function (family_id, callback) {
  db.query('SELECT * FROM capabilities WHERE family_id = ?', [family_id],
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
          return callback(error, null);
        }
        callback(null, rows);
      })
};

exports.getFamilies = async () => {
  const rows = await query("SELECT * FROM families");

  return rows;
}

exports.getAsyncCapabilitiesByFamilyId = async (family_id) => {
  const rows = await query("SELECT * FROM capabilities WHERE family_id = ?", [family_id]);

  return rows;
}





