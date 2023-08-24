const db = require('../util/database');
module.exports = class Empresas {
    constructor(nombre, direccion, email,telefono,CentroID ) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
        this.CentroID = CentroID;

    }

    static find(email) {
        return db.execute('SELECT * FROM empresas WHERE CorreoElectronico = ?', [email]);
    }

    static fetchEmpresa(id) {
        return db.execute('SELECT * FROM empresas WHERE ID = ?', [id]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM empresas');
    }
    static save(centro) {
        console.log(centro)
        return db.execute('INSERT INTO `empresas` (`ID`, `Nombre`, `Direccion`, `CorreoElectronico`, `Telefono`, `CentroID`) VALUES (?,?,?,?,?,?)', [null, centro.nombre, centro.direccion, centro.email, centro.telefono, centro.CentroID]);
    }

    static deleteEmpresa(id) {
        return db.execute('DELETE FROM empresas WHERE ID = ?', [id]);
    }

    static updateEmpresa(id, centro) {
        return db.execute('UPDATE empresas SET Nombre = ?, Direccion = ?, CorreoElectronico = ?, Telefono = ? WHERE ID = ?', [centro.nombre, centro.direccion, centro.email, centro.telefono, id]);
    }

    static fetchAlumnosEmpresa(id) {
        return db.execute('SELECT u.* FROM usuarios u, alumnos x WHERE x.IDEmpresa = ? and x.IDUsuario = u.ID', [id]);
    }

    static fetchTutoresEmpresa(id) {
        return db.execute('SELECT u.* FROM usuarios u, tutorestrabajo x WHERE x.EmpresaID = ? and x.IDUsuario = u.ID', [id]);
    }
}