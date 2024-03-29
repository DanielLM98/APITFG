const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth');
const errorController = require('./controllers/error');
const app = express();
const cors = require('cors');
const path = require('path');


app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);
// middlewares

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();

});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('filled'));

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/filled', express.static('filled'));
app.use('/auth', require('./routes/auth'));
app.use('/centros', require('./routes/centros'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/empresas', require('./routes/empresas'));
app.use('/formularios', require('./routes/formularios'));
app.use('/respuestas', require('./routes/respuestas'));
app.use('/alumnos', require('./routes/alumnos'));
app.use('/admincentros', require('./routes/admincentros'));
app.use('/tutoresclase', require('./routes/tutoresclase'));
app.use('/tutorestrabajo', require('./routes/tutorestrabajo'));





app.use(errorController.get404);
app.use(errorController.get500);


// server runing
app.listen(app.get('port'), () => {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});