const express = require('express');
const router =  express.Router();

// controllers require
const productController = require('../controllers/productController');
const authenticationController = require('../controllers/authenticationController');
const product_unitController = require('../controllers/product_unitController');


router.post('/addProduct', authenticationController.tokenVerification, productController.addProduct, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "Add Successful"
    })
});

router.get('/getProduct', authenticationController.tokenVerification, productController.getProduct, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "categoryName": req.categoryName,
        "imagePath": req.imagePath,
        "description": req.description
    })
})

router.get('/getLastProductID', authenticationController.tokenVerification, productController.getLastProductID, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": req.productId
    })
})


// display products routes
router.delete('/deleteProduct', authenticationController.tokenVerification, productController.deleteProduct, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "successfully deleted"
    })
})

router.put('/updateProduct', authenticationController.tokenVerification, productController.updateProduct, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "successfully updated"
    })
})


router.get('/getProductsByCategory', authenticationController.tokenVerification, productController.getProductsByCategory, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "successfully updated"
    })
})

//get product and units details based on product id

router.get('/getProductDetails/:productId', authenticationController.tokenVerification, product_unitController.getProductDetails, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": req.productDetails
    })
})


// // upload products images 
// const upload = require('../middleware/imageUpload');
// router.post('/uploadProducts', upload.array("myFiles", 12), (req, res, next) => {
//     res.status(200);
//     res.send({
//         "message": "successfully uploaded"
//     })
// })

module.exports = router;