const db = require('../util/database');
module.exports = class Centros {
    constructor(nombre, direccion, email, telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;

    }

    static find(email) {
        return db.execute('SELECT * FROM centros WHERE CorreoElectronico = ?', [email]);
    }

    static fecthCentro(id) {
        return db.execute('SELECT * FROM centros WHERE ID = ?', [id]);
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

    static updateCentro(id, centro) {
        return db.execute('UPDATE centros SET Nombre = ?, Direccion = ?, CorreoElectronico = ?, Telefono = ? WHERE ID = ?', [centro.nombre, centro.direccion, centro.email, centro.telefono, id]);

    }

    static fetchAlumnosCentro(id) {
        return db.execute('SELECT u.* FROM usuarios u, centros c, alumnos x WHERE x.IDCentro = ? and x.IDUsuario = u.ID and c.ID = x.IDCentro', [id]);
    }
};