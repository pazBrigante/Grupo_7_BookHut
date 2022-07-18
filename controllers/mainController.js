const path = require('path');
const controlador = {
    index: function (req, res){
       
        res.render("index");
        
    },
    registro: (req,res)=> {
        res.render("register");
    },

    detalle: (req,res)=> {
        res.render("productDetail",{"catalogo" : catalogo,"id": req.params.id});
    },
};

module.exports=controlador;