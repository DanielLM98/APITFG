const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const nodemailer = require('nodemailer');

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
            email: storedUser.CorreoElectronico,
            userId: storedUser.ID
        }, 'secretfortoken', { expiresIn: '24h' });
        const role = storedUser.TipoUsuario;

        userSession = new User(storedUser.Nombre, storedUser.Apellido, storedUser.CorreoElectronico, '', storedUser.TipoUsuario, storedUser.Estado);
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

exports.recovery = async(req, res, next) => {
    const email = req.body.correoElectronico;
    try {
        const user = await User.find(email);
        console.log(user)
        if (user[0].length !== 1) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            console.log(error);

            throw error;
        } else {
            const token = jwt.sign({ correo: email }, 'secretfortoken', { expiresIn: '24h' });
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'dlunmortfg@gmail.com',
                    pass: 'baiayukopdahoqzm'
                }
            });

            var mailOptions = {
                from: 'dlunmortfg@gmail.com',
                to: email,
                subject: 'Password Recovery',
                html: '<h1>Hola ' + user[0][0].Nombre + ' ' + user[0][0].Apellido + ' </h1>' +
                    '<p>Has solicitado recuperar tu contraseña, para hacerlo da click en el siguiente enlace:</p>' +
                    '<a href="http://localhost:4200/resetPassword/?user=' + email + '&token=' + token + '">Recuperar contraseña </a>',

            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);

                }
            });
        }
    } catch (error) {
        if (!error.statusCode) {
            console.log(error);
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.resetPassword = async(req, res, next) => {
    console.log(req.headers['authorization']);
    const email = jwt.decode(req.headers['authorization'].split(' ')[1]).correo;

    const contrasena = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 12);
        const user = await User.find(email);
        if (user[0].length !== 1) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        } else {
            const result = await User.resetPassword(email, hashedPassword);
            console.log("cambio realizado correctamente")
            res.status(201).json({ message: 'Password updated!' });

        }

    } catch (error) {
        if (!error.statusCode) {
            console.log(error);
            error.statusCode = 500;
        }
        next(error);
    }
}