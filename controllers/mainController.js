const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const catalogo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controlador = {
    index: function (req, res){
       
        res.render("./partials/seleccionados",{"catalogo" : catalogo});
       
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
        res.render("./partials/nuevoslanzamientos",{"resultadola" : resultadola, "ordenla" :ordenla});
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

        res.render("./partials/masvendidos",{"resultadomv" : resultadomv, "ordenmv" :ordenmv});
    },
    seleccionados: (req,res)=> {


        let resultadose =[];
        let ordense=[];
        
        for(let i=0; i< catalogo.length; i++) {  
               
             
          
                 if (catalogo[i].categoria=="seleccionados") {  
                    resultadose.push(catalogo[i]);
                    ordense.push(i);
                    
                 } ;
    
            
            };
        res.render("./partials/seleccionados",{"resultadose" : resultadose, "ordense" :ordense});
    },

    login: (req,res)=> {
        res.render("./partials/login");
    },

    register: (req,res)=> {
        res.render("./partials/register");
    },
    detalle: (req,res)=> {
        res.render("./partials/productDetail",{"catalogodetalle" : catalogo[req.params.id],"id": req.params.id});
    },

    carrito: (req,res)=> {
        res.render("./partials/productCart",{"catalogodetalle" : catalogo[req.params.id],"id": req.params.id});
    },

    search: (req,res)=> {
        
        let textoBusqueda = req.query.busqueda;
        let resultado =[];
        let orden=[];

        for(let i=0; i< catalogo.length; i++) {


            if (catalogo[i].nombre.toUpperCase().includes(textoBusqueda.toUpperCase())) {
                resultado.push(catalogo[i].nombre)
                orden.push(i);
            }
        }
    
        res.render("./partials/resultadoBusqueda",{"orden" : orden ,"textoBusqueda" : textoBusqueda ,"resultado" : resultado,"catalogo" : catalogo,"id": req.params.id});
    
    },

};

module.exports=controlador;