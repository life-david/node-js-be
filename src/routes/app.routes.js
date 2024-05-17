const express = require('express');
const routes = express.Router();


//init routes
routes.get('/hi',(req,res,next)=>{
    return res.status(200).json({message:'Hello World'});
})

routes.get('/',(req,res,next)=>{
    return res.status(200).json({message:'Hello World'});
});



module.exports = routes