const { validationResult } = require('express-validator');

const User = require('../models/user');


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
   
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.correoElectronico;
    const contrasena = req.body.contrasena;
    const tipoUsuario = req.body.tipoUsuario;
    const estado = req.body.estado;
    try {
        const UserDetail = new User(nombre, apellido, email, contrasena, tipoUsuario, estado);
        console.log(UserDetail)
        const result = await User.save(UserDetail);
        res.status(201).json({ message: 'Center registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};