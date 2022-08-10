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
		
	res.render('../views/productos/product-create-form',{"usuarioActual":req.session.usuarioLogueado});
	
	},
	
	// Create -  Method to store
	store: (req, res) => {
	const nuevoProducto = req.body;
	nuevoProducto.img = "/images/" + req.file.filename;
	catalogo.push(nuevoProducto);
	fs.writeFileSync(productsFilePath, JSON.stringify(catalogo, null, ' '));
	res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id_a_editar = req.params.id;
		let productEdit = catalogo.find(item => item.id == id_a_editar);
		
		res.render("./productos/product-edit-form.ejs",{productEdit,"usuarioActual":req.session.usuarioLogueado});
	},

	
	// Update - Method to update
	update: (req, res) => {
		let id_a_editaru = req.params.id;
		let productEditu=req.body;
		let productu = catalogo.find(item => item.id == id_a_editaru);
		
		if (req.file) {
			productu.img = "/images/" + req.file.filename; 

		} else {
			productu.img = productu.img; 

		}

		
		productu.nombre = productEditu.nombre;
		productu.autor = productEditu.autor;
		productu.precio = productEditu.precio;
		productu.descuento = productEditu.descuento;
		productu.descripcion = productEditu.descripcion;
		productu.categoria = productEditu.categoria;
		productu.id = productEditu.id;
		console.log({productu});
		fs.writeFileSync(productsFilePath, JSON.stringify(catalogo, null, ' '));


		res.redirect("/");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let id_a_borrar = req.params.id;
		for(let i=0; i< catalogo.length; i++) {
			if (catalogo[i].id==id_a_borrar ) {
			catalogo.splice(i,1);
			
			}
		}
		fs.writeFileSync(productsFilePath, JSON.stringify(catalogo, null, ' '));
		res.redirect('/products/list')
		
	},

	detalle: (req,res)=> {
        res.render("./productos/productDetail",{"catalogodetalle" : catalogo[req.params.id],"id": req.params.id,"usuarioActual":req.session.usuarioLogueado});
    },

    carrito: (req,res)=> {
        res.render("./productos/productCart",{"catalogodetalle" : catalogo[req.params.id],"id": req.params.id,"usuarioActual":req.session.usuarioLogueado});
    },

    search: (req,res)=> {
        
        let textoBusqueda = req.query.busqueda;
        let resultado =[];
        let orden=[];
		
        for(let i=0; i< catalogo.length; i++) {

		
			if (typeof catalogo[i].nombre !="undefined") {
            if (catalogo[i].nombre.toUpperCase().includes(textoBusqueda.toUpperCase())) {
                resultado.push(catalogo[i].nombre)
                orden.push(i);
            }
        }
	}
    
        res.render("./productos/resultadoBusqueda",{"orden" : orden ,"textoBusqueda" : textoBusqueda ,"resultado" : resultado,"catalogo" : catalogo,"id": req.params.id,"usuarioActual":req.session.usuarioLogueado});
    
    },

	list: (req,res)=> {
        
        let resultado =[];
        
		
        for(let i=0; i< catalogo.length; i++) {

			
                resultado.push(catalogo[i])
               
            
        
	}
    
        res.render("./productos/listaProducts",{"resultado" : resultado,"usuarioActual":req.session.usuarioLogueado});
    
    },
};

module.exports = controller;