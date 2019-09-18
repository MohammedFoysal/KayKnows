require('dotenv').config({path: 'mysql.env'})
const util = require('util');
const mysql = require('mysql');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
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
  logger.info("Connected to MySQL");
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
  return await query("SELECT * FROM families");
};

exports.getAsyncCapabilitiesByFamilyId = async (family_id) => {
  return await query("SELECT * FROM capabilities WHERE family_id = ?", [family_id]);
};


exports.addFamily = async (family_name) => {
  return await query("INSERT INTO families (family_name) VALUES (?)", [family_name]);
};

exports.getFamilyNamesByFamilyName = async (family_name) => {
  return await query("SELECT family_name FROM families WHERE family_name = ?", [family_name]);
};




