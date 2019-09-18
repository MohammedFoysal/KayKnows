const start = module.exports = function makeServer() {

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const { check, validationResult, body } = require('express-validator');
    var log4js = require('log4js');
    var logger = log4js.getLogger();
    app.use(
        log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
    logger.level = 'debug';

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    const db = require('./db.js');

    function handleError(err, req, res) {
        if (err.errno === 3819) {
            err.code = "ER_CHECK_CONSTRAINT_VIOLATED";
        }

        logger.error(err);

        let msg = "";

        if (err.sqlMessage) { // Expecting either sql error or error from validator
            msg = err.sqlMessage;
        } else {
            let sep = "";
            for (let i = 0; i < err.errors.length; i++) {
                msg = msg + sep + err.errors[i].msg;
                sep = ". ";
            }
        }

        res.status(500).send({
            successful: false,
            message: msg
        });
    }

    const server = app.listen(8002, function() {
        logger.info('express started on port 8002');
    });

    app.get('/families', async(req, res) => {
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

    app.get('/family-filters', async(req, res) => {
        try {
            const families = await db.getFamilies();

            for (family of families) {
                const capabilities = await db.getAsyncCapabilitiesByFamilyId(
                    family.family_id);

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

    app.post('/add-family', [
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
    ], async(req, res) => {
        // Handle validator errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(errors, req, res);
        }

        // No errors add the families
        try {
            const result = await db.addFamily(req.body.family_name);
            res.send({
                family_id: result.insertId,
                family_name: req.body.family_name
            });
        } catch (err) {
            return handleError(err, req, res);
        }
    });

    return server;
};

if (!process.env.NODE_ENV) {
    start();
}