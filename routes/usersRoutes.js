//************ Require's ************
const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const multer = require('multer');
const db = require('../database/models');
const sequelize = db.sequelize;
const path = require('path');

const checkLoginUser = [
    check("usuario").isLength({ min: 2 }).withMessage("Usuario Mínimo 2 Caracteres"),
    check("pass").isLength({ min: 4 }).withMessage("Password Mínimo 4 Caracteres")
];
const checkEditUser = [
    check("usuario").isLength({ min: 4 }).withMessage("Usuario Mínimo 4 Caracteres"),
    check("email").isEmail().withMessage("Debe ser Email"),
    check("nacimiento").isDate().withMessage("Debe ser Fecha"),

];

const checkCreateUser = [
    check("usuario").isLength({ min: 4 }).withMessage("Usuario Mínimo 4 Caracteres"),
    check("pass").isLength({ min: 4 }).withMessage("Password Mínimo 4 Caracteres"),
    check("passC").custom(async (passC, { req }) => {
        const password = req.body.pass;
        if (password !== passC) {
            throw new Error('Las Contraseñas deben ser iguales')
        }
    }),
    check("email").isEmail().withMessage("Debe ser Email"),
    check("nacimiento").isDate().withMessage("Debe ser Fecha")
];

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public/images/users")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage,
});

// ************ Controller Require ************
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const notUniqueEmailMiddleware = require('../middlewares/notUniqueEmailMiddleware');

/*** CREATE ONE USER ***/
router.get('/register', usersController.register);

router.post('/', upload.single("avatar_img"), checkCreateUser,
    notUniqueEmailMiddleware, usersController.create);

router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", upload.single("avatar_img"),
    checkEditUser, notUniqueEmailMiddleware, usersController.update);
router.get('/list', usersController.list);
router.delete('/eliminar/:id', usersController.destroy);
router.get('/detalle/:id', usersController.detalle);
//router.get("/login", guestMiddleware, usersController.login);
router.get("/login", usersController.login);
router.get("/logout", usersController.logout);

router.post("/login", checkLoginUser,
    usersController.processLogin);
router.get("/register", usersController.register
);

module.exports = router;
