const db = require('../util/database');
module.exports = class Empresas {
    constructor(nombre, direccion, email,telefono ) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;

    }

    static find(email) {
        return db.execute('SELECT * FROM empresas WHERE CorreoElectronico = ?', [email]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM empresas');
    }
    static save(centro) {
        console.log(centro)
        return db.execute('INSERT INTO `empresas` (`ID`, `Nombre`, `Direccion`, `CorreoElectronico`, `Telefono`) VALUES (?,?,?,?,?)', [null, centro.nombre, centro.direccion, centro.email, centro.telefono]);
    }

    static deleteEmpresa(id) {
        return db.execute('DELETE FROM empresas WHERE ID = ?', [id]);
    }
};