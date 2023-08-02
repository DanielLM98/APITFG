const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const jwt = require('jsonwebtoken');


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

exports.login = async(req, res, next) => {
    const email = req.body.correoElectronico;
    const contrasena = req.body.contrasena;

    try {
        const user = await User.find(req.body.correoElectronico);
        if (user[0].length !== 1) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(contrasena, storedUser.Contrasena);

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: storedUser.correoElectronico,
            userId: storedUser.id
        }, 'secretfortoken', { expiresIn: '24h' });
        const role = storedUser.TipoUsuario;
        
        userSession = new User( storedUser.Nombre, storedUser.Apellido, storedUser.CorreoElectronico, '', storedUser.TipoUsuario, storedUser.Estado);
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({ token: token, userSession: userSession, userId: storedUser.ID });

    } catch (error) {
        if (!error.statusCode) {
            console.log(error);
            error.statusCode = 500;
        }
        next(error);
    }

}