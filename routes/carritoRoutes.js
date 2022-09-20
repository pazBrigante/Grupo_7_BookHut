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

const carritoController = require('../controllers/carritoController');
// ************ Controller Require ************





/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 




router.get('/:id',carritoController.store);
router.get('/lista/:id',carritoController.list);

module.exports = router;
