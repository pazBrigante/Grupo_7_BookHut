 //************ Require's ************
 const express = require('express');
 const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/', productsController.store);  


/*** GET ONE PRODUCT ***/ 
// router.???('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
// router.???('/:id/???', productsController.edit); 
// router.???('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
// router.delete('products/:id/eliminar', productsController.destroy); 


router.get('/detalle/:id',productsController.detalle);
router.get('/carrito/:id',productsController.carrito);
router.get('/detalle/carrito/:id',productsController.carrito);
router.get('/search',productsController.search);

 module.exports = router;