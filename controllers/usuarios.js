const { validationResult } = require('express-validator');

const User = require('../models/user');
const Alumno = require('../models/alumnos');
const AdminCentro = require('../models/admincentros');
const TutorCentro = require('../models/tutoresclase');
const TutorTrabajo = require('../models/tutorestrabajo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.fetchAll = async(req, res, next) => {
    try {
        const [allUsers] = await User.fetchAll();
        res.status(200).json(allUsers);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchbyCentro = async(req, res, next) => {
    try {
        const [allUsers] = await User.fetchbyCentro(req.params.id);
        res.status(200).json(allUsers);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}
exports.fetchUser = async(req, res, next) => {
    try {
        const [Usuario] = await User.fetchbyId(req.params.id);
        res.status(200).json(Usuario[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchByEmail = async(req, res, next) => {
    try {
        const [Usuario] = await User.find(req.body.email);
        res.status(200).json(Usuario[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.deleteUser = async(req, res, next) => {
    try {
        const deleteResponse = await User.deleteUser(req.params.id);
        res.status(200).json({ message: 'Usuario Eliminado' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createUser = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return
    console.log(req.body)
    const nombre = req.body.Nombre;
    const apellido = req.body.Apellido;
    const email = req.body.CorreoElectronico;
    let contrasena = "Asdf1234*"
    if (req.body.contrasena) {
        contrasena = req.body.contrasena;
    } else {
        contrasena = (nombre[0].toLowerCase() + ' ' + apellido).split(' ').map(word => word.substring(0, 3).toLowerCase()).join('') + '*';

    }
    const hashedPassword = await bcrypt.hash(contrasena, 12);
    const tipoUsuario = req.body.TipoUsuario;

    try {
        const UserDetail = new User(nombre, apellido, email, hashedPassword, tipoUsuario, 'Activo');
        const result = await User.save(UserDetail);
        if (tipoUsuario == 'Alumno') {
            const tutorClase = (await TutorCentro.findbyUser(req.body.TutorClase));
            const TutorEmpresa = (await TutorTrabajo.findbyUser(req.body.TutorEmpresa));
            const alumno = new Alumno(result[0].insertId, req.body.Centro, req.body.Empresa, TutorEmpresa.ID, tutorClase.ID);
            console.log(alumno)
            await Alumno.create(alumno);
        } else if (tipoUsuario == "AdministradorCentro") {

            const adminCentro = new AdminCentro(result[0].insertId, req.body.Centro);
            console.log(adminCentro)
            await AdminCentro.create(adminCentro);
        } else if (tipoUsuario == "TutorCentro") {

            const tutorC = new TutorCentro(result[0].insertId, req.body.Centro);
            await TutorCentro.create(tutorC);
        } else if (tipoUsuario == "TutorTrabajo") {
            const tutorT = new TutorTrabajo(result[0].insertId, req.body.Empresa);
            console.log(tutorT)
            await TutorTrabajo.create(tutorT);
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }

};

exports.updateUser = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return
    const usuario = User.find(req.params.id);
    const nombre = req.body.Nombre;
    const apellido = req.body.Apellido;
    const email = req.body.CorreoElectronico;
    let existpass = false;
    let contrasena = "Asdf1234*"
    if (req.body.contrasena) {
        existpass = true;
        contrasena = req.body.contrasena;
    }
    const hashedPassword = await bcrypt.hash(contrasena, 12);
    const tipoUsuario = req.body.TipoUsuario;
    let result;
    try {
        if (!existpass) {
            const UserDetail = new User(nombre, apellido, email, null, tipoUsuario, 'Activo');
            result = await User.updateUsernP(req.params.id, UserDetail);

        } else {
            const UserDetail = new User(nombre, apellido, email, hashedPassword, tipoUsuario, 'Activo');
            result = await User.updateUser(req.params.id, UserDetail);

        }
        if (tipoUsuario == 'Alumno') {
            const tutorClase = (await TutorCentro.findbyUser(req.body.TutorClase));
            const TutorEmpresa = (await TutorTrabajo.findbyUser(req.body.TutorEmpresa));
            const alumno = (await Alumno.findbyUser(req.params.id));
            if (alumno == undefined) {
                const alumno = new Alumno(req.params.id, req.body.Centro, req.body.Empresa, TutorEmpresa.ID, tutorClase.ID);
                await Alumno.create(alumno);
            } else {
                alumno.IDCentro = req.body.Centro;
                alumno.IDEmpresa = req.body.Empresa;
                alumno.IDTutorPracticas = TutorEmpresa.ID;
                alumno.IDTutorClase = tutorClase.ID;
                await Alumno.update(al.ID, alumno);
            }
        } else if (tipoUsuario == "AdministradorCentro") {
            await Alumno.delete(req.params.id);
            await TutorTrabajo.delete(req.params.id);
            await TutorCentro.delete(req.params.id);

            const adminCentro = (await AdminCentro.findbyUser(req.params.id));
            if (adminCentro == undefined) {
                const adminCentro = new AdminCentro(req.params.id, req.body.Centro);
                await AdminCentro.create(adminCentro);
            } else {
                adminCentro.IDCentro = req.body.Centro;
                await AdminCentro.update(admin.ID, adminCentro);
            }
        } else if (tipoUsuario == "TutorCentro") {
            await Alumno.delete(req.params.id);
            await TutorTrabajo.delete(req.params.id);
            const tutorC = (await TutorCentro.findbyUser(req.params.id));
            if (tutorC == undefined) {
                const tutorC = new TutorCentro(req.params.id, req.body.Centro);
                await TutorCentro.create(tutorC);
            } else {
                tutorC.CentroID = req.body.Centro;
                console.log(result[0].insertId)
                console.log(tutorC)
                await TutorCentro.update(tutorC.ID, tutorC);
            }
        } else if (tipoUsuario == "TutorTrabajo") {
            await Alumno.delete(req.params.id);
            await TutorCentro.delete(req.params.id);
            const tutorT = (await TutorTrabajo.findbyUser(req.params.id));
            if (tutorT == undefined) {
                const tutorT = new TutorTrabajo(req.params.id, req.body.Empresa);
                await TutorTrabajo.create(tutorT);
            } else {

                tutorT.EmpresaID = Number(req.body.Empresa);

                console.log(tutorT)
                await TutorTrabajo.update(tutorT.ID, tutorT);
            }
        }

        res.status(201).json({ message: 'Usuario actualizado!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err)
        }
        next(err);
    }
};

exports.fetchCentroByUser = async(req, res, next) => {
    try {
        const [Centro] = await User.fetchCentrobyUser(req.params.id);
        res.status(200).json(Centro[0]);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }
};

exports.fetchEmpresaByUser = async(req, res, next) => {
    try {
        const [Empresa] = await User.fetchEmpresabyUser(req.params.id);
        res.status(200).json(Empresa[0]);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }
};


//Tiene que devolver el Alumno, TutorCentro, TutorTrabajo, AdminCentro asociado al usuario
exports.fetchAllUserData = async(req, res, next) => {
    try {

        const [alumno] = await Alumno.findbyUser(req.params.id);
        const [tutorCentro] = await TutorCentro.findbyUser(req.params.id);
        const [tutorTrabajo] = await TutorTrabajo.findbyUser(req.params.id);
        const [adminCentro] = await AdminCentro.findbyUser(req.params.id);
        const [usuario] = await User.fetchbyId(req.params.id);
        let data = {
            alumno: alumno[0],
            tutorC: tutorCentro[0],
            tutorT: tutorTrabajo[0],
            adminCentro: adminCentro[0],
            user: usuario[0]

        }
        res.status(200).json(data);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            console.log(error)
        }
        next(error);
    }


};


exports.changePassword = async(req, res, next) => {
    const email = jwt.decode(req.headers['authorization'].split(' ')[1]).email;
    console.log(req.body)
    const contrasena = req.body.Nueva;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 12);
        const user = await User.find(email);


        if (user[0].length !== 1) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        } else {
            let actpass = await bcrypt.compare(req.body.Actual, user[0][0].Contrasena);
            if (actpass !== req.body.Actual) {

                const result = await User.resetPassword(email, hashedPassword);
                res.status(201).json({ message: 'Password updated!' });

            } else {
                const error = new Error('Contraseña actual incorrecta');
                error.statusCode = 401;
                throw error;
            }
        }
    } catch (error) {
        if (!error.statusCode) {
            console.log(error);
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updatePerfil = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) return
    const nombre = req.body.Nombre;
    const apellido = req.body.Apellido;
    try {
        const user = (await User.fetchbyId(req.params.id))[0];
        if (user.length !== 1) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        } else {
            user[0].Nombre = nombre;
            user[0].Apellido = apellido;
            console.log(user)
            const result = await User.updateUsernP(user[0].ID, user[0]);
            res.status(201).json({ message: 'Perfil actualizado!' });
        }
    } catch (error) {
        if (!error.statusCode) {
            console.log(error);
            error.statusCode = 500;
        }
        next(error);
    }
}