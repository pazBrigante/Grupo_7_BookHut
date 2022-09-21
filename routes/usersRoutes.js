//************ Require's ************
const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const multer = require('multer');
const db = require('../database/models');
const sequelize = db.sequelize;
const path = require('path');


var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public/images/users")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)


    }
})

var upload = multer({ storage: storage, 
    //fileFilter: (req, file, cb) => {
      //  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //      cb(null, true);
     //   } else {
     //     cb(null, false);
     //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      //  }}
    });
// ************ Controller Require ************


const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');


/*** GET ALL USER ***/
//router.get('/', productsController.index); 

/*** CREATE ONE USER ***/
router.get('/register', usersController.register);
router.post('/', upload.single("avatar_img"), [
    check("usuario").isLength({ min: 4 }).withMessage("Usuario Mínimo 4 Caracteres"),
    check("pass").isLength({ min: 4 }).withMessage("Password Mínimo 4 Caracteres"),
    check("passC").custom(async (passC, { req }) => {
        const password = req.body.pass;
        if (password !== passC) {
            throw new Error('Las Contraseñas deben ser iguales')
        }
    }),
    //check("email").custom(async (email1, { req }) => {
        
     //   console.log("verificar email1",email1);
    ////    db.Usuario.findAll(
           // { where: { "email": email1 } }
     //   )
     //   .then(resultado => {
           
     //   if (resultado != "") {
          //  new Error('El email ya esta registrado')

    //    }
    
   // });
//}
//)
//,
    check("email").isEmail().withMessage("Debe ser Email"),
    check("nacimiento").isDate().withMessage("Debe ser Fecha"),
    
], usersController.create);

router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", upload.single("avatar_img"),
    [
        check("usuario").isLength({ min: 4 }).withMessage("Usuario Mínimo 4 Caracteres"),
        check("email").isEmail().withMessage("Debe ser Email"),
        check("nacimiento").isDate().withMessage("Debe ser Fecha"),
       
    ],
    usersController.update);


router.get('/list', usersController.list);
router.delete('/eliminar/:id', usersController.destroy);
router.get('/detalle/:id', usersController.detalle);
router.get("/login", guestMiddleware, usersController.login);

router.get("/logout", usersController.logout);
router.post("/login", [
    check("usuario").isLength({ min: 4 }).withMessage("Usuario Mínimo 4 Caracteres"),
    check("pass").isLength({ min: 4 }).withMessage("Password Mínimo 4 Caracteres")
],

    usersController.processLogin);
router.get("/register", usersController.register
);

module.exports = router;
