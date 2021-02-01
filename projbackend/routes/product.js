const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, listCategories } = require('../controllers/product');
const { getUserById } = require('../controllers/user');
const router = express.Router();

//params 
router.param('productId',getProductById);
router.param('userId',getUserById);

//routes
router.get('/products', getAllProducts)
router.get('/products/categories',listCategories)
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
router.get('/product/photo/:productId', photo)
router.get('/product/:productId')
router.get('/product/:productId',getProduct)
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct)
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct)



module.exports = router;