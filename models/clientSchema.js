const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String
}, {
    versionKey: false,
    timestamps: true
});
const Client = mongoose.model('client', clientSchema);

module.exports = Client;