const db = require('../util/database');
module.exports = class User {
    constructor(nombre, apellido, email, contrasena, tipoUsuario, estado) {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.CorreoElectronico = email;
        this.Contrasena = contrasena;
        this.TipoUsuario = tipoUsuario;
        this.Estado = estado;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM usuarios');
    }
    static find(email) {
        return db.execute('SELECT * FROM usuarios WHERE CorreoElectronico = ?', [email]);
    }

    static fetchbyId(id) {
        return db.execute('SELECT * FROM usuarios WHERE ID = ?', [id]);
    }
    static save(user) {
        console.log(user)
        return db.execute('INSERT INTO `usuarios` (`ID`, `Nombre`, `Apellido`, `CorreoElectronico`, `Contrasena`, `TipoUsuario`, `Estado`) VALUES (?,?,?,?,?,?,?)', [null, user.Nombre, user.Apellido, user.CorreoElectronico, user.Contrasena, user.TipoUsuario, user.Estado]);
    }

    static deleteUser(id) {
        return db.execute('DELETE FROM usuarios WHERE ID = ?', [id]);
    }

    static updateUser(id, user) {
        return db.execute('UPDATE usuarios SET Nombre = ?, Apellido = ?, CorreoElectronico = ?, Contrasena = ?, TipoUsuario = ?, Estado = ? WHERE ID = ?', [user.Nombre, user.Apellido, user.CorreoElectronico, user.Contrasena, user.TipoUsuario, user.Estado, id]);
    }
    static resetPassword(email, contrasena) {
        return db.execute('UPDATE usuarios SET Contrasena = ? WHERE CorreoElectronico = ?', [contrasena, email]);
    }

    static fetchbyCentro(id) {
        return db.execute('SELECT u.ID, u.Nombre, u.Apellido, u.CorreoElectronico, u.TipoUsuario, u.Estado FROM usuarios u, centros c, alumnos a WHERE a.IDCentro = ? and u.ID = a.IDUsuario and a.IDCentro=c.ID', [id]);
    }

    static fetchbyEmpresa(id) {
        return db.execute('SELECT u.ID, u.Nombre, u.Apellido, u.CorreoElectronico, u.TipoUsuario, u.Estado FROM usuarios u, empresas e, alumnos a WHERE a.IDEmpresa = ? and u.ID = a.IDUsuario and a.IDEmpresa=e.ID', [id]);
    }

    static fetchEmpresabyUser(id) {
        return db.execute('SELECT e.* FROM usuarios u, empresas e, alumnos a WHERE u.ID = ? and u.ID = a.IDUsuario and a.IDEmpresa=e.ID', [id]);
    }

    static fetchCentrobyUser(id) {
        return db.execute('SELECT c.* FROM usuarios u, centros c, alumnos a WHERE u.ID = ? and u.ID = a.IDUsuario and a.IDCentro=c.ID', [id]);
    }

    static updateUsernP(id, user) {

        return db.execute('UPDATE usuarios SET Nombre = ?, Apellido = ?, CorreoElectronico = ?, TipoUsuario = ?, Estado = ? WHERE ID = ?', [user.Nombre, user.Apellido, user.CorreoElectronico, user.TipoUsuario, user.Estado, id]);
    }
}