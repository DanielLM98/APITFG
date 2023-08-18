const db = require('util/database');

// Define el modelo de la tabla "alumnos"
class Tutorestrabajo {
    constructor(IDUsuario, EmpresaID) {
        this.IDUsuario = IDUsuario;
        this.EmpresaID = EmpresaID;
    }

   static create(tutortrabajo){
    return db.execute("INSERT INTO tutorestrabajo(ID,IDUsuario,EmpresaID) VALUES (?,?,?)", [null, tutortrabajo.IDUsuario, tutortrabajo.EmpresaID]);
   }

   static find(id){
    return db.execute("SELECT * FROM tutorestrabajo WHERE ID = ?", [id]);
   }

   static delete(id){
    return db.execute('DELETE FROM tutorestrabajo WHERE ID = ?', [id]);

   }

}