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
    body('Apellido').trim().not().isEmpty(),
    body('CorreoElectronico').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('TipoUsuario').trim().not().isEmpty(),
    body('Centro'),
    body('Empresa'),
    body('TutorClase'),
    body('TutorEmpresa')
], usuariosController.createUser);


router.put('/update/:id', [auth,
    body('Nombre').trim().not().isEmpty(),
    body('Apellido').trim().not().isEmpty(),
    body('CorreoElectronico').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('TipoUsuario').trim().not().isEmpty(),
    body('Centro'),
    body('Empresa'),
    body('TutorClase'),
    body('TutorEmpresa')
], usuariosController.updateUser);
router.delete('/delete/:id', auth, usuariosController.deleteUser);

router.get('/getByCentro/:id', auth, usuariosController.fetchbyCentro);

router.get('/:id/centro', auth, usuariosController.fetchCentroByUser);

router.get('/:id/empresa', auth, usuariosController.fetchEmpresaByUser);

router.get('/getTodosDatosUsuario/:id', auth, usuariosController.fetchAllUserData);
router.put('/:id/changePassword', [auth,
    body('Actual'),
    body('Nueva').trim().isLength({ min: 8 }).withMessage("La longuitud minima es de 8")
], usuariosController.changePassword);

router.put('/:id/updatePerfil', [auth, body('Nombre').trim().not().isEmpty(),
    body('Apellido').trim().not().isEmpty(),
], usuariosController.updatePerfil);
module.exports = router;