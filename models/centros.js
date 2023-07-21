const db = require('../util/database');
module.exports = class Centros {
    constructor(nombre, direccion, email,telefono ) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;

    }

    static find(email) {
        return db.execute('SELECT * FROM centros WHERE CorreoElectronico = ?', [email]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM centros');
    }
    static save(centro) {
        console.log(centro)
        return db.execute('INSERT INTO `centros` (`ID`, `Nombre`, `Direccion`, `CorreoElectronico`, `Telefono`) VALUES (?,?,?,?,?)', [null, centro.nombre, centro.direccion, centro.email, centro.telefono]);
    }

    static deleteCentro(id) {
        return db.execute('DELETE FROM centros WHERE ID = ?', [id]);
    }
};