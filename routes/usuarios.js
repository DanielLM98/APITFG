const express = require('express');

const { body } = require('express-validator');

const usuariosController = require('../controllers/usuarios');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/', auth, usuariosController.fetchAll);
router.get('/get/:id', auth, usuariosController.fetchUser);

router.post('/create', [
    auth,
    body('Nombre').trim().not().isEmpty(),
    body('Apellidos').trim().not().isEmpty(),
    body('CorreoElectronico').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('TipoUsuario').trim().not().isEmpty(),
], usuariosController.createUser);



router.delete('/delete/:id', auth, usuariosController.deleteUser);

router.get('/getByCentro/:id', auth, usuariosController.fetchbyCentro);

module.exports = router;