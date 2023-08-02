const express = require('express');

//const { body } = require('express-validator');

const formulariosController = require('../controllers/formularios');

const auth = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req)
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        const filename = `${file.originalname}-${Date.now()}.${extension}`;
        console.log(filename)
        cb(null, filename)
    }
})

const upload = multer({ storage: storage });

router.get('/',auth, formulariosController.fetchAll);
router.get('/get/:id',auth, formulariosController.fetchForm);

router.post('/create', auth, upload.single('archivo'),formulariosController.createForm);
router.delete('/delete/:id', auth, formulariosController.deleteForm);

router.get('/getbyrol/:rol',auth, formulariosController.getFormsByRol);

module.exports = router;
