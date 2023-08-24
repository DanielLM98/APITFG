const express = require('express');

const { body } = require('express-validator');

const tutoresClaseController = require('../controllers/tutoresclase');

const auth = require('../middleware/auth');

const router = express.Router();



router.get('/', auth, tutoresClaseController.fetchAll);

router.get('/:id/get', auth, tutoresClaseController.fetchbyUser);


module.exports = router;