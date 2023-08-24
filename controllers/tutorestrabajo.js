const Tutorestrabajo = require('../models/tutorestrabajo');

exports.create = async(req, res, next) => {
    try {
        const tutortrabajo = await Tutorestrabajo.create(req.body);
        res.status(201).json("TutorTrabajo created");
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        const deleteResponse = await Tutorestrabajo.delete(req.params.id);
        res.status(200).json({ message: 'Deleted tutortrabajo' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        const tutortrabajo = await Tutorestrabajo.update(req.params.id, req.body);
        res.status(200).json(tutortrabajo[0][0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchbyUser = async(req, res, next) => {
    try {
        const user = await Tutorestrabajo.findbyUser(req.params.id);
        res.status(200).json(user[0][0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.loge(err)

        }
        next(err);

    }
}

exports.fetchAll = async(req, res, next) => {
    try {
        const [allTutoresTrabajo] = await Tutorestrabajo.fetchAll();
        res.status(200).json(allTutoresTrabajo);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}