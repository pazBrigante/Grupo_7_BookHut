const methodOverride = require('method-override');

const db = require('../../database/models');
const opp = db.Sequelize.Op;

module.exports = {

    list: (req, res) => {
        db.Catalogo
            .findAll()
            .then(resultado => {

                let listado = [];
                resultado.forEach(element => {
                    listado.push({
                        "id": element.id,
                        "name": element.nombre,
                        "descripcion": element.descripcion,
                        "categoria": element.categoria,
                        "detail": "api/products/" + element.id
                    })
                })
                return res.status(200).json({
                    status: 200,
                    count: resultado.length,
                    url: 'api/products',
                    data: listado
                })
            })
    },

    detail: (req, res) => {
        db.Catalogo
            .findByPk(req.params.id)
            .then(resultado => {
                return res.status(200).json({
                    status: 200,
                    url: 'api/products/id',
                    data: {
                        "id": resultado.id,
                        "name": resultado.nombre,
                        "autor": resultado.autor,
                        "codigo": resultado.codigo,
                        "categoria": resultado.categoria,
                        "descripcion": resultado.descripcion,
                        "precio": resultado.precio,
                        "descuento": resultado.descuento,
                        "image": "public" + resultado.img
                    }
                })
            })
    },

    listUsers: (req, res) => {
        db.Usuario
            .findAll()
            .then(resultado => {

                let listado = [];
                resultado.forEach(element => {
                    listado.push({
                        "id": element.id,
                        "name": element.usuario,
                        "email": element.email,
                        "detail": "api/users/" + element.id
                    })
                });
                return res.status(200).json({
                    status: 200,
                    count: resultado.length,
                    url: 'api/users',
                    data: listado
                }
                )
            })
    },

    detailUsers: (req, res) => {
        db.Usuario
            .findByPk(req.params.id)
            .then(resultado => {

                return res.status(200).json({
                    status: 200,
                    url: 'api/users/id',
                    data: {
                        "id": resultado.id,
                        "name": resultado.usuario,
                        "email": resultado.email,
                        "nacimiento": resultado.nacimiento,
                        "image": "public/images/" + resultado.image
                    }
                })
            })
    }

}


