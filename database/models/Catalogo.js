module.exports = (sequelize, dataTypes) => {
    let alias = 'Catalogo';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.FLOAT
        },
        descuento: {
            type: dataTypes.FLOAT
        },
        autor: {
            type: dataTypes.STRING
        },
        codigo: {
            type: dataTypes.STRING
        },
        categoria: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        img: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'catalogo',
        timestamps: false
    };
    const Catalogo = sequelize.define(alias, cols, config)

    Catalogo.associate = function(models) {
        Catalogo.hasMany(models.Carrito,{
            as:"carritos",
            foreignKey:"catalogo_id",
            
    })}
    

    


    return Catalogo
}