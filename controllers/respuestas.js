const { validationResult } = require('express-validator');

const Respuesta = require('../models/respuestas');

exports.fetchAll = async(req, res, next) => {
    try {
        const [allRespuestas] = await Respuesta.fetchAll();
        res.status(200).json(allRespuestas);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchRespuesta = async(req, res, next) => {
    try {
        const [Respuestas] = await Respuesta.fetchByForm(req.params.id);
        res.status(200).json(Respuestas[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err)
        }
        next(err);
    }
}

exports.deleteRespuesta = async(req, res, next) => {
    try {
        const deleteResponse = await Respuesta.deleteRespuesta(req.params.id);
        res.status(200).json({ message: 'Deleted Respuesta' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.createRespuesta = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return

    const IDUsuario = req.body.IDUsuario;
    const IDFormulario = req.body.IDFormulario;
    const Respuestas = req.body.Respuestas;
    try {
        const result = await Respuesta.save(IDUsuario, IDFormulario, Respuestas);
        res.status(201).json({ message: 'Center registered!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }
}

exports.updateRespuesta = async(req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) return

    const ID = req.params.IDFormulario;
    const Respuestas = req.body.Respuestas;
    try {
        const RespuestaDetail = new Respuesta(ID, Respuestas);
        const result = await Respuesta.update(ID, Respuestas);
        res.status(200).json({ message: 'Respuesta updated!', Respuesta: RespuestaDetail });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }
}

exports.fetchByUser = async(req, res, next) => {
    try {
        const [ids] = await Respuesta.fetchByUser(req.params.id);
        res.status(200).json(ids.map(id => Number(id.IDFormulario)));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err)
        }
        next(err);
    }
}