const start = module.exports = function makeServer() {

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const {check, validationResult, body} = require('express-validator'); // Later use

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  const db = require('./db.js');

  function handleError(err, req, res) {
    if (err.errno === 3819) {
      err.code = "ER_CHECK_CONSTRAINT_VIOLATED";
    }

    console.error(`${err.errno} (${err.code}) : ${err.sqlMessage}`);

    res.status(500).send({
      message: err.sqlMessage
    });
  }

  const server = app.listen(8002, function () {
    console.log('express started on port 8002');
  });

  app.get('/capabilities', (req, res) => {
    db.getCapabilities((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows)
    })
  });

  app.get('/families', (req, res) => {
    db.getFamilies((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows)
    })
  });

  app.get('/roles', (req, res) => {
    db.getRoles((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows);
    })
  });

  app.get('/bands', (req, res) => {
    db.getBands((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows);
    })
  });

  app.get('/all', (req, res) => {
    db.getAll((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows);
    })
  });

  return server;
};

if (!process.env.NODE_ENV) {
  start();
}
