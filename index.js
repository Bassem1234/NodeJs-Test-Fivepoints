const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

//database connection
require('./database/connect');

//bearer strategy
require('./passport/bearerStrategy');

const port = 3500;

//morgan config
app.use(morgan('dev'));

//config body parser
app.use(express.json());

app.get('/', (req,res) => {
    res.send("Let's start!");
});

//require routes
const clientApi = require('./routes/clientApi');
app.use('/', clientApi);

const productApi = require('./routes/productApi');
app.use('/', productApi);

const commandApi = require('./routes/commandApi');
app.use('/', commandApi);

const authApi = require('./routes/authApi');
app.use('/',authApi);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


