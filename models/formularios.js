const db = require('../util/database');
module.exports = class Formularios {
    constructor(nombre, descripcion, campos,rol ) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.campos = campos;
        this.rol = rol;
    }
    static save(formulario) {
        return db.execute('INSERT INTO `formularios` (`ID`, `Nombre`, `Descripcion`, `Campos`, `Rol`) VALUES (?,?,?,?,?)', [null, formulario.nombre, formulario.descripcion, formulario.campos, formulario.rol]);
    }

    static update(formulario) {
        return db.execute('UPDATE `formularios` SET `Nombre` = ?, `Descripcion` = ?, `Campos` = ?, `Rol` = ? WHERE `formularios`.`ID` = ?', [formulario.nombre, formulario.descripcion, formulario.campos, formulario.rol, formulario.id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM formularios');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM formularios WHERE ID = ?', [id]);
    }
}