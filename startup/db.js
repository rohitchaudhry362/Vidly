const mongoose = require('mongoose');
const winston = require('winston')

function db(){
    mongoose.connect('mongodb://localhost/vidly')
    .then(() => winston.info("Connected to MongoDB"))
};

module.exports = db;