const express = require('express');
const morgan = require('morgan');
const appRoutes = require('./routes/app.routes');
// const compression = require('compression');
// const helmet = require('helmet');
const app = express();


//init middelwares
app.use(morgan('dev'));
app.use('/', appRoutes);
// app.use(helmet())
// app.use(compression());

//init db
require('./dbs/init.mongodb');

//handling error

module.exports  = app