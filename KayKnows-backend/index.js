const start = module.exports = function makeServer() {

  require('dotenv').config({path: 'config.env'})
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const { check, validationResult, body } = require('express-validator');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const log4js = require('log4js');
  const logger = log4js.getLogger();
  app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
  logger.level = 'debug';

  let jwtOptions = { secretOrKey: process.env.AUTH_SECRET };

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  const db = require('./db.js');
  const utils = require('./utils.js');

  function handleError(err, req, res) {
    if (err.errno === 3819) {
      err.code = "ER_CHECK_CONSTRAINT_VIOLATED";
    }

    console.error(err);

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
    let payload = {
      successful: false,
      data: data
    };

    logger.error(payload);

    res.status(500).send(payload);
  }

  let authMiddleware = (req, res, next) => {
    var token = req.headers.authorization;

    if (!token) {
      res.send({ message: 'No token found' });
    } else {
      if (token.startsWith("Bearer ")) {
        token = token.substring(7, token.length);
      }
    }

    jwt.verify(token, jwtOptions.secretOrKey, function (err, decoded) {
      var msg = { successful: false, message: 'Failed to authenticate token.' };
      if (err) res.status(500).send(msg);
      res.locals.userId = decoded.id;
      next();
    });
  };

  const server = app.listen(8002, function () {
    logger.info('express started on port 8002');
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

  app.get('/users', async (req, res) => {
    try {
      const users = await db.getUsers();

      res.send(users);
    } catch (err) {
      return handleError(err, req, res);
    }
  });

  app.get('/user/:user_id', async (req, res) => {
    try {
      const users = await db.getUser(req.params.user_id);

      res.send(users[0]);
    } catch (err) {
      return handleError(err, req, res);
    }
  });

  app.post('/register', async (req, res) => {
    const { user_email, user_password, user_admin, role_id, user_full_name } = req.body;
    const hashedPassword = await utils.hashPassword(user_password);

    try {
      const results = await db.storeUser(user_email, hashedPassword, user_admin, role_id, user_full_name);
      const users = await db.getUser(results.insertId);
      let user = users[0];

      let payload = { id: user.user_id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);

      res.json({ successful: true, message: 'Registered', token: token, user: user });
    } catch (err) {
      return handleError(err, req, res);
    }
  });

  app.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body;

    if (user_email && user_password) {
      try {
        const users = await db.getUserByEmailWithPassword(user_email);
        let user = users[0];
        let comparePass = await utils.comparePassword(user_password, user.user_password)

        if (comparePass) {
          let payload = { id: user.user_id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);

          delete user.user_password;
          res.send({ successful: true, user: user, token: token });
        } else {
          res.send({ successful: false, message: 'Wrong username and password' });
        }

      } catch (err) {
        return handleError(err, req, res);
      }
    } else {
      res.send({ successful: false, message: 'Please enter a username and password' });
    }
  });

  app.get('/me', authMiddleware, async (req, res) => {
    let userId = res.locals.userId;
    let users = await db.getUser(userId);

    res.send(users[0]);
  });

  app.get('/test', async (req, res) => {
    res.send(process.env.AUTH_SECRET);
  });


  return server;
};

if (!process.env.NODE_ENV) {
  start();
}
