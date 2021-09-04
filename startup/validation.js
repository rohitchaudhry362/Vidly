const Joi = require('Joi');

function validation(){
    Joi.objectId = require('joi-objectid')(Joi);
}

module.exports = validation;