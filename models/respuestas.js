const db = require('../util/database');
module.exports = class Respuestas {
    constructor(IDUsuario, IDFormulario, Respuestas) {
        this.IDUsuario = IDUsuario;
        this.IDFormulario = IDFormulario;
        this.Respuestas = Respuestas;

    }

    static save(IDUsuario, IDFormulario, respuesta) {
        return db.execute(
            'INSERT INTO `respuestas` (`IDUsuario`, `IDFormulario`, `Respuestas`) VALUES (?,?, ?)',
            [IDUsuario, IDFormulario, respuesta]
        );
    }

    static update(ID, respuesta) {
        return db.execute('UPDATE `respuestas` SET `Respuestas` = ? WHERE `respuestas`.`ID` = ?', [respuesta, ID]);
    }

    static delete(ID) {
        return db.execute('DELETE FROM `respuestas` WHERE `respuestas`.`ID` = ?', [ID]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM respuestas');
    }

    static fetchOne(ID) {
        return db.execute('SELECT * FROM respuestas WHERE ID = ?', [ID]);
    }

    static fetchByUser(IDUsuario) {
        return db.execute('SELECT * FROM respuestas WHERE IDUsuario = ?', [IDUsuario]);
    }



}
