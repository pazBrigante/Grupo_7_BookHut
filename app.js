const express = require('express');
const app = express();



const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');

app.set("view engine","ejs");


const mainController = require("./controllers/mainController.js");
const rutasMain = require("./routes/mainRoutes");

app.use(express.static(publicFolderPath));

app.listen(3030, () => console.log('Servidor en linea en puerto 3030'));

app.use('/',rutasMain );

app.use('/detalle/:id',rutasMain );



