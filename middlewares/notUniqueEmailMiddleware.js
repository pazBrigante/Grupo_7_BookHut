const db = require('../database/models');
const sequelize = db.sequelize;
const path = require('path');
const session = require('express-session');


function notUniqueEmailMiddleware(req, res, next) {
        if(req.body.email) {
    let email1= req.body.email;
    console.log("verificar email= ",email1);
       db.Usuario.findAll(
    { where: { "email": email1 } }
       )
       .then(resultado => {
        console.log("Resultado",resultado);
       if (resultado != "") {
        //throw new Error('El email ya esta registrado')
        console.log("El email ya esta registrado ");
        req.body.emailDuplicado=true;
        }
       
        next();
     })};



}
module.exports = notUniqueEmailMiddleware;