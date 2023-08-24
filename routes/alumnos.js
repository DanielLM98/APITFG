const express = require('express');

const { body } = require('express-validator');

const alumnosController = require('../controllers/alumnos');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');


router.get('/', auth, alumnosController.fetchAll);

router.post('/create', [
    auth, body('IDUsuario').trim().not().isEmpty(),
    body('IDCentro').trim().not().isEmpty(),
    body('IDEmpresa').trim(),
    body('IDTutorPracticas'),
    body('IDTutorClase'),

], alumnosController.createAlumno);

router.get('/get/:id', auth, alumnosController.fetchAlumno);

router.delete('/delete/:id', auth, alumnosController.deleteAlumno);

module.exports = router;