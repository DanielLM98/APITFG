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
    static save(user) {
        console.log(user)
        return db.execute('INSERT INTO `usuarios` (`ID`, `Nombre`, `Apellido`, `CorreoElectronico`, `Contrasena`, `TipoUsuario`, `Estado`) VALUES (?,?,?,?,?,?,?)', [null, user.Nombre, user.Apellido, user.CorreoElectronico, user.Contrasena, user.TipoUsuario, user.Estado]);
    }

    static resetPassword(email, contrasena) {
        return db.execute('UPDATE usuarios SET Contrasena = ? WHERE CorreoElectronico = ?', [contrasena, email]);
    }

    static fetchbyCentro(id) {
        return db.execute('SELECT u.ID, u.Nombre, u.Apellido, u.CorreoElectronico, u.TipoUsuario, u.Estado FROM usuarios u, centros c, alumnos a WHERE a.IDCentro = ? and u.ID = a.IDUsuario and a.IDCentro=c.ID', [id]);
    }
}