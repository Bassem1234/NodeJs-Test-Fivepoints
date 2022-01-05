const express = require('express');
const router = express.Router();
//const passport = require('passport');
const Client = require('../models/clientSchema');
//require model
const passport = require('passport');


//get all clients
router.get('/clients', passport.authenticate('bearer', {session: false}), async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get one client by Id
router.get('/clients/:id', passport.authenticate('bearer', {session: false}), async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//add one client
router.post('/clients',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const createdClient = await Client.create(req.body)
    res.json(createdClient);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//update a client by id
router.put('/clients/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const clientToUpdate = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(clientToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//delete a client
router.delete('/clients/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const clientToDelete = await Client.findByIdAndRemove(req.params.id)
    res.json({ message: 'client deleted successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router;