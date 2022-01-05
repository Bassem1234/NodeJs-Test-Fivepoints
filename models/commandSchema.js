const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commandSchema = new Schema({
  name: String,
  totalPrice: Number,
  productList: [{type: Schema.Types.ObjectId, ref: 'product'}],
  client: [{type: Schema.Types.ObjectId, ref: 'client'}]
}, {
    versionKey: false,
    timestamps: true
});
const Command = mongoose.model('command', commandSchema);


module.exports = Command;