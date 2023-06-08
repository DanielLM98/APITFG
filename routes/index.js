const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const generateSecretKey = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    const charsLength = chars.length;
    let key = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charsLength);
        key += chars.charAt(randomIndex);
    }

    return key;
};

const SECRET_KEY = generateSecretKey(64);


router.post('/', (req, res) => {
    const { CorreoElectronico, Contrasena } = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT * FROM usuarios Where CorreoElectronico = ? AND Contrasena = ?", [CorreoElectronico, Contrasena], (err, rows) => {
            if (err) {
                console.error('Error al obtener el usuario', err);
                res.status(500).json({ message: 'Error al obtener el usuario' });
                return;
            }

            if (rows.length === 0) {
                res.status(401).json({ message: 'Credenciales inválidas' });
                return;
            }
            
            console.log(rows[0])
            usuario = {
                id: rows[0].id,
                Nombre: rows[0].Nombre,
                Apellido: rows[0].Apellido,
                CorreoElectronico: rows[0].CorreoElectronico,
                Contrasena: rows[0].Contrasena,
                Rol: rows[0].Rol
            }
           const token = jwt.sign(usuario, SECRET_KEY, { expiresIn: '1h' });
           res.json({ token });
        })
    })
});


module.exports = router;