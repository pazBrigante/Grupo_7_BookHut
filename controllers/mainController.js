const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const catalogo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controlador = {
    index: function (req, res){
       
        res.render("./partials/seleccionados",{"catalogo" : catalogo,"usuarioActual":req.session.usuarioLogueado});
       
    },

    lanzamientos: (req,res)=> {

        
        let resultadola =[];
        let ordenla=[];
        
        for(let i=0; i< catalogo.length; i++) {  
               
             
          
                 if (catalogo[i].categoria=="lanzamientos") {  
                    resultadola.push(catalogo[i]);
                    ordenla.push(i);
                    
                 } ;
    
            
            };
        res.render("./partials/nuevoslanzamientos",{"resultadola" : resultadola, "ordenla" :ordenla,"usuarioActual":req.session.usuarioLogueado});
    },
    masVendidos: (req,res)=> {
        
        let resultadomv =[];
        let ordenmv=[];
        
        for(let i=0; i< catalogo.length; i++) {  
               
             
          
                 if (catalogo[i].categoria=="masVendidos") {  
                    resultadomv.push(catalogo[i]);
                    ordenmv.push(i);
                    
                 } ;
    
            
            };

        res.render("./partials/masvendidos",{"resultadomv" : resultadomv, "ordenmv" :ordenmv,"usuarioActual":req.session.usuarioLogueado});
    },
    seleccionados: (req,res)=> {
        if (!req.session.usuarioLogueado){
            req.session.usuarioLogueado={usuario:"guest"};

        }

        let resultadose =[];
        let ordense=[];
        
        for(let i=0; i< catalogo.length; i++) {  
               
             
          
                 if (catalogo[i].categoria=="seleccionados") {  
                    resultadose.push(catalogo[i]);
                    ordense.push(i);
                    
                 } ;
    
            
            };
        res.render("./partials/seleccionados",{"resultadose" : resultadose, "ordense" :ordense,"usuarioActual":req.session.usuarioLogueado});
    },

    

    register: (req,res)=> {
        res.render("./partials/register");
    },
    

};

module.exports=controlador;