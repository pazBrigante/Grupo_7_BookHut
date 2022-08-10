const express = require('express');
const router = express.Router();

const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');

const mainController = require("../controllers/mainController.js");
const productsController = require('../controllers/productsController.js');
const userLoguedMiddleware=require("../middlewares/userLoguedMiddleware.js");
router.use(express.static(publicFolderPath)); 


router.get('/',mainController.seleccionados );


router.get("/lanzamientos",mainController.lanzamientos);
router.get("/masVendidos",mainController.masVendidos);
router.get("/seleccionados", mainController.seleccionados);



 

module.exports =router;
