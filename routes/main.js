const express = require('express');
const router = express.Router();


const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');
const productosController = require("./controllers/productosController");



router.use(express.static(publicFolderPath));



router.get('/',productosController.index );

router.get("/register",productosController.registro);

module.exports =router;
