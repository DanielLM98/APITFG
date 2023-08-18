const express = require('express');

const { body } = require('express-validator');

const alumnosController = require('../controllers/alumnos');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, alumnosController.fetchAll)
router.post('/create', [
    auth, body('IDUsuario').trim().not().isEmpty(),
    body('IDCentro').trim().not().isEmpty(),
], alumnosController.createAlumno);