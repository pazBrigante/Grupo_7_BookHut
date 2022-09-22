const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

function userLoguedMiddleware(req, res, next) {
    let userFromCookie;
    let usuarioInCookie = req.cookies.usuario;

    console.log("Usuarioincookie", usuarioInCookie);
    if (usuarioInCookie) {
        db.Usuario.findAll({
            where: {
                usuario: usuarioInCookie
            }
        }).then(resultado => {

            userFromCookie = resultado[0];

        })
            .catch(error => {
                res.redirect("views/partials/not-found.ejs")
            });

        if (req.session && userFromCookie) {
            req.session.usuarioLogueado = userFromCookie;
            res.cookie("usuario", userFromCookie.usuario, { maxAge: 60 * 1000 * 10 });
        }

        if (req.session && req.session.usuarioLogueado) {
            res.locals.isLogued = true;
            res.locals.usuarioLogueado = req.session.usuarioLogueado

        } else {
            res.locals.isLogued = false
        }
    }
    next();
};

module.exports = userLoguedMiddleware;