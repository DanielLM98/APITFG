const db = require('../util/database');

module.exports = class AdminCentros {
    constructor(IDUsuario, IDCentro) {
        this.IDUsuario = IDUsuario;
        this.IDCentro = IDCentro;
    }

    static findbyUser(id) {
        return db.execute('SELECT * FROM admincentro WHERE IDUsuario = ?', [id]);
    }
    static create(admincentro) {
        return db.execute('INSERT INTO admincentro (ID,IDUsuario, IDCentro) VALUES (?,?, ?)', [null, admincentro.IDUsuario, admincentro.IDCentro]);
    }

    static delete(id) {
        return db.execute('DELETE FROM admincentro WHERE IDUsuario = ?', [id]);
    }

    static update(id, admincentro) {
        return db.execute('UPDATE admincentro SET IDUsuario = ?, IDCentro = ? WHERE ID = ?', [admincentro.IDUsuario, admincentro.IDCentro, id]);
    }
}