const express = require('express');
const router =  express.Router();
// controllers require
const categoryController = require('../controllers/categoryController');
const authenticationController = require('../controllers/authenticationController');

//retrive full category tree routes
router.get('/getAllData', authenticationController.tokenVerification, categoryController.getCategoryData, 
	authenticationController.genNewAccessToken, (req, res, next) => {
		res.status(200);
	    res.send({
	        "message": req.catData,
	        "accessToken": req.accessToken
	    })
});

router.get('/getCategoryDataForProduct', authenticationController.tokenVerification, categoryController.getCategoryDataForProduct, 
    authenticationController.genNewAccessToken, (req, res, next) => {
	    res.status(200);
	    res.send({
	        "message": req.catData,
	        "accessToken": req.accessToken
	    })
})

//add category routes
router.post('/createRootNode', authenticationController.tokenVerification, categoryController.createRootNode, 
	authenticationController.genNewAccessToken, (req, res, next) => {
		res.status(200);
	    res.send({
	        "message": "root node created Successfully",
	        "accessToken": req.accessToken
	    })
});

router.post('/addCategory', authenticationController.tokenVerification, categoryController.addCategory, 
	authenticationController.genNewAccessToken, (req, res, next) => {
		res.status(200);
	    res.send({
	        "message": "Added Successfully",
	        "accessToken": req.accessToken
	    })
});

//rename category
router.post('/renameCategory', authenticationController.tokenVerification, categoryController.renameCategory, 
	authenticationController.genNewAccessToken, (req, res, next) => {
		res.status(200);
	    res.send({
	        "message": "Renamed Successfully",
	        "accessToken": req.accessToken
	    })
});

router.post('/deleteCategory', authenticationController.tokenVerification, categoryController.deleteCategory, 
	authenticationController.genNewAccessToken, (req, res, next) => {
		res.status(200);
	    res.send({
	        "message": "Deleted Successfully",
	        "accessToken": req.accessToken
	    })
});
module.exports = router;