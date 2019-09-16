require('dotenv').config({path: 'config.env'})
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
      'SELECT families.family_id, family_name, capability_id, capability_name, role_id, role_name, band_id, band_name, band_colour FROM families LEFT JOIN capabilities USING(family_id) LEFT JOIN roles USING(capability_id) LEFT JOIN bands USING(band_id)',
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
}

exports.getAsyncCapabilitiesByFamilyId = async (family_id) => {
  return await query("SELECT * FROM capabilities WHERE family_id = ?", [family_id]);
}

exports.getUsers = async () => {
  return await query("SELECT user_id, user_email, user_admin, role_id, user_full_name FROM users");
}

exports.getUser = async (user_id) => {
  return await query("SELECT user_id, user_email, user_admin, role_id, user_full_name FROM users WHERE user_id = ?", [user_id]);
}

exports.getUserByEmail = async (email) => {
  return await query("SELECT user_id, user_email, user_admin, role_id, user_full_name FROM users WHERE user_email = ?", [email]);
}

exports.getUserByEmailWithPassword = async (email) => {
  return await query("SELECT user_id, user_password, user_email, user_admin, role_id, user_full_name FROM users WHERE user_email = ?", [email]);
}

exports.isUserAdmin = async(user_id) => {
  return await query("SELECT user_id, user_email, user_admin, role_id, user_full_name FROM users WHERE user_id = ? AND user_admin = 1", [user_id]);
}

exports.storeUser = async (user_email, user_password, user_admin, role_id, user_full_name) => {
  return await query("INSERT INTO users (user_email, user_password, user_admin, role_id, user_full_name) VALUES (?, ?, ?, ?, ?)", [user_email, user_password, user_admin, role_id, user_full_name]); 
}

