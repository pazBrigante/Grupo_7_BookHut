const express = require('express');
const router = express.Router();

const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');

const mainController = require("../controllers/mainController.js");

router.use(express.static(publicFolderPath)); 


router.get('/',mainController.index );
router.get("/register",mainController.register);
router.get("/login",mainController.login);
router.get("/lanzamientos",mainController.lanzamientos);
router.get("/masVendidos",mainController.masVendidos);
router.get("/seleccionados",mainController.seleccionados);

router.get('/detalle/:id',mainController.detalle);
router.get('/carrito/:id',mainController.carrito);

module.exports =router;
