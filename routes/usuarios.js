const express = require('express');

const { body } = require('express-validator');

const usuariosController = require('../controllers/usuarios');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/',auth, usuariosController.fetchAll);
router.get('/get/:id',auth, usuariosController.fetchUser);

router.post('/create', [
    auth,
    body('Nombre').trim().not().isEmpty(),
    body('Direccion').trim().not().isEmpty(),
    body('correoElectronico').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('telefono').trim().not().isEmpty(),
], usuariosController.createUser);



router.delete('/delete/:id', auth, usuariosController.deleteUser);

module.exports = router;