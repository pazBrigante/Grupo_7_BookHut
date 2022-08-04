const express = require('express');
const app = express();
const methodOverride=require("method-override");
const session = require ("express-session");
const {check} = require ("express-validator");
const cookieParser=require("cookie-Parser");

const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');

app.set("view engine","ejs");



const rutasMain = require("./routes/mainRoutes");
const productsRouter = require('./routes/productsRoutes'); // Rutas /products
const usersRouter = require('./routes/usersRoutes'); // Rutas /users

app.use(express.static(publicFolderPath));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({resave:false,//added 
saveUninitialized: true,//added 
 secret:"Datos session BookHut"}));
 app.use(cookieParser());


app.listen(3030, () => console.log('Servidor en linea en puerto 3030'));

app.use('/',rutasMain );

app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.use((req,res,next) => {
    res.status(404).render("../views/partials/not-found.ejs")

});



