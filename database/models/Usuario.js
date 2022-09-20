module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';

   
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        nacimiento: {
            type: dataTypes.DATE
        },
        domicilio: {
            type: dataTypes.STRING
        },
        pass: {
            type: dataTypes.STRING
        },
        grupo: {
            type: dataTypes.STRING
        },
        
        image: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'usuario',
        timestamps: false
    };
    const Usuario = sequelize.define(alias, cols, config);
    
    


    

    return Usuario
}