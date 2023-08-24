const express = require('express');

const { body } = require('express-validator');

const admincentroController = require('../controllers/admincentros');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');

// GET /admincentros/centros
router.post('/create', [
    body('IDUsuario').trim().not().isEmpty(),
    body('IDCentro').trim().not().isEmpty()
], admincentroController.create);

router.put(':id/update', [
    body('IDUsuario').trim().not().isEmpty(),
    body('IDCentro').trim().not().isEmpty()
], admincentroController.update);

router.delete(':id/delete', admincentroController.delete);

module.exports = router;