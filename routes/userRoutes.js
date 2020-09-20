const express = require('express');
const router =  express.Router();
// controllers require
var authenticationController = require('../controllers/authenticationController');
var userController = require('../controllers/userController');

//register routes
router.post('/register', userController.registerValidation, userController.checkUniquePhoneNumber,
	userController.checkUniqueEmail, userController.genUserID, userController.hash, 
	userController.registerUser, authenticationController.getToken, (req, res, next) => {
		res.status(200);
	    res.send({
	        "message": "Registration Successful",
	        "accessToken": req.accessToken,
	        "refreshToken": req.refreshToken
	    })
});

//login routes
router.post('/login', authenticationController.checkUser, authenticationController.matchPassword,
	authenticationController.getToken, authenticationController.addActiveUser, (req, res, next) => {
	    res.status(200);
	    res.send({
	        "message": "Login Successful",
	        "accessToken": req.accessToken,
	        "refreshToken": req.refreshToken
	    })
});


router.post('/test', authenticationController.tokenVerification, userController.getProfile, 
	authenticationController.genNewAccessToken, (req, res, next) => {
	    res.status(200);
	    res.send({
	        "message": req.userData,
	        "accessToken": req.accessToken
	    })
});

module.exports = router;

