const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    isGold: {
        type:Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
        },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    } 
});

const Customer = mongoose.model('Customer',customerSchema)

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(10).max(13).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }

  module.exports.Customer = Customer;
  module.exports.validate = validateCustomer;
