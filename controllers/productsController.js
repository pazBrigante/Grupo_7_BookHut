const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult} = require ("express-validator");
//Otra forma de llamar a los modelos


const fs = require('fs');
const path = require('path');

///const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const catalogo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	 
	// Create - Form to create SQL
	create: (req, res) => {
	res.render('../views/productos/product-create-form',{"usuarioActual":req.session.usuarioLogueado});
	
	},
	
	// Create -  Method to store SQL
	store: (req, res) => {
	
	
		let errors = validationResult(req);

		let authorizedMimeTypes=['image/jpg','image/jpeg','image/png','image/gif'];
		if (req.file){
		if((req.file.mimetype== 'image/jpeg' ||
		req.file.mimetype== 'image/jpg'||
		req.file.mimetype== 'image/gif'||
		req.file.mimetype== 'image/png' )){
			console.log("tipo grafico ok ", req.file.mimetype);
			}else{
				
				errors.errors.push({msg:"Solo archivos jpg jpeg png o gif"});
				//console.log("tipo grafico mal", req.file.mimetype);
				//console.log("errors", errors);
			}};
	
		console.log(errors);
			if (errors.isEmpty()){
				if (req.file) {
					campo_img =  "/images/" +req.file.filename; 
			
					} else {
						campo_img = "/images/" +req.body.img; 
			
					};
				db.Catalogo.create({
				nombre: req.body.nombre,
				precio:req.body.precio ,
				descuento:req.body.descuento ,
				autor:req.body.autor ,
				codigo:req.body.codigo ,
				categoria :req.body.categoria ,
				descripcion :req.body.descripcion ,
				img :campo_img,
			})
			.then(resultado => {
			res.redirect('/')

		})
		.catch(error=> {
					res.redirect("views/partials/not-found.ejs")

				
				
			})
		} else {
			
			console.log("Datos Inválidos");
			console.log("+++++++++++++++++++++++++++++++++++++++")
				console.log(errors.errors);
				res.render("../views/productos/product-create-form"
				,{errors:errors.errors,"usuarioActual":req.session.usuarioLogueado})
	
			}
	},

	// Update - Form to edit SQL
	edit: (req, res) => {
				
			db.Catalogo.findByPk(req.params.id)
           	 .then(resultado => {
                res.render("./productos/product-edit-form.ejs",{"productEdit":resultado,"usuarioActual":req.session.usuarioLogueado});;
            })
			.catch(error=> {
				res.redirect("views/partials/not-found.ejs")

				
				
			});
		

	},

	
	// Update - Method to update SQL
	
	update: function ( req , res ) {
			let campo_img;
			let authorizedMimeTypes=['image/jpg','image/jpeg','image/png','image/gif'];
		if (req.file){
		if((req.file.mimetype== 'image/jpeg' ||
		req.file.mimetype== 'image/jpg'||
		req.file.mimetype== 'image/gif'||
		req.file.mimetype== 'image/png' )){
			console.log("tipo grafico ok ", req.file.mimetype);
			}else{
				
				errors.errors.push({msg:"Solo archivos jpg jpeg png o gif"});
				//console.log("tipo grafico mal", req.file.mimetype);
				//console.log("errors", errors);
			}};
	
			let errors = validationResult(req);
				console.log(errors);
			if (errors.isEmpty()){
				if (req.file) {
					campo_img = "/images/" + req.file.filename; 
					
					} else {
					campo_img = req.body.img; 
		
					};
			
				db.Catalogo.update({
					nombre: req.body.nombre,
					precio:req.body.precio ,
					descuento:req.body.descuento ,
					autor:req.body.autor ,
					codigo:req.body.codigo ,
					categoria :req.body.categoria ,
					descripcion :req.body.descripcion ,
					img :campo_img
					},
				{where:{
					id: req.params.id
				}})
				.catch(error=> {
					res.redirect("views/partials/not-found.ejs")

				
				
			});
		} else {
			db.Catalogo.findByPk(req.params.id)
           	 .then(resultado => {
                res.render("./productos/product-edit-form.ejs",{"productEdit":resultado,"usuarioActual":req.session.usuarioLogueado
				,errors:errors.errors});;
            })
			.catch(error=> {
				res.redirect("views/partials/not-found.ejs")

			})
				
		}
			


	},

	// Delete - Delete one product from DB SQL
	destroy : (req, res) => {
		
		db.Catalogo.destroy(
			{where:{
				id: req.params.id
			}})
			.catch(error=> {
				res.redirect("views/partials/not-found.ejs")

				
				
			});
			res.redirect('/products/list')
		
	},

	// DETALLE - Method to detalle SQL
	detalle: (req,res)=> {
        
		db.Catalogo.findByPk(req.params.id)
           .then(resultado => {
			if (resultado){
				res.render("./productos/productDetail",{"catalogodetalle" : resultado,"id": req.params.id,"usuarioActual":req.session.usuarioLogueado});
		} else {
			res.redirect("views/partials/not-found.ejs")

		}}) 
			.catch(error=> {
				res.redirect("views/partials/not-found.ejs")

				
				
			})
    },

	// CARRITO - Method to carrito SQL
    carrito: (req,res)=> {
        db.Catalogo.findByPk(req.params.id)
           .then(resultado => {
			res.render("./productos/productCart",{"catalogodetalle" : resultado,"id": req.params.id,"usuarioActual":req.session.usuarioLogueado});
            })
			.catch(error=> {
				res.redirect("views/partials/not-found.ejs")

				
				
			});
		
    },

	// SEARCH - Method to search SQL
    search: (req,res)=> {
        
        let textoBusqueda = req.query.busqueda;
        let resultado =[];
        let orden=[];
		
		db.Catalogo.findAll({
            where: {
				[db.Sequelize.Op.or] : [
                {nombre: {[db.Sequelize.Op.like] : ("%"+textoBusqueda+"%")}},
				{descripcion: {[db.Sequelize.Op.like] : ("%"+textoBusqueda+"%")}},
				{codigo: {[db.Sequelize.Op.like] : ("%"+textoBusqueda+"%")}},
				{autor: {[db.Sequelize.Op.like] : ("%"+textoBusqueda+"%")}}
				]			
            },
			

            order: [
				 ['nombre', 'DESC']
            ]
        }


		)
		.then(resultado => {
			console.log("resultado");
			console.log(resultado);
			res.render("./productos/resultadoBusqueda",{"orden" : orden ,"textoBusqueda" : textoBusqueda ,"resultado" : resultado,"catalogo" : resultado,"id": req.params.id,"usuarioActual":req.session.usuarioLogueado});
		}) 
		.catch(error=> {
			res.redirect("views/partials/not-found.ejs")

			
			
		})
                  
    },
	// LIST - Method to list SQL
	list: (req,res)=> {
        
		db.Catalogo.findAll()
		.then(resultado => {
			
			res.render("./productos/listaProducts",{"resultado" : resultado,"usuarioActual":req.session.usuarioLogueado});
		})
		 .catch(error=> {
			res.redirect("views/partials/not-found.ejs")

			
			
		})   
        
	}
    
     
};

module.exports = controller;