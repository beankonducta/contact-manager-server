const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  editing: Boolean
});

module.exports = mongoose.model('contactModel', contactSchema);