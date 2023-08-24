const { validationResult } = require('express-validator');

const Centro = require('../models/centros');


exports.fetchAll = async(req, res, next) => {
    try {
        const [allCentros] = await Centro.fetchAll();
        res.status(200).json(allCentros);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchCentro = async(req, res, next) => {
    try {
        const [Centr] = await Centro.fecthCentro(req.params.id);
        res.status(200).json(Centr[0]);
    } catch (err) {
        if (!err.statusCode) {
            console.log(err)
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
        console.log(CentroDetail)
        const result = await Centro.save(CentroDetail);
        res.status(201).json({ message: 'Center registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.fetchAlumnosCentro = async(req, res, next) => {
    try {
        const [alumnos] = await Centro.fetchAlumnosCentro(req.params.id);
        res.status(200).json(alumnos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchTutoresCentro = async(req, res, next) => {
    try {
        const [tutores] = await Centro.fetchTutoresCentro(req.params.id);
        res.status(200).json(tutores);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateCentro = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const email = req.body.correoElectronico;
    const telefono = req.body.telefono;
    try {
        const CentroDetail = new Centro(nombre, direccion, email, telefono);
        const result = await Centro.updateCentro(req.params.id, CentroDetail);
        res.status(201).json({ message: 'Center updated!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.fetchCentroByUser = async(req, res, next) => {
    try {
        const [Centr] = await Centro.fetchCentroByUser(req.params.id);
        console.log(Centr)
        res.status(200).json(Centr[0]);
    } catch (err) {
        if (!err.statusCode) {
            console.log(err)
            err.statusCode = 500;
        }
        next(err);
    }
};