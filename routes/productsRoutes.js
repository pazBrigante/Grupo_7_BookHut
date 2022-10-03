//************ Require's ************
const express = require('express');
const { check } = require("express-validator");

const router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public/images/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)


    }
})

var upload = multer({
    storage: storage
   
});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const carritoController = require('../controllers/carritoController');
// ************ Controller Require ************

const checkEditProduct =[   check("nombre").isLength({ min: 5 }).withMessage("Nombre Mínimo 5 Caracteres"),
check("codigo").isLength({ min: 4 }).withMessage("Código Mínimo 4 Caracteres"),
check("autor").isLength({ min: 4 }).withMessage("Autor Mínimo 4 Caracteres"),
check("descripcion").isLength({ min: 4 }).withMessage("Autor Mínimo 4 Caracteres"),
check("precio").isNumeric({ min: 2 }).withMessage("Precio Inválido"),
check("categoria").custom(async (categoria, { req }) => {
    console.log("categoria", categoria);
    console.log("categoria", "seleccionados");
    if ((categoria != "lanzamientos") && (categoria != "seleccionados") && (categoria != "masVendidos")) {
        throw new Error('Categoría incorrecta')
    }
})
];

const checkCreateProduct=[check("nombre").isLength({ min: 5 }).withMessage("Nombre Mínimo 5 Caracteres"),
check("codigo").isLength({ min: 4 }).withMessage("Código Mínimo 4 Caracteres"),
check("autor").isLength({ min: 4 }).withMessage("Autor Mínimo 4 Caracteres"),
check("descripcion").isLength({ min: 4 }).withMessage("Descripción Mínimo 4 Caracteres"),
check("precio").isNumeric({ min: 2 }).withMessage("Precio Inválido"),
check("categoria").custom(async (categoria, { req }) => {
    console.log("categoria", categoria);
    if ((categoria != "lanzamientos") && (categoria != "seleccionados") && (categoria != "masVendidos")) {
        throw new Error('Categoría incorrecta')
    }
}),
];

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);


router.post('/', upload.single("product-img"),
checkCreateProduct,productsController.store);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);

router.put("/edit/:id", upload.single("product-img"), 
checkEditProduct,productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/eliminar/:id', productsController.destroy);
router.get('/list', productsController.list);
router.get('/detalle/:id', productsController.detalle);
//router.get('/carrito/:id',carritoController.store);
router.get('/detalle/carrito/:id', productsController.carrito);
router.get('/search', productsController.search);

module.exports = router;
