const express = require('express');

const { body } = require('express-validator');

const respuestasController = require('../controllers/respuestas');

const auth = require('../middleware/auth');

const router = express.Router();


router.get('/', auth, respuestasController.fetchAll);
router.get('/get/:id', auth, respuestasController.fetchRespuesta);
router.get('/getByUser/:id', auth, respuestasController.fetchByUser);
router.post('/create/', [
    auth,
    body('IDUsuario').trim().not().isEmpty(),
    body('IDFormulario').trim().not().isEmpty(),
    body('Respuestas').trim().not().isEmpty()
], respuestasController.createRespuesta);

router.delete('/delete/:id', auth, respuestasController.deleteRespuesta);

router.put('/update/:id', [
    auth,
    body('Respuestas').trim().not().isEmpty()
], respuestasController.updateRespuesta);

router.get('/getbyuser/:id', auth, respuestasController.fetchByUser);

module.exports = router;