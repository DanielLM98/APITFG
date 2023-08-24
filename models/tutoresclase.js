const db = require('../util/database');

// Define el modelo de la tabla "TutoresClase"
module.exports = class Tutoresclases {
    constructor(IDUsuario, CentroID) {
        this.IDUsuario = IDUsuario;
        this.CentroID = CentroID;
    }

    static findbyUser(id) {
        return db.execute('SELECT * FROM tutoresclase WHERE IDUsuario = ?', [id]);
    }
    static create(tutorclase) {
        return db.execute('INSERT INTO tutoresclase (ID,IDUsuario, CentroID) VALUES (?,?, ?)', [null, tutorclase.IDUsuario, tutorclase.CentroID]);
    }

    static delete(id) {
        return db.execute('DELETE FROM tutoresclase WHERE IDUsuario = ?', [id]);
    }

    static update(id, tutorclase) {
        return db.execute('UPDATE tutoresclase SET IDUsuario = ?, CentroID = ? WHERE ID = ?', [tutorclase.IDUsuario, tutorclase.CentroID, id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM tutoresclase');
    }
}