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
        const [empresa] = await Empresa.fetchEmpresa(req.params.id);
        res.status(200).json(empresa[0]);
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
        res.status(200).json({ message: 'Deleted empresa' });
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
    const CentroID = req.body.CentroID;
    try {
        const EmpresaDetail = new Empresa(nombre, direccion, email, telefono, CentroID);
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

exports.updateEmpresa = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const email = req.body.correoElectronico;
    const telefono = req.body.telefono;
    const CentroID = req.body.CentroID;
    try {
        const EmpresaDetail = new Empresa(nombre, direccion, email, telefono, CentroID);
        const result = await Empresa.updateEmpresa(req.params.id, EmpresaDetail);
        res.status(201).json({ message: 'Empresa updated!', empresa: EmpresaDetail });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }

};

exports.fetchAlumnosEmpresa = async(req, res, next) => {
    try {
        const [alumnos] = await Empresa.fetchAlumnosEmpresa(req.params.id);
        res.status(200).json(alumnos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchTutoresEmpresa = async(req, res, next) => {
    try {
        const [tutores] = await Empresa.fetchTutoresEmpresa(req.params.id);
        res.status(200).json(tutores);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};