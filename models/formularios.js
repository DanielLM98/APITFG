const db = require('../util/database');
module.exports = class Formularios {
    constructor(nombre, descripcion, campos,rol, archivo) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.campos = campos;
        this.rol = rol;
        this.archivo = archivo;
    }
    static save(formulario) {

        return db.execute(
            'INSERT INTO `formularios` (`ID`, `Nombre`, `Descripcion`, `Campos`, `Rol`, `Archivo`) VALUES (?,?, ?, ?, ?, ?)',
            [null,formulario.nombre, formulario.descripcion, formulario.campos, formulario.rol, formulario.archivo]
        );    }

    static update(formulario) {
        return db.execute('UPDATE `formularios` SET `Nombre` = ?, `Descripcion` = ?, `Campos` = ?, `Rol` = ?, `Archivo`=? WHERE `formularios`.`ID` = ?', [formulario.nombre, formulario.descripcion, formulario.campos, formulario.rol,formulario.archivo, formulario.id]);
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

        
}