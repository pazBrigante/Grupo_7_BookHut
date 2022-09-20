module.exports = (sequelize, dataTypes) => {
    let alias = 'Carrito';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: dataTypes.INTEGER
        },
        catalogo_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'carrito',
        timestamps: false
    };
    const Carrito = sequelize.define(alias, cols, config)

    Carrito.associate = function(models) {
        Carrito.belongsTo(models.Catalogo,{
            as:"libros",
            foreignKey:"id",
            
    })}

    return Carrito
}