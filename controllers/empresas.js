const { validationResult } = require('express-validator');

const Empresa = require('../models/empresas');


exports.fetchAll = async(req, res, next) => {
    try {
        const [allempresas] = await Empresa.fetchAll();
        res.status(200).json(allempresas);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchEmpresa = async(req, res, next) => {
    try {
        const [Empresa] = await Empresa.find(req.params.id);
        res.status(200).json(Empresa[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}; 

exports.deleteEmpresa = async(req, res, next) => {
    try {
        const deleteResponse = await Empresa.deleteEmpresa(req.params.id);
        res.status(200).json({ message: 'Deleted center' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createEmpresa = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) return
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const email = req.body.correoElectronico;
    const telefono = req.body.telefono;
    try {
        const EmpresaDetail = new Empresa(nombre, direccion, email, telefono);
        const result = await Empresa.save(EmpresaDetail);
        res.status(201).json({ message: 'Empresa registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }

};

