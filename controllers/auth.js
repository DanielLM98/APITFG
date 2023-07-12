const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
exports.signup = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) return
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.correoElectronico;
    const contrasena = req.body.contrasena;
    const tipoUsuario = req.body.tipoUsuario;
    const estado = req.body.estado;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 12);
        const userDetail = new User(nombre, apellido, email, hashedPassword, tipoUsuario, estado);

        const result = await User.save(userDetail);
        res.status(201).json({ message: 'User registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};