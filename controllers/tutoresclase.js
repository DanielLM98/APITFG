const Tutoresclases = require('../models/tutoresclase');

exports.create = async(req, res, next) => {
    try {
        const tutorclase = await Tutoresclases.create(req.body);
        res.status(201).json("TutorClase created");
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        const deleteResponse = await Tutoresclases.delete(req.params.id);
        res.status(200).json({ message: 'Deleted tutorclase' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        const tutorclase = await Tutoresclases.update(req.params.id, req.body);
        res.status(200).json(tutorclase[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchbyUser = async(req, res, next) => {
    try {
        const user = await Tutoresclases.findbyUser(req.params.id);
        res.status(200).json(user[0][0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


}

exports.fetchAll = async(req, res, next) => {
    try {
        const [allTutoresClases] = await Tutoresclases.fetchAll();
        res.status(200).json(allTutoresClases);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}