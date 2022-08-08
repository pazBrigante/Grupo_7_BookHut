 //************ Require's ************
 const express = require('express');
 
 const router = express.Router();
 const multer= require('multer');
    var storage=multer.diskStorage( {

    destination:function(req,file,cb) {
        cb(null,"public/images/")
            },
        filename: function(req,file,cb){
           cb(null, Date.now() + '-' +file.originalname) 


            }
})

 var upload= multer({storage:storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Controller Require ************





/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/', upload.single("product-img"),productsController.store);  


/*** GET ONE PRODUCT ***/ 
// router.???('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get("/edit/:id", productsController.edit); 
router.put("/edit/:id", upload.single("product-img"), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/eliminar/:id', productsController.destroy); 

router.get('/list',productsController.list);
router.get('/detalle/:id',productsController.detalle);
router.get('/carrito/:id',productsController.carrito);
router.get('/detalle/carrito/:id',productsController.carrito);
router.get('/search',productsController.search);

 module.exports = router;
