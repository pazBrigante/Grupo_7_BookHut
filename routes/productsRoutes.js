 //************ Require's ************
 const express = require('express');
 const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('products/create', productsController.create);
router.post('products/', productsController.store);  


/*** GET ONE PRODUCT ***/ 
// router.???('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
// router.???('/:id/???', productsController.edit); 
// router.???('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
// router.???('/:id', productsController.destroy); 


 module.exports = router;
