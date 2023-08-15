const express = require('express');

const { body } = require('express-validator');

const centrosController = require('../controllers/centros');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/', auth, centrosController.fetchAll);
router.get('/get/:id', auth, centrosController.fetchCentro);

router.post('/create', [
    auth,
    body('nombre').trim().not().isEmpty(),
    body('direccion').trim().not().isEmpty(),
    body('correoElectronico').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('telefono').trim().not().isEmpty(),
], centrosController.createCenter);



router.delete('/delete/:id', auth, centrosController.deleteCentro);


router.get('/getAlumnosCentro/:id', auth, centrosController.fetchAlumnosCentro);

module.exports = router;