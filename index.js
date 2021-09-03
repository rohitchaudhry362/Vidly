require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const errors = require('./middleware/error');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth');
const users = require('./routes/users');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);

/* process.on('uncaughtException', (ex) => {
    console.log('GOT AN UNCAUGHT EXCEPTION.');
    winston.error(ex.message, ex);
    process.exit(1); // 1 -> Failure
});
 */

winston.handleExceptions(
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

if(!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1); // code 0 -> success , anything other than 0 -> failure
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to mongodb.. ", err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(errors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));