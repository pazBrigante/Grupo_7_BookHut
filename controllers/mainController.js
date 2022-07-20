const path = require('path');

const catalogo =[{ 
    nombre: "Viajando en invierno!",
    autor:"Josep Lopez",
    precio:"U$S 65.50",
    img:"/images/id1.jpg",
    categoria:"lanzamiento"
    },
    {
    nombre: "La Felicidad es un Hábito",
    autor:"Hortencia Márquez",
    precio:"U$S 5.50",
    img:"/images/id2.jpg",
    categoria:"lanzamiento"
      },
    {
    nombre: "El Mundo Contra el más allá",
    autor:"Julián Palomino",
    precio:"U$S a5.50",
    img:"/images/id3.jpg",
    categoria:"masVendidos"
       },
  
       {
    nombre: "Arkitektura Moderna",
    autor:"Jaime Martinez",
    precio:"U$S 25.50",
    img:"/images/id4.jpg",
    categoria:"seleccionados"
         },
     {
      nombre: "Guiá de Arquitectura",
      autor:"Tomás Andrade",
      precio:"U$S 45.50",
      img:"/images/id5.jpg",
      categoria:"seleccionados"
               },
               {
      nombre: "El principito",
      autor:"Antoine de Saint-exupery",
     precio:"U$S 17",
      img:"/images/id6.jpg",
      categoria:"masVendidos"
                  },
                  {
         nombre: "Orgullo y prejuicio",
        autor:"Jane Austen",
        precio:"U$S 47",
        img:"/images/id7.jpg",
       categoria:"lanzamientos"
                              },
  
  ] 

const controlador = {
    index: function (req, res){
       
        res.render("./partials/seleccionados",{"catalogo" : catalogo});
       
    },

    lanzamientos: (req,res)=> {
        res.render("./partials/nuevoslanzamientos",{"catalogo" : catalogo});
    },
    masVendidos: (req,res)=> {
        res.render("./partials/masvendidos",{"catalogo" : catalogo});
    },
    seleccionados: (req,res)=> {
        res.render("./partials/seleccionados",{"catalogo" : catalogo});
    },

    login: (req,res)=> {
        res.render("./partials/login");
    },

    register: (req,res)=> {
        res.render("./partials/register");
    },
    detalle: (req,res)=> {
        res.render("./partials/productDetail",{"catalogo" : catalogo,"id": req.params.id});
    },

    carrito: (req,res)=> {
        res.render("./partials/productCart",{"catalogo" : catalogo,"id": req.params.id});
    },

};

module.exports=controlador;