const { validationResult } = require('express-validator');

const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.fetchAll = async(req, res, next) => {
    try {
        const [allUsers] = await User.fetchAll();
        res.status(200).json(allUsers);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchbyCentro = async(req, res, next) => {
    try {
        const [allUsers] = await User.fetchbyCentro(req.params.id);
        res.status(200).json(allUsers);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}
exports.fetchUser = async(req, res, next) => {
    try {
        const [User] = await User.find(req.params.id);
        res.status(200).json(User[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteUser = async(req, res, next) => {
    try {
        const deleteResponse = await User.deleteUser(req.params.id);
        res.status(200).json({ message: 'Deleted user' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createUser = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) return

    const nombre = req.body.Nombre;
    const apellido = req.body.Apellidos;
    const email = req.body.CorreoElectronico;
    const contrasena = (nombre[0].toLowerCase() + ' ' + apellido).split(' ').map(word => word.substring(0, 3).toLowerCase()).join('');
    const hashedPassword = await bcrypt.hash(contrasena, 12);

    const tipoUsuario = req.body.TipoUsuario;
    try {
        const UserDetail = new User(nombre, apellido, email, hashedPassword, tipoUsuario, 'Activo');
        const result = await User.save(UserDetail);
        res.status(201).json({ message: 'Center registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }

};