 //************ Require's ************
 const express = require('express');
 const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/register', usersController.register);
router.post('/', usersController.create);  


/*** GET ONE PRODUCT ***/ 
// router.???('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
// router.???('/:id/???', productsController.edit); 
// router.???('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
//router.get('/eliminar/:id', productsController.destroy); 

router.get('/list',usersController.list);
router.get('/eliminar/:id', usersController.destroy); 
router.get('/detalle/:id',usersController.detalle);


 module.exports = router;
