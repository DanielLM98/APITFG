const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');
const app = express();

app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);
// middlewares

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();

});
// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', require('./routes/auth'));

app.use(errorController.get404);
app.use(errorController.get500);

//app.use(routes);
//pp.use('/api', require('./routes/user'));

// server runing
app.listen(app.get('port'), () => {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});