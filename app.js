const express = require('express');
const app = express();


const methodOverride = require("method-override");
const session = require("express-session");
const { check } = require("express-validator");
const cookies = require("cookie-parser");

const userLoguedMiddleware = require("./middlewares/userLoguedMiddleware.js");

//app.use(express.json())
//const bodyParser = require('body-parser');
//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
//app.use(express.urlencoded({extended: true})); 
//app.use(express.json())


const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');

app.set("view engine", "ejs");


//Require de rutas
const rutasMain = require("./routes/mainRoutes");// Main  /products
const productsRouter = require('./routes/productsRoutes'); // Rutas /products
const usersRouter = require('./routes/usersRoutes'); // Rutas /users
const carritoRouter = require('./routes/carritoRoutes'); // Rutas /carrito

//Require rutas de las APIs
const apiRouter = require('./routes/api/apiRouter');
//const notUniqueEmailMiddleware = require('./middlewares/notUniqueEmailMiddleware.js');

app.use(express.static(publicFolderPath));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    resave: false,//added 
    saveUninitialized: false,//added 
    secret: "Datos session BookHut"
}));
app.use(cookies());

app.use(userLoguedMiddleware);
//app.use(notUniqueEmailMiddleware);



app.listen(3030, () => console.log('Servidor en linea en puerto 3030'));

// Definición de rutas
app.use('/', rutasMain);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/carrito', carritoRouter);

app.use((req, res, next) => {
    res.status(404).render("../views/partials/not-found.ejs")

});



