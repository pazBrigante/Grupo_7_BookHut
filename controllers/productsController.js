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
	console.log(req.body);
	const nuevoProducto = req.body;
	console.log(nuevoProducto);
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
	}
};

module.exports = controller;