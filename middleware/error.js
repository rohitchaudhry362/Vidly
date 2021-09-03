const winston = require('winston');

function errors(err,req,res,next){

    winston.error(err.message, err);

    //response code 500 -> Internal Server Error
    res.status(500).send('Something failed.')
}

module.exports = errors;