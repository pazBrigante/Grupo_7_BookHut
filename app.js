const express = require('express');
const app = express();
const methodOverride=require("method-override");


const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');

app.set("view engine","ejs");


const mainController = require("./controllers/mainController.js");
const rutasMain = require("./routes/mainRoutes");
const productsRouter = require('./routes/productsRoutes'); // Rutas /products

app.use(express.static(publicFolderPath));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(3030, () => console.log('Servidor en linea en puerto 3030'));

app.use('/',rutasMain );

app.use('/detalle/:id',rutasMain );

app.use('/carrito/:id',rutasMain );

app.use('/products/create', productsRouter);

app.use((req,res,next) => {
    res.status(404).render("../views/partials/not-found.ejs")

});

