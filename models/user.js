const db = require('../util/database');
module.exports = class User {
    constructor(nombre, apellido, email, contrasena, tipoUsuario, estado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasena = contrasena;
        this.tipoUsuario = tipoUsuario;
        this.estado = estado;
    }

    static find(email) {
        return db.execute('SELECT * FROM usuarios WHERE CorreoElectronico = ?', [email]);
    }
    static save(user) {
        console.log(user)
        return db.execute('INSERT INTO `usuarios` (`ID`, `Nombre`, `Apellido`, `CorreoElectronico`, `Contrasena`, `TipoUsuario`, `Estado`) VALUES (?,?,?,?,?,?,?)', [null, user.nombre, user.apellido, user.email, user.contrasena, user.tipoUsuario, user.estado]);
    }

    static resetPassword(email, contrasena) {
        return db.execute('UPDATE usuarios SET Contrasena = ? WHERE CorreoElectronico = ?', [contrasena, email]);
    }
}