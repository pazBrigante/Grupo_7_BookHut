const path = require('path');
const controlador = {
    index: function (req, res){
        console.log(__dirname);
        res.sendFile(path.resolve(__dirname, '../views/index.html'));
        
    },
    registro: (req,res)=> {
        res.sendFile(path.resolve(__dirname,'../views/register.html'));
    },
};

module.exports=controlador;