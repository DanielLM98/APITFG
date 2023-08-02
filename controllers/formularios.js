const { validationResult } = require('express-validator');

const Formulario = require('../models/formularios');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('./')[1];
        const filename = `${file.fieldname}-${Date.now()}.${extension}`;
        nombrearchivo = filename;
        cb(null, filename)
    }
})

const upload = multer({ storage: storage }).single('archivo');
let nombrearchivo = '';
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

exports.testForm = async (req, res, next) => {
    upload(req, res, function (err) {
        multer({ storage: storage }).single('archivo');
        res.json({ message: 'Formulario registered!' })
    });

};


exports.createForm = async (req, res, next) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) return
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const campos = req.body.campos;
    const rol = req.body.rol;
    let archivo;
    if (req.file == undefined) {
        
        archivo = '';
    } else {
        archivo = req.file.path;
    }

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

exports.getFormsByRol = async (req, res, next) => {
    try {
        const [Forms] = await Formulario.getFormsByRol(req.params.rol);
        res.status(200).json(Forms);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
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


