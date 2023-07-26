const express = require('express');

const { body } = require('express-validator');

const formulariosController = require('../controllers/formularios');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/',auth, formulariosController.fetchAll);

module.exports = router;