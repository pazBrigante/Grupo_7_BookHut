const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const catalogo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	 //Root - Show all products
	//index: (req, res) => {
	//res.render('products', {products});
	//},

	// Detail - Detail from one product
	//detail: (req, res) => {
		// Do the magic
	//},

	// Create - Form to create
	create: (req, res) => {
		
	res.render('../views/partials/product-create-form');
	
	},
	
	// Create -  Method to store
	store: (req, res) => {
	const nuevoProducto = req.body;
	nuevoProducto.id = catalogo.length +1;
	catalogo.push(nuevoProducto);
	fs.writeFileSync(productsFilePath, JSON.stringify(catalogo, null, ' '));
	res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let id_a_borrar = req.params.id;
		catalogo.splice(id_a_borrar,1);
		fs.writeFileSync(productsFilePath, JSON.stringify(catalogo, null, ' '));
		res.redirect('/')
		
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
		console.log(textoBusqueda)
        for(let i=0; i< catalogo.length; i++) {

			console.log(textoBusqueda)
			if (typeof catalogo[i].nombre !="undefined") {
            if (catalogo[i].nombre.toUpperCase().includes(textoBusqueda.toUpperCase())) {
                resultado.push(catalogo[i].nombre)
                orden.push(i);
            }
        }
	}
    
        res.render("./partials/resultadoBusqueda",{"orden" : orden ,"textoBusqueda" : textoBusqueda ,"resultado" : resultado,"catalogo" : catalogo,"id": req.params.id});
    
    },
};

module.exports = controller;