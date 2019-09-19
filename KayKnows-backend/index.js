const start = module.exports = function makeServer() {

  require('dotenv').config({ path: 'config.env' })
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

    logger.error(err);

    let msg = "";

    if (err.sqlMessage) { // Expecting either sql error or error from validator
      msg = err.sqlMessage;
    } else if (Array.isArray(err.errors)) {
      let sep = "";
      for (let i = 0; i < err.errors.length; i++) {
        msg = msg + sep + err.errors[i].msg;
        sep = ". ";
      }
    } else {
      msg = err.message || 'no message found'; // Assume there is a message
    }

    res.status(500).send({
      successful: false,
      message: msg
    });
  }

  app.get('/families', async (req, res) => {
    try {
      const families = await db.getFamilies();
      res.send(families);
    } catch (err) {
      return handleError(err, req, res);
    }
  });

  app.get('/capabilities', (req, res) => {
    db.getCapabilities((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows)
    })
  });

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
      const msg = { successful: false, message: 'Failed to authenticate token.' };
      if (err) {
        res.status(500).send(msg);
      }
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

  app.get('/capability-leads', (req, res) => {
    db.getCapabilityLeads((error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows);
    })
  });

  app.get('/capability-leads/:capability_id', (req, res) => {
    db.getCapabilityLeadByCapabilityId(req.params.capability_id, (error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows);
    })
  });

  app.get('/users/:user_id', (req, res) => {
    db.getUserById(req.params.user_id, (error, rows) => {
      if (error) {
        return handleError(error, req, res);
      }
      res.send(rows);
    })
  });

  app.get('/roles/:role_id', (req, res) => {
    db.getRoleById(req.params.role_id, (error, rows) => {
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

  app.get('/family-filters', authMiddleware, async (req, res) => {
    const userId = res.locals.userId;
    const users = await db.getUser(userId);
    const userRole = await db.getAsyncRoleById(users[0].role_id);

    try {
      let families = await db.getFamilies();

      for (family of families) {
        let capabilities = await db.getAsyncCapabilitiesByFamilyId(family.family_id);

        family.isSelected = false;

        if (family.family_id == userRole[0].family_id) {
          family.isSelected = true;
        }


        for (capability of capabilities) {
          capability.isSelected = false;

          if (capability.capability_id == userRole[0].capability_id) {
            capability.isSelected = true;
          }
        }

        family.capabilities = capabilities;
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
      const token = jwt.sign({ id: users[0].user_id }, jwtOptions.secretOrKey);

      res.json({ successful: true, message: 'Registered', token: token, user: users[0] });
    } catch (err) {
      return handleError(err, req, res);
    }
  });

  app.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body;

    if (user_email && user_password) {
      try {
        const users = await db.getUserByEmailWithPassword(user_email);
        const comparePass = await utils.comparePassword(user_password, users[0].user_password)

        if (comparePass) {
          const token = jwt.sign({ id: users[0].user_id }, jwtOptions.secretOrKey);
          delete users[0].user_password;
          res.send({ successful: true, user: users[0], token: token });
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
    const userId = res.locals.userId;
    const users = await db.getUser(userId);
    const roles = await db.getAsyncRoleById(users[0].role_id)
    users[0].role = roles[0];

    res.send(users[0]);
  });

  app.get('/test', async (req, res) => {
    res.send(process.env.AUTH_SECRET);
  });


  app.delete('/capability/:capability_id', authMiddleware, async (req, res) => {
    const capability_id = req.params.capability_id;
    const userId = res.locals.userId;
    const users = await db.getUser(userId);

    try {
      if (users && users[0].user_admin == 1) {
        const result = await db.removeCapability(capability_id);

        res.send({ successful: true, message: 'Capability deleted' });
      } else {
        throw new Error('You are not authorised to change this resource');
      }
    } catch (err) {
      if (err.errno == 1451) {
        err.sqlMessage = 'You must delete the roles associated with this capability before deleting it';
      }
      return handleError(err, req, res);
    }
  });

  app.post('/add-family', authMiddleware, [
    check('family_name')
      .exists().withMessage('Family name should be present')
      .custom(value => {
        if (value) {
          return value.length <= 100 && value.length > 0;
        }
      }).withMessage(
        'Family name should be between 1 and 100 characters (inclusive)')
      .custom(async value => {
        if (value) {
          let res = await db.getFamilyNamesByFamilyName(value);
          console.log("families: " + res.length);
          return res.length === 0 ? Promise.resolve() : Promise.reject();
        } else {
          return Promise.resolve(); // Value doesn't exist so just resolve it, the previous checks will show that there are errors.
        }
      }).withMessage('Family name is already in use')
  ], async (req, res) => {
    // Handle validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(errors, req, res);
    }

    try {
      const userId = res.locals.userId;
      const users = await db.getUser(userId);

      if (users && users[0].user_admin == 1) {
        const result = await db.addFamily(req.body.family_name);

        res.send({
          family_id: result.insertId,
          family_name: req.body.family_name
        });
      } else {
        throw new Error('You are not authorised to change this resource');
      }
    } catch (err) {
      return handleError(err, req, res);
    }
  });

  app.delete('/role/:role_id', authMiddleware, async (req, res) => {
    const role_id = req.params.role_id;
    const userId = res.locals.userId;
    const users = await db.getUser(userId);

    try {
      if (users && users[0].user_admin == 1) {
        const result = await db.removeRole(role_id);

        res.send({ successful: true, message: 'Role deleted' });
      } else {
        throw new Error('You are not authorised to change this resource');
      }
    } catch (err) {
      if (err.errno == 1451) {
        err.sqlMessage = 'You must reassign users who are assigned to this role before deleting it';
      }

      return handleError(err, req, res);
    }
  });

  app.delete('/family/:family_id', authMiddleware, async (req, res) => {
    const family_id = req.params.family_id;
    const userId = res.locals.userId;
    const users = await db.getUser(userId);

    try {
      if (users && users[0].user_admin == 1) {
        const result = await db.removeFamily(family_id);

        res.send({ successful: true, message: 'Family deleted' });
      } else {
        throw new Error('You are not authorised to change this resource');
      }
    } catch (err) {
      if (err.errno == 1451) {
        err.sqlMessage = 'You must delete capabilities which are assigned to this family before deleting it';
      }

      return handleError(err, req, res);
    }
  });

  app.delete('/band/:band_id', authMiddleware, async (req, res) => {
    const band_id = req.params.band_id;
    const userId = res.locals.userId;
    const users = await db.getUser(userId);

    try {
      if (users && users[0].user_admin == 1) {
        const result = await db.removeBand(band_id);

        res.send({ successful: true, message: 'Band deleted' });
      } else {
        throw new Error('You are not authorised to change this resource');
      }
    } catch (err) {
      if (err.errno == 1451) {
        err.sqlMessage = 'You must delete the roles which are assigned to this band before deleting it';
      }

      return handleError(err, req, res);
    }
  });

  return server;
};

if (!process.env.NODE_ENV) {
  start();
}