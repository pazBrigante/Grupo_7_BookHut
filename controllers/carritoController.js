const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos


const fs = require('fs');
const path = require('path');
const { INTEGER } = require('sequelize');
const Usuario = require('../database/models/Usuario');

///const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const catalogo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	 
	
	
	// Create -  Method to store SQL - UPDATE CARRITO
	store: (req, res) => {
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	
	if (req.session.usuarioLogueado ) {
    
    db.Carrito.create({
		usuario_id: req.session.usuarioLogueado.id,
		catalogo_id: req.params.id
    })
    .then(resultado => {
        
		res.redirect('/')

	})
    .catch(error=> {
        
        console.log(error);
        res.redirect("views/partials/not-found.ejs")

                
    })
    };	
	
	

	
	},

  // LIST - Method to list SQL
	list: (req,res)=> {
        
		db.Carrito.findAll({
      
          
      include:[
		{association:"libros"}],
      where:{usuario_id:10}
	}
       
    )
		.then(resultado => {
			console.log("RESULTADO**********************",resultado)
			res.redirect('/')
		})
		 .catch(error=> {
      console.log(error);
			res.redirect("views/partials/not-found.ejs")

			
			
		})   
        
	}
	
	
};

module.exports = controller;