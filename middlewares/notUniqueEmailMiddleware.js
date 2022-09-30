const db = require('../database/models');
const sequelize = db.sequelize;
const path = require('path');
const session = require('express-session');

function notUniqueEmailMiddleware(req, res, next) {
    if (req.body.email) {
        let email1 = req.body.email;
        db.Usuario.findAll(
            { where: { "email": email1 } }
        )
            .then(resultado => {
                req.body.emailDuplicado = resultado.length;
                if (req.body.emailDuplicado == 1) {
                    req.body.emailDuplicadoId = resultado[0].id;
                }
                //console.log("El email ya esta registrado ", req.body.emailDuplicado,req.body.emailDuplicadoId);
                next();
            })
    };

}
module.exports = notUniqueEmailMiddleware;