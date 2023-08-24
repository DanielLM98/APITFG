const express = require('express');

//const { body } = require('express-validator');

const formulariosController = require('../controllers/formularios');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/')
    },
    filename: function(req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        const filename = `${file.originalname.split('.pdf')[0]}-${Date.now()}.${extension}`;
        cb(null, filename)
    }
})

const upload = multer({ storage: storage });

router.get('/', auth, formulariosController.fetchAll);
router.get('/get/:id', auth, formulariosController.fetchForm);

router.post('/create', auth, upload.single('Archivo'), formulariosController.createForm);
router.delete('/delete/:id', auth, formulariosController.deleteForm);

router.get('/getbyrol/:rol', auth, formulariosController.getFormsByRol);

router.get('/rellenar/:id', auth, formulariosController.getFormToFill);

router.put('/update/:id', auth, formulariosController.updateForm);


module.exports = router;