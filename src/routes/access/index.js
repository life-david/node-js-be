const express = require('express');
const route = express.Router();

const accessController = require('../../controllers/access.controller');


//signup
route.post('/shop/signup', accessController.signUp);


//export model
module.exports = route