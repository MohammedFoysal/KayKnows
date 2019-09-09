const start = module.exports = function makeServer() {

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const {check, validationResult, body} = require('express-validator');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  const db = require('./db.js');

  function handleError(err, req, res) {
    if (err.errno === 3819) {
      err.code = "ER_CHECK_CONSTRAINT_VIOLATED";
    }
    res.status(500).send({
      message: err
    });
  }

  const server = app.listen(8002, function () {
    console.log('express started on port 8002');
  });



  return server;
};

if (!process.env.NODE_ENV) {
  start();
}
