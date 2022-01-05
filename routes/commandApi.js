const express = require('express');
const router = express.Router();
const Command = require('../models/commandSchema');
const passport = require('passport');
const Product = require('../models/productSchema');
//get all commands
router.get('/commands',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try {
        const command = await Command.find({});
        res.json(command);
        console.log(command);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get one command by id
router.get('/commands/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try {
        const command = await Command.findById(req.params.id);
        res.json(command);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//add one command
router.post('/commands',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
        req.body.client = req.user;
    const createdCommand = await Command.create(req.body);
    res.json(createdCommand);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//update a command by id
router.put('/commands/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const commandToUpdate = await Command.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(commandToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//delete a command
router.delete('/commands/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const commandToDelete = await Command.findByIdAndRemove(req.params.id)
    res.json({ message: 'command deleted successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
})

//affect a client to a command
router.put('/commands/affect/:idCommand/:idClient',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const commandToUpdate = await Command.findByIdAndUpdate(req.params.idCommand, {$push: {client: req.params.idClient}}, { new: true })
    res.json(commandToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});


//desaffect a client
router.put('/commands/desaffect/:idCommand/:idClient',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const commandToUpdate = await Command.findByIdAndUpdate(req.params.idCommand, {$pull: {client: req.params.idClient}}, { new: true })
    res.json(commandToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});


//add a product to a command
router.put('/commands/add/:idCommand/:idProduct',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const commandToUpdate = await Command.findByIdAndUpdate(req.params.idCommand, {$push: {productList: req.params.idProduct}}, { new: true }); 
    res.json(commandToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});


//delete a product from a command
router.put('/commands/delete/:idCommand/:idClient',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const commandToUpdate = await Command.findByIdAndUpdate(req.params.idCommand, {$pull: {productList: req.params.idClient}}, { new: true })
    res.json(commandToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});



module.exports = router;