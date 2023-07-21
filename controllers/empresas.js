const { validationResult } = require('express-validator');

const Empresa = require('../models/empresas');


exports.fetchAll = async(req, res, next) => {
    try {
        const [allempresas] = await Centro.fetchAll();
        res.status(200).json(allempresas);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchCentro = async(req, res, next) => {
    try {
        const [Centro] = await Centro.find(req.params.id);
        res.status(200).json(Centro[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}; 

exports.deleteCentro = async(req, res, next) => {
    try {
        const deleteResponse = await Centro.deleteCentro(req.params.id);
        res.status(200).json({ message: 'Deleted center' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createCenter = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) return
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const email = req.body.correoElectronico;
    const telefono = req.body.telefono;
    try {
        const CentroDetail = new Centro(nombre, direccion, email, telefono);
        const result = await Centro.save(CentroDetail);
        res.status(201).json({ message: 'Center registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

