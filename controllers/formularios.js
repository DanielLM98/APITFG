const Formularios = require('../models/formularios');

exports.fetchAll = async(req, res, next) => {
    try {
        const [allForms] = await Formularios.fetchAll();
        res.status(200).json(allForms);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchForm = async(req, res, next) => {
    try {
        const [Form] = await Formularios.find(req.params.id);
        res.status(200).json(Form[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}