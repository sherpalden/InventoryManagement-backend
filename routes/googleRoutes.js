const express = require('express');
const router =  express.Router();


const googleAuthController = require('../controllers/googleAuthController');

router.get('/auth/google', googleAuthController.requestAuthCode, (req, res, next) => {
    res.send({
        "message": req.googleLoginUrl
    })
});


router.get('/auth/google/callback', googleAuthController.requestTokenID, (req, res, next) => {
    res.send({
        "tokenID": req.tokenID,
        "accessToken": req.access_token,
        "refreshToken": req.refresh_token
    })
});


module.exports = router;