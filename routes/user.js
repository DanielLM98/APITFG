const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM usuarios', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)


        })
    })
});

router.post('/', (req, res) => {
    console.log(req.body)
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO usuarios set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)

        })
    })
});

router.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM usuarios where id= ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)

        })
    })
});


module.exports = router;