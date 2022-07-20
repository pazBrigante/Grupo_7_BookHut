const path = require('path');

const catalogo =[{ 
    nombre: "Viajando en invierno!",
    autor:"Josep Lopez",
    precio:"U$S 65.50",
    img:"/images/id1.jpg",
    categoria:"lanzamientos",
    id:"1"
    },
    {
    nombre: "La Felicidad es un Hábito",
    autor:"Hortencia Márquez",
    precio:"U$S 5.50",
    img:"/images/id2.jpg",
    categoria:"lanzamientos",
    id:"21"
      },
    {
    nombre: "El Mundo Contra el más allá",
    autor:"Julián Palomino",
    precio:"U$S a5.50",
    img:"/images/id3.jpg",
    categoria:"masVendidos",
    id:"3"
       },
  
       {
    nombre: "Arkitektura Moderna",
    autor:"Jaime Martinez",
    precio:"U$S 25.50",
    img:"/images/id4.jpg",
    categoria:"seleccionados",
    id:"4"
         },
     {
      nombre: "Guiá de Arquitectura",
      autor:"Tomás Andrade",
      precio:"U$S 45.50",
      img:"/images/id5.jpg",
      categoria:"seleccionados",
      id:"5"
               },
               {
      nombre: "El principito",
      autor:"Antoine de Saint-exupery",
     precio:"U$S 17",
      img:"/images/id6.jpg",
      categoria:"masVendidos",
      id:"6"
                  },
                  {
         nombre: "Orgullo y prejuicio",
        autor:"Jane Austen",
        precio:"U$S 47",
        img:"/images/id7.jpg",
       categoria:"lanzamientos",
       id:"7"
                              },
      {
        nombre: "La Nueva Arquitectura",
          autor:"Milena Rodriguez",
        precio:"U$S 47",
         img:"/images/id8.jpg",
          categoria:"seleccionados",
           id:"8"
           },
           {
            nombre: "Juvenil",
              autor:"Elisa Perez",
            precio:"U$S 11",
             img:"/images/id9.jpg",
              categoria:"masVendidos",
               id:"9"
               },
               {
                nombre: "JUn regalo Para el alma",
                  autor:"Cecilia Ahern",
                precio:"U$S 31",
                 img:"/images/id10.jpg",
                  categoria:"masVendidos",
                   id:"10"
                   },           
  ] 

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