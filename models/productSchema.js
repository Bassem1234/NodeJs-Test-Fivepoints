const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Number
}, {
    versionKey: false,
    timestamps: true
});
const Product = mongoose.model('product', productSchema);
module.exports = Product;