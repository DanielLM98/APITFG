const db = require('util/database');

// Define el modelo de la tabla "alumnos"
class Tutoresclases {
    constructor(IDUsuario, IDCentro) {
        this.IDUsuario = IDUsuario;
        this.IDCentro = IDCentro;
    }

    static findbyUser(id){
        return db.execute('SELECT * FROM tutoresclase WHERE IDUsuario = ?', [id]);
    }
    static create(tutorclase) {
        return db.execute('INSERT INTO tutoresclase (ID,IDUsuario, IDCentro) VALUES (?,?, ?)', [null,tutorclase.IDUsuario, tutorclase.IDCentro]);
    }

    static delete(id) {
        return db.execute('DELETE FROM tutoresclase WHERE ID = ?', [id]);
    }
}