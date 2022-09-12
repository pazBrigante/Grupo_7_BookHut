const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/apiController')

router.get('/products', apiController.list);
router.get('/products/:id', apiController.detail);
router.get('/users', apiController.listUsers);
router.get('/users/:id', apiController.detailUsers);
//router.post('/api/movies/add', moviesController.store);
//router.delete('/api/movies/delete/:id', moviesController.delete);




module.exports = router;