const AdminCentros = require('../models/admincentros');

exports.create = async(req, res, next) => {
    try {
        const admincentro = await AdminCentros.create(req.body);
        res.status(201).json("AdminCentro created");
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err)
        }
        next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        const deleteResponse = await AdminCentros.delete(req.params.id);
        res.status(200).json({ message: 'Deleted admincentro' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        const admincentro = await AdminCentros.update(req.params.id, req.body);
        res.status(200).json(admincentro[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchbyUser = async(req, res, next) => {
    try {
        const user = await AdminCentros.findbyUser(req.params.id);
        res.status(200).json(user[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchAll = async(req, res, next) => {
    try {
        const [allAdminCentros] = await AdminCentros.fetchAll();
        res.status(200).json(allAdminCentros);
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}