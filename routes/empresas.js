const express = require('express');

const { body } = require('express-validator');

const empresasController = require('../controllers/empresas');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/', auth, empresasController.fetchAll);
router.get('/get/:id', auth, empresasController.fetchEmpresa);

router.post('/create', [
    auth,
    body('nombre').trim().not().isEmpty(),
    body('direccion').trim().not().isEmpty(),
    body('correoElectronico').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('telefono').trim().not().isEmpty(),
], empresasController.createEmpresa);

router.delete('/:id/delete', auth, empresasController.deleteEmpresa);

router.put('/update/:id', [
    auth,
    body('nombre').trim().not().isEmpty(),
    body('direccion').trim().not().isEmpty(),
    body('correoElectronico').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('telefono').trim().not().isEmpty(),
], empresasController.updateEmpresa);

router.get('/:id/alumnos', auth, empresasController.fetchAlumnosEmpresa);
router.get('/:id/tutores', auth, empresasController.fetchTutoresEmpresa);
module.exports = router;