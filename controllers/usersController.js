const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usuariosDataBase.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controller = {
	
	
	register: (req, res) => {
		
	res.render('../views/usuarios/register');
	
	},
	
	// Create -  Method to store
	create: (req, res) => {
	const nuevoUsuario = req.body;
	nuevoUsuario.id=usuarios.length + 1;
	nuevoUsuario.image = req.file.filename;
	console.log(nuevoUsuario)
	usuarios.push(nuevoUsuario);
	fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '));
	res.redirect('/')
	},

	detalle: (req,res)=> {
        res.render("./usuarios/userDetail",{"usuariodetalle" : usuarios[req.params.id],"id": req.params.id});
    },
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let id_a_borrar = req.params.id;
		for(let i=0; i< usuarios.length; i++) {
			if (usuarios[i].id==id_a_borrar ) {
			usuarios.splice(i,1);
			
			}
		}
		fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '));
		res.redirect('/users/list')
		
	},

	

	list: (req,res)=> {
        
        let resultado =[];
        
		
        for(let i=0; i< usuarios.length; i++) {

			
                resultado.push(usuarios[i])
               
            
        
	}
    
        res.render("./usuarios/listaUsers",{"resultado" : resultado});
    
    },

	login: (req,res)=> {
		res.render("./usuarios/login");
	},


};



module.exports = controller;