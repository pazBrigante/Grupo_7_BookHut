const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usuariosDataBase.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult} = require ("express-validator");
const session = require('express-session');
const bcrypt = require("bcryptjs");



const controller = {
	
	
	register: (req, res) => {
		console.log(res.locals.usuarioLogueado);
	res.render('../views/usuarios/register',{"usuarioActual":res.locals.usuarioLogueado });
	
	},
	
	// Create -  Method to store
	create: (req, res) => {
		
		let errors = validationResult(req);
		console.log(errors);
		if (errors.isEmpty()){
		const nuevoUsuario = req.body;
		nuevoUsuario.id=usuarios.length + 1;
		nuevoUsuario.pass=bcrypt.hashSync( nuevoUsuario.pass,10);
		delete nuevoUsuario.passC;
		if (req.file) {
				nuevoUsuario.image = req.file.filename;
		
				} else {
		
				nuevoUsuario.image="";
			}
			console.log(nuevoUsuario)
			usuarios.push(nuevoUsuario);
			fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '));
			res.render("../views/usuarios/register"
				,{"usuarioActual":req.session.usuarioLogueado})
		} else {
			
			console.log("Datos Inválidos");
				res.render("../views/usuarios/register"
				,{errors:errors.errors,"usuarioActual":req.session.usuarioLogueado})
	
			}
	},
	detalle: (req,res)=> {
        for(let i=0; i< usuarios.length; i++) { 
			let id=req.params.id;
			if (usuarios[i].id==id)
			res.render("./usuarios/userDetail",{"usuariodetalle" : usuarios[i],"id": req.params.id,"usuarioActual":req.session.usuarioLogueado});
    }

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
		console.log("Usuario Borrado");
		res.redirect("/");
		
	},

	

	list: (req,res)=> {
        
        let resultado =[];
        
		
        for(let i=0; i< usuarios.length; i++) {

			
                resultado.push(usuarios[i])
               
            
        
	}
    
        res.render("./usuarios/listaUsers",{"resultado" : resultado,"usuarioActual":req.session.usuarioLogueado});
    
    },

	login: (req,res)=> {
		//if (!req.session.usuarioLogueado.usuario){
       //     req.session.usuarioLogueado.usuario="guest";
		//	console.log(req.session.usuarioLogueado);
        //}
		
		res.render("./usuarios/login",{"usuarioActual":req.session.usuarioLogueado});
	},
	processLogin: (req,res)=> {
		let flag=0;
		let usuarioALoguearse={};
		let errors = validationResult(req);
		
		if (errors.isEmpty()){
			for(let i =0; i < usuarios.length; i++) {
				if (usuarios[i].usuario==req.body.usuario) {
					
						if (bcrypt.compareSync(req.body.pass,usuarios[i].pass)){
							usuarioALoguearse = usuarios[i];
							
							flag=1;
							

						}

				}

			}
			if (flag == 0) {
				console.log("Usuario No Existe");
				return res.render("./usuarios/login",{errors:[{msg:"Usuario No Existe"}],"usuarioActual":req.session.usuarioLogueado})
				
				} else {
					
			req.session.usuarioLogueado= usuarioALoguearse;
			if (req.body.recordame) {
				res.cookie("usuario",req.session.usuarioLogueado.usuario,{maxAge:60*1000*10});

			}
			
			console.log("USuario OK");
			res.redirect("/")
				}

		} else {
			
			console.log("Datos Inválidos");
				return res.render("./usuarios/login"
				,{errors:errors.errors,"usuarioActual":req.session.usuarioLogueado})

			
		}
	},

	logout: (req,res) => {
		res.clearCookie("usuario")
		req.session.destroy();
		return res.redirect("/");


	},

	edit: (req, res) => {
		let id_a_editar = req.params.id;
		let userEdit = usuarios.find(usuar => usuar.id == id_a_editar);
		console.log({userEdit});
		res.render("./usuarios/user-edit-form.ejs",{userEdit,"usuarioActual":req.session.usuarioLogueado});
	},
	update: (req, res) => {
		let id_a_editaru = req.params.id;
		let userEditu=req.body;
		let errors = validationResult(req);
		console.log(errors);
		
			let usertu = usuarios.find(usuar => usuar.id == id_a_editaru);
			if (errors.isEmpty()){
			if (req.file) {
				usertu.image =  req.file.filename; 

			} else {
				usertu.image = usertu.image; 

			}
		
		
			usertu.usuario = userEditu.usuario;
			usertu.email = userEditu.email;
			usertu.nacimiento = userEditu.nacimiento;
			usertu.domicilio = userEditu.domicilio;
			usertu.pass = usertu.pass;
			usertu.id = usertu.id ;
		
			usertu.group = usertu.group;
			console.log({usertu});
			fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '));
		

			res.redirect("/");
	} else {
			
		console.log("Datos Inválidos");
			return res.render("./usuarios/user-edit-form.ejs"
			,{userEdit:usertu,errors:errors.errors})

		
	}
},

};



module.exports = controller;