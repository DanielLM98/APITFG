const { validationResult } = require('express-validator');

const Formulario = require('../models/formularios');


exports.fetchAll = async (req, res, next) => {
    try {
        const [allForms] = await Formulario.fetchAll();
        res.status(200).json(allForms);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchForm = async (req, res, next) => {
    try {
        const [Form] = await Formulario.find(req.params.id);
        res.status(200).json(Form[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createForm = async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body)
    console.log(req.file)
    console.log(errors)
    if (!errors.isEmpty()) return
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const campos = req.body.campos;
    const rol = req.body.rol;
    const archivo = req.file;
        try {
        const FormularioDetail = new Formulario(nombre, descripcion, campos, rol, archivo);
        const result = await Formulario.save(FormularioDetail);
        res.status(201).json({ message: 'Formulario registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error.message)
        }
        next(error);
    }

};

exports.updateForm = async (req, res, next) => {
    try {
        const updateForm = await Formulario.update(req.body, req.params.id);
        res.status(200).json(updateForm);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteForm = async (req, res, next) => {
    try {
        const deleteForm = await Formulario.delete(req.params.id);
        res.status(200).json(deleteForm);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


