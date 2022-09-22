const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const sequelize = db.sequelize;
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const catalogo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controlador = {
    index: function (req, res) {
        res.render("./partials/seleccionados", { "catalogo": catalogo, 
        "usuarioActual": req.session.usuarioLogueado });
   },

    lanzamientos: (req, res) => {
        let resultadola = [];
        let ordenla = [];
        // for(let i=0; i< catalogo.length; i++) {  
        //          if (catalogo[i].categoria=="lanzamientos") {  
        //             resultadola.push(catalogo[i]);
        //             ordenla.push(i);
        //          } ;
        //     };
        db.Catalogo.findAll({
            where: { categoria: "lanzamientos" }
        })
            .then(resultadola => {
                res.render("./partials/nuevoslanzamientos", { "resultadola": resultadola, "usuarioActual": req.session.usuarioLogueado });
            })
            .catch(error => {
                res.redirect("views/partials/not-found.ejs")
            })
    },
    masVendidos: (req, res) => {
        let resultadomv = [];
        let ordenmv = [];
        // for(let i=0; i< catalogo.length; i++) {  
        //          if (catalogo[i].categoria=="masVendidos") {  
        //             resultadomv.push(catalogo[i]);
        //             ordenmv.push(i);
        //          } ;
        //     };

        db.Catalogo.findAll({
            where: { categoria: "masVendidos" }
        })
            .then(resultadomv => {
                res.render("./partials/masvendidos", { "resultadomv": resultadomv, "usuarioActual": req.session.usuarioLogueado });
            })
            .catch(error => {
                res.redirect("views/partials/not-found.ejs")
            })
    },
    seleccionados: (req, res) => {
        let resultadose = [];
        let ordense = [];
        // for(let i=0; i< catalogo.length; i++) {  
        //          if (catalogo[i].categoria=="seleccionados") {  
        //             resultadose.push(catalogo[i]);
        //             ordense.push(i);
        //          } ;
        //     };

        db.Catalogo.findAll({
            where: { categoria: "seleccionados" }
        })
            .then(resultadose => {
                res.render("./partials/seleccionados", { "resultadose": resultadose, "usuarioActual": req.session.usuarioLogueado });
            })
            .catch(error => {
                res.redirect("views/partials/not-found.ejs")

            })
    },
    register: (req, res) => {
        res.render("./partials/register");
    },
};

module.exports = controlador;