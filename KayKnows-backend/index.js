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
      successful: false,
      message: err.sqlMessage
    });
  }

  function handleAsyncError(result, res) {
    var data = "Unknown Error";

    if (!result.successful) {
      data = result.data;
    }

    res.status(500).send({
      successful: false,
      data: data
    });
  }

  const server = app.listen(8002, function () {
    console.log('express started on port 8002');
  });

  app.get('/families', (req, res) => {
    db.getFamilies((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows)
    })
  });

  app.get('/capabilities', (req, res) => {
    db.getCapabilities((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows)
    })
  });

  app.get('/capabilities/:family_id', (req, res) => {
    db.getCapabilitiesByFamilyId(req.params.family_id, (error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows);
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

  app.get('/family-filters', async (req, res) => {
    try {
      const families = await db.getFamilies();

      for (family of families) {
        const capabilities = await db.getAsyncCapabilitiesByFamilyId(family.family_id);

        family.isSelected = false;
        family.capabilities = capabilities;

        for (capability of capabilities) {
          capability.isSelected = false;
        } 
      }
    
      res.send(families);
    } catch (err) {
      return handleError(err, req, res);
    }
  });

  return server;
};

if (!process.env.NODE_ENV) {
  start();
}
