const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signup', [

    body('nombre').trim().not().isEmpty(),
    body('apellido').trim().not().isEmpty(),
    body('correoElectronico').isEmail().withMessage('Please enter a valid email.')
    .custom(async(email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
            return Promise.reject('E-Mail address already exists!');
        }
    }).normalizeEmail(),
    body('contrasena').trim().isLength({ min: 8 }),
    body('tipoUsuario').trim().not().isEmpty(),
    body('estado').trim().not().isEmpty()
], authController.signup);

router.get('/', (req, res) => {
    res.send('Auth!');
});

router.post('/login', authController.login);

router.post('/recovery', [body('correoElectronico').isEmail().withMessage('Please enter a valid email.').custom(
    async(correoElectronico) => {
        const user = await User.find(correoElectronico);
        console.log(user)
        if (user[0].length == 0) {
            return Promise.reject('E-Mail address does not exist!');
        }
    }).normalizeEmail()], authController.recovery);

router.put('/resetPassword', [body('password').trim().isLength({ min: 8 }).withMessage("La longuitud minima es de 8")], authController.resetPassword);
module.exports = router;