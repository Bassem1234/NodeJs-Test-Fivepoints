const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//require model
const Client = require('../models/clientSchema');

// require bcrypt and require the salt
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const clientFound = await Client.findOne({ email: req.body.email});
        console.log(clientFound);
        if(clientFound) {
            res.send({message: 'email already exists, please choose another email'});
        }
        else {
            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            const createdClient = await Client.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPwd,
                role: req.body.role
            });
            res.json(createdClient);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
})


router.post('/login', async (req, res) => {
    try{
        const client = await Client.findOne({email: req.body.email});
        if (client) {
            const cmp = await bcrypt.compare(req.body.password, client.password);
            if(cmp) {
                // create jwt token
                const tokenData = {
                    clientId: client._id,
                    email: client.email
                };
                const token = jwt.sign(tokenData, process.env.JWT_Secret, {expiresIn: process.env.JWT_EXPIRE});
                res.send({message: 'Auth Successful', token: token});
            } 
            else {
                res.send({message: "Wrong email or password"});
            }
        }
        else {
            res.send({message: "Wrong email or password"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error occured");
    }
});

module.exports = router;