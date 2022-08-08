 //************ Require's ************
 const express = require('express');
 const router = express.Router();
 const {check} = require ("express-validator");
 const multer= require('multer');
    var storage=multer.diskStorage( {

    destination:function(req,file,cb) {
        cb(null,"public/images/users")
            },
        filename: function(req,file,cb){
           cb(null, Date.now() + '-' +file.originalname) 


            }
})

 var upload= multer({storage:storage});
// ************ Controller Require ************


const usersController = require('../controllers/usersController');

/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/register', usersController.register);
router.post('/', upload.single("avatar-img"),[
    check("usuario").isLength({min:4}).withMessage("Usuario Mínimo 4 Caracteres"),
    check("pass").isLength({min:4}).withMessage("Password Mínimo 4 Caracteres"),
    check("passC").custom(async (passC, {req}) => {
        const password = req.body.pass;
        if(password !== passC){
            throw new Error('Las Contraseñas deben ser iguales')
        }
    }),
    check("email").isEmail().withMessage("Debe ser Email"),
    check("nacimiento").isDate().withMessage("Debe ser Fecha"),
    
]  ,usersController.create);  


/*** GET ONE PRODUCT ***/ 
// router.???('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
// router.???('/:id/???', productsController.edit); 
// router.???('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
//router.get('/eliminar/:id', productsController.destroy); 

router.get('/list',usersController.list);
router.delete('/eliminar/:id', usersController.destroy); 
router.get('/detalle/:id',usersController.detalle);
router.get("/login",usersController.login);
router.post("/login",[
    check("usuario").isLength({min:4}).withMessage("Usuario Mínimo 4 Caracteres"),
    check("pass").isLength({min:4}).withMessage("Password Mínimo 4 Caracteres")
],
    
    usersController.processLogin);
    router.get("/register",usersController.register
    );

 module.exports = router;
