const express = require('express');
const router = express.Router();
//const passport = require('passport');
const Product = require('../models/productSchema');
const passport = require('passport');



//get all products
router.get('/products',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get one product by Id
router.get('/products/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//add one product
router.post('/products',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const createdProduct = await Product.create(req.body)
    res.json(createdProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//update a product by id
router.put('/products/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const productToUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(productToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//delete a product
router.delete('/products/:id',passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const productToDelete = await Product.findByIdAndRemove(req.params.id)
    res.json({ message: 'product deleted successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router;