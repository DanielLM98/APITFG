const Centro = require('../models/centros');
const Usuario = require('../models/user');
const Alumno = require('../models/alumnos')
const Empresa = require('../models/empresas');
const TutorPractica = require('../models/tutorestrabajo');
const TutorClase = require('../models/tutoresclase');
const { validationResult } = require('express-validator');


exports.createAlumno = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return
    let idUsuario = req.body.IDUsuario;
    if (!Usuario.find(idUsuario)) {
        const error = new Error('No existe el usuario');
        error.statusCode = 404;
        throw error;
    }
    let idCentro = req.body.IDCentro;
    if (!Centro.find(idCentro)) {
        const error = new Error('No existe el centro');
        error.statusCode = 404;
        throw error;
    }

    let idEmpresa = null;
    let idTutorPracticas = null;
    let idTutorClase = null;

    if (req.body.IDEmpresa) {
        console.log(req.body.IDEmpresa)
        idEmpresa = req.body.IDEmpresa;
        if (!Empresa.find(idEmpresa)) {
            const error = new Error('No existe la empresa');
            error.statusCode = 404;
            throw error;
        }
    }
    if (req.body.IDTutorPracticas) {
        idTutorPracticas = req.body.IDTutorPracticas;
        if (!Usuario.fetchbyId(idTutorPracticas)) {
            if (!TutorPractica.findbyUser((Usuario.fetchbyId(idTutorPracticas)).ID)) {
                const error = new Error('No existe el tutor de practicas');
                error.statusCode = 404;
                throw error;
            }
            const error = new Error('No existe el usuario');
            error.statusCode = 404;
            throw error;
        }
    }
    if (req.body.IDTutorClase) {
        idTutorClase = req.body.IDTutorClase;
        if (!Usuario.fetchbyId(idTutorClase)) {
            if (!TutorClase.findbyUser((Usuario.fetchbyId(idTutorClase)).ID)) {
                const error = new Error('No existe el tutor de clase');
                error.statusCode = 404;
                throw error;
            }
            const error = new Error('No existe el usuario');
            error.statusCode = 404;
            throw error;
        }
    }
    try {
        const alumno = new Alumno(idUsuario, idCentro, idEmpresa, idTutorPracticas, idTutorPracticas);
        const createResponse = await Alumno.create(alumno);
        res.status(201).json("Alumno created");
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(error)
        }
        next(err);
    }

}

exports.fetchAll = async(req, res, next) => {
    try {
        const [allAlumnos] = await Alumno.fetchAll();
        res.status(200).json(allAlumnos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchAlumno = async(req, res, next) => {
    try {
        const [alumno] = await Alumno.findbyUser(req.params.id);
        res.status(200).json(alumno[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteAlumno = async(req, res, next) => {
    try {
        const deleteResponse = await Alumno.delete(req.params.id);
        res.status(200).json({ message: 'Deleted alumno' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchbyCentro = async(req, res, next) => {
    try {
        const [alumnos] = await Alumno.fetchbyCentro(req.params.id);
        res.status(200).json(alumnos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchbyEmpresa = async(req, res, next) => {
    try {
        const [alumnos] = await Alumno.fetchbyEmpresa(req.params.id);
        res.status(200).json(alumnos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchbyTutorPracticas = async(req, res, next) => {
    try {
        const [alumnos] = await Alumno.fetchbyTutorPracticas(req.params.id);
        res.status(200).json(alumnos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchbyTutorClase = async(req, res, next) => {
    try {
        const [alumnos] = await Alumno.fetchbyTutorClase(req.params.id);
        res.status(200).json(alumnos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateAlumno = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return
        const id = req.params.id;
        const idUsuario = req.body.IDUsuario;
        if (!Usuario.find(idUsuario)) {
            const error = new Error('No existe el usuario');
            error.statusCode = 404;
            throw error;
        }
        const idCentro = req.body.IDCentro;
        if (!Centro.find(idCentro)) {
            const error = new Error('No existe el centro');
            error.statusCode = 404;
            throw error;
        }

        const idEmpresa = null;
        const idTutorPracticas = null;
        const idTutorClase = null;

        if (req.body.IDEmpresa) {
            idEmpresa = req.body.IDEmpresa;
            if (!Empresa.find(idEmpresa)) {
                const error = new Error('No existe la empresa');
                error.statusCode = 404;
                throw error;
            }
        }
        if (req.body.IDTutorPracticas) {
            idTutorPracticas = req.body.IDTutorPracticas;
            if (!Usuario.fetchbyId(idTutorPracticas)) {
                if (!TutorPractica.findbyUser((Usuario.fetchbyId(idTutorPracticas)).ID)) {
                    const error = new Error('No existe el tutor de practicas');
                    error.statusCode = 404;
                    throw error;
                }
                const error = new Error('No existe el usuario');
                error.statusCode = 404;
                throw error;
            }
        }
        if (req.body.IDTutorClase) {
            idTutorClase = req.body.IDTutorClase;
            if (!Usuario.fetchbyId(idTutorClase)) {
                if (!TutorClase.findbyUser((Usuario.fetchbyId(idTutorClase)).ID)) {
                    const error = new Error('No existe el tutor de clase');
                    error.statusCode = 404;
                    throw error;
                }
                const error = new Error('No existe el usuario');
                error.statusCode = 404;
                throw error;
            }
        }
        const alumno = new Alumno(idUsuario, idCentro, idEmpresa, idTutorPracticas, idTutorPracticas);
        const updateResponse = await Alumno.update(id, alumno);
        res.status(200).json({ message: 'Alumno actualizado', alumno: alumno });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}