 //************ Require's ************
 const express = require('express');
 const router = express.Router();
 const multer= require('multer');
    var storage=multer.diskStorage( {

    destination:function(req,file,cb) {
        cb(null,"public/images/users")
            },
        filename: function(req,file,cb){
           cb(null, file.originalname) 


            }
})

 var upload= multer({storage:storage});
// ************ Controller Require ************


const usersController = require('../controllers/usersController');

/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/register', usersController.register);
router.post('/', upload.single("avatar-img"),usersController.create);  


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
router.get("/login",usersController.login);

 module.exports = router;
