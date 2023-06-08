const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    console.log(req.body)
   res.json(req.body)
});




module.exports = router;