const db = require('../database/models');
const sequelize = db.sequelize;
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usuariosDataBase.json');
//const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require("express-validator");
const session = require('express-session');
const bcrypt = require("bcryptjs");

const controller = {

	// Registro -  Method to mostrar registro SQL
	register: (req, res) => {
		console.log("USuario Loguado", res.locals.usuarioLogueado);
		res.render('../views/usuarios/register', { "usuarioActual": res.locals.usuarioLogueado });
	},

	// Create -  Method to Create SQL
	create: (req, res) => {
		console.log("email Duplicado ", req.body.emailDuplicado)
		let errors = validationResult(req);
		let authorizedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
		if (req.body.emailDuplicado != 0) {
			//req.body.emailDuplicado=false
			errors.errors.push({ msg: "Email ya existe" });
		}

		if (req.file) {
			if ((req.file.mimetype == 'image/jpeg' ||
				req.file.mimetype == 'image/jpg' ||
				req.file.mimetype == 'image/gif' ||
				req.file.mimetype == 'image/png')) {
				console.log("tipo grafico ok ", req.file.mimetype);
			} else {
				errors.errors.push({ msg: "Solo archivos jpg jpeg png o gif" });
				//console.log("tipo grafico mal", req.file.mimetype);
				//console.log("errors", errors);
			}
		};

		if (errors.isEmpty()) {
			const nuevoUsuario = req.body;
			nuevoUsuario.pass = bcrypt.hashSync(nuevoUsuario.pass, 10);
			delete nuevoUsuario.passC;
			if (req.file) {

				nuevoUsuario.image = req.file.filename;

			} else {

				nuevoUsuario.image = "Alan_Turing.jpg";
			}
			console.log(nuevoUsuario)

			db.Usuario.create({
				usuario: nuevoUsuario.usuario,
				email: nuevoUsuario.email,
				nacimiento: nuevoUsuario.nacimiento,
				domicilio: nuevoUsuario.domicilio,
				pass: nuevoUsuario.pass,
				grupo: nuevoUsuario.group,
				image: nuevoUsuario.image,
			})
				.then(resultado => {
					res.redirect("/");
				})
				.catch(error => {

					res.redirect("views/partials/not-found.ejs", { "error": error })
				})
		} else {
			console.log("Datos Inválidos");
			console.log("errors.errors");
			res.render("../views/usuarios/register"
				, { errors: errors.errors, "usuarioActual": req.session.usuarioLogueado })
		}
	},
	// Detalle - SQL
	detalle: (req, res) => {

		db.Usuario.findByPk(req.params.id)
			.then(resultado => {
				res.render("./usuarios/userDetail", { "usuariodetalle": resultado, "id": req.params.id, "usuarioActual": req.session.usuarioLogueado });
			})
			.catch(error => {
				res.redirect("views/partials/not-found.ejs")
			});

	},
	// Delete - Delete one user from DB - SQL
	destroy: (req, res) => {
		// Do the magic
		let id_a_borrar = req.params.id;
		db.Usuario.destroy({
			where: { id: id_a_borrar }
		})
			.then(resultado => {
				res.redirect("/");
			})
			.catch(error => {
				res.redirect("views/partials/not-found.ejs")
			});
	},
	// LIST- SQL

	list: (req, res) => {
		db.Usuario.findAll()
			.then(resultado => {
				res.render("./usuarios/listaUsers", { "resultado": resultado, "usuarioActual": req.session.usuarioLogueado });
			})
			.catch(error => {
				res.redirect("views/partials/not-found.ejs")
			})
	},
	// - Login  SQL
	login: (req, res) => {
		res.render("./usuarios/login", { "usuarioActual": req.session.usuarioLogueado });
	},

	// Process Login - SQL
	processLogin: (req, res) => {
		let flag = 0;
		let usuarioALoguearse = {};
		let errors = validationResult(req);
		db.Usuario.findAll({
			where: {
				usuario: req.body.usuario
			}
		}
		)
			.then(resultado => {
				let usuario_encontrado = resultado;
				let pass_ok = bcrypt.compareSync("1234", usuario_encontrado[0].pass);
				console.log("passok", pass_ok);
				if (pass_ok) {
					usuarioALoguearse = usuario_encontrado[0];
					//console.log("Usuario a  loguearse  ", usuarioALoguearse);
					flag = 1;
				}
				if (flag == 0) {
					console.log("Usuario No Existe");
					return res.render("./usuarios/login", { errors: [{ msg: "Usuario No Existe" }], "usuarioActual": req.session.usuarioLogueado })

				} else {

					req.session.usuarioLogueado = usuarioALoguearse;

					if (req.body.recordame) {
						res.cookie("usuario", req.session.usuarioLogueado.usuario, { maxAge: 60 * 1000 * 20 });
					}
					console.log("USuario OK");
					res.redirect("/")
				}
			})
			.catch(error => {
				res.redirect("views/partials/not-found.ejs")

			})

	},
	logout: (req, res) => {
		res.clearCookie("usuario")
		req.session.destroy();

		return res.redirect("/");


	},

	edit: (req, res) => {

		let id_a_editar = req.params.id;

		db.Usuario.findByPk(id_a_editar)
			.then(resultado => {
				res.render("./usuarios/user-edit-form.ejs", {
					"userEdit": resultado,
					"usuarioActual": req.session.usuarioLogueado
				});
			})
			.catch(error => {
				res.redirect("views/partials/not-found.ejs")
			});
	},
	update: (req, res) => {
		let errors = validationResult(req);
		console.log("edit user:", req.body.emailDuplicado, req.body.emailDuplicadoId, req.params.id)
		if (req.body.emailDuplicado > 0) {
			if ((req.body.emailDuplicado == 1 && req.body.emailDuplicadoId != req.params.id) || req.body.emailDuplicado > 1)
				errors.errors.push({ msg: "Email ya existe" });
		}
		let campo_img;
		let authorizedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
		if (req.file) {
			if ((req.file.mimetype == 'image/jpeg' ||
				req.file.mimetype == 'image/jpg' ||
				req.file.mimetype == 'image/gif' ||
				req.file.mimetype == 'image/png')) {
				console.log("tipo grafico ok ", req.file.mimetype);
			} else {
				errors.errors.push({ msg: "Solo archivos jpg jpeg png o gif" });
				//console.log("tipo grafico mal", req.file.mimetype);
				//console.log("errors", errors);
			}
		};
		//let usertu = usuarios.find(usuar => usuar.id == id_a_editaru);
		if (errors.isEmpty()) {
			if (req.file) {
				campo_img = req.file.filename;

			} else {
				campo_img = req.body.img;
			};
			db.Usuario.update({
				usuario: req.body.usuario,
				email: req.body.email,
				nacimiento: req.body.nacimiento,
				domicilio: req.body.domicilio,
				pass: req.body.pass,
				grupo: req.body.grupo,
				image: campo_img
			},
				{
					where: {
						id: req.params.id
					}
				})
				.catch(error => {
					res.redirect("views/partials/not-found.ejs")
				});
			res.redirect("/");
		} else {
			let id_a_editar = req.params.id;
			console.log("Datos Inválidos");
			db.Usuario.findByPk(id_a_editar)
				.then(resultado => {
					res.render("./usuarios/user-edit-form.ejs",
						{
							errors: errors.errors, "userEdit": resultado,
							"usuarioActual": req.session.usuarioLogueado
						});
				})
		}
	},
};



module.exports = controller;