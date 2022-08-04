const path = require('path');
const controlador = {
    index: function (req, res){
       
        res.render("index");
        
    },
    registro: (req,res)=> {
        res.render("register");
    },
};

module.exports=controlador;