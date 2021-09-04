const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


function logging(){
    /* process.on('uncaughtException', (ex) => {
    console.log('GOT AN UNCAUGHT EXCEPTION.');
    winston.error(ex.message, ex);
    process.exit(1); // 1 -> Failure
});
 */

winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true}),
    new winston.transports.File( {filename:'uncaughtExceptions.log'})
);

process.on('unhandledRejection', (ex) => {
   throw ex;
});

/* process.on('unhandledRejection', (ex) => {
    console.log('GOT AN UNHANDLED REJECTION.');
    winston.error(ex.message, ex);
    process.exit(1); // 1 -> Failure

});
 */


winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, {
     db:'mongodb://localhost/vidly',
     level: 'error'
    });
}

module.exports = logging;