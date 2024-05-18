const express = require('express');
const routeAccess = require('./access');
const routes = express.Router();


//init routes

routes.use('/api/v1', routeAccess);

routes.get('/',(req, res, next)=>{
    return res.status(200).json({message:'Hello World'});
});


//export model
module.exports = routes