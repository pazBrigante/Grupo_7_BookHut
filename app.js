const express = require('express');
const app = express();

const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');
const productosController = require("./controllers/productosController");



app.use(express.static(publicFolderPath));

app.listen(3030, () => console.log('Servidor en linea en puerto 3030'));

app.get('/',productosController.index );

app.get("/register",productosController.registro);

