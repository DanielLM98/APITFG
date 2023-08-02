const express = require('express');

const { body } = require('express-validator');

const respuestasController = require('../controllers/respuestas');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/',auth, respuestasController.fetchAll);
router.get('/get/:id',auth, respuestasController.fetchRespuesta);
router.get('/getByUser/:id',auth, respuestasController.fetchByUser);
router.post('/create', [
    auth,
    body('IDUsuario').trim().not().isEmpty(),
    body('IDFormulario').trim().not().isEmpty(),
    body('Respuestas').trim().not().isEmpty(),
], respuestasController.createRespuesta);

router.delete('/delete/:id', auth, respuestasController.deleteRespuesta);

module.exports = router;

