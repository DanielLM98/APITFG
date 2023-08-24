const db = require('../util/database');

// Define el modelo de la tabla "alumnos"
module.exports = class Alumnos {
    constructor(IDUsuario, IDCentro, IDEmpresa, IDTutorPracticas, IDTutorClase) {
        this.IDUsuario = IDUsuario;
        this.IDCentro = IDCentro;
        this.IDEmpresa = IDEmpresa;
        this.IDTutorPracticas = IDTutorPracticas;
        this.IDTutorClase = IDTutorClase;
    }

    static findbyUser(id) {
        return db.execute('SELECT * FROM alumnos WHERE IDUsuario = ?', [id]);
    }
    static create(alumno) {
        return db.execute('INSERT INTO alumnos (ID,IDUsuario, IDCentro, IDEmpresa, IDTutorPracticas, IDTutorClase) VALUES (?,?, ?, ?, ?, ?)', [null, alumno.IDUsuario, alumno.IDCentro, alumno.IDEmpresa, alumno.IDTutorPracticas, alumno.IDTutorClase]);
    }

    static delete(id) {
        return db.execute('DELETE FROM alumnos WHERE IDUsuario = ?', [id]);
    }

    static update(id, alumno) {
        return db.execute('UPDATE alumnos SET IDUsuario = ?, IDCentro = ?, IDEmpresa = ?, IDTutorPracticas = ?, IDTutorClase = ? WHERE ID = ?', [alumno.IDUsuario, alumno.IDCentro, alumno.IDEmpresa, alumno.IDTutorPracticas, alumno.IDTutorClase, id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM alumnos');
    }

    static fetchbyId(id) {
        return db.execute('SELECT * FROM alumnos WHERE ID = ?', [id]);
    }

    static fetchbyCentro(id) {
        return db.execute('SELECT * FROM alumnos WHERE IDCentro = ?', [id]);
    }

    static fetchbyEmpresa(id) {
        return db.execute('SELECT * FROM alumnos WHERE IDEmpresa = ?', [id]);
    }

    static fetchbyTutorPracticas(id) {
        return db.execute('SELECT * FROM alumnos WHERE IDTutorPracticas = ?', [id]);
    }

    static fetchbyTutorClase(id) {
        return db.execute('SELECT * FROM alumnos WHERE IDTutorClase = ?', [id]);
    }


}