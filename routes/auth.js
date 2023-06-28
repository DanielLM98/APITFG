const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

router.post('/singup', [

    body('nombre').trim().not().isEmpty(),
    body('apellido').trim().not().isEmpty(),
    body('correoElectronico').isEmail().withMessage('Please enter a valid email.').custom(async(email) => {
        const user = await User.find(email);
        console.log("llega aqui")
        if (user[0].length > 0) {
            return Promise.reject('Email address already exists!');
        }
    }).normalizeEmail(),
    body('contrasena').trim().isLength({ min: 8 }),
    body('tipoUsuario').trim().not().isEmpty(),
    body('estado').trim().not().isEmpty()
], authController.signup);

router.get('/', (req, res) => {
    res.send('Auth!');
});

module.exports = router;