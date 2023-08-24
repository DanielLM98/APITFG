const express = require('express');

const { body } = require('express-validator');

const tutoresTrabajoController = require('../controllers/tutorestrabajo');

const auth = require('../middleware/auth');

const router = express.Router();


router.get('/', auth, tutoresTrabajoController.fetchAll);

router.get('/:id/get', auth, tutoresTrabajoController.fetchbyUser);

module.exports = router;