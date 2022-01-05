const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Test_NodeJs').then(connect => {
    console.log('connect to database successfully')
    }).catch(err => {
        console.log('connect to database failed, error:');
        console.log(err);
    });