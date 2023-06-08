const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');

const app = express();
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'api',
    password: 'apiTfg*2023*',
    database: 'tfg_db'
}

routes = require('./routes/index');
app.set('port', process.env.PORT || 3000);
// middlewares

app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());
// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use(routes);
app.use('/api', require('./routes/user'));

// server runing
app.listen(app.get('port'), () => {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});
