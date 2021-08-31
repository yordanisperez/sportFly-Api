const express = require('express');


const router = express.Router(option={});


module.exports = function(req,res,next) { // Router factory
   
    router.get('*',(req,resp)=>{
        resp.status(404).json({success:false,msg:"Servidor Fuera de servicio"});
    });
    router.post('*',(req,resp)=>{
        resp.status(404).json({success:false,msg:"Servidor Fuera de servicio"});
    });

return router;
};