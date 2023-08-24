const db = require('../util/database');
module.exports = class Formularios {
    constructor(nombre, descripcion, campos, rol, archivo) {
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Campos = campos;
        this.Rol = rol;
        this.Archivo = archivo;
    }
    static save(formulario) {

        return db.execute(
            'INSERT INTO `formularios` (`ID`, `Nombre`, `Descripcion`, `Campos`, `Rol`, `Archivo`) VALUES (?,?, ?, ?, ?, ?)', [null, formulario.Nombre, formulario.Descripcion, formulario.Campos, formulario.Rol, formulario.Archivo]
        );
    }

    static update(formulario, id) {
        return db.execute('UPDATE `formularios` SET `Nombre` = ?, `Descripcion` = ?, `Campos` = ?, `Rol` = ? WHERE `formularios`.`ID` = ?', [formulario.Nombre, formulario.Descripcion, formulario.Campos, formulario.Rol, id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM `formularios` WHERE `formularios`.`ID` = ?', [id]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM formularios');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM formularios WHERE ID = ?', [id]);
    }


    static getFormsByRol(rol) {
        return db.execute('SELECT * FROM formularios WHERE Rol = ?', [rol]);
    }

    static getRespuestas(id) {
        return db.execute('SELECT * FROM respuestas WHERE IDFormulario = ?', [id]);
    }

}