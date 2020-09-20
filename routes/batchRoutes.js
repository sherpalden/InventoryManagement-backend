const express = require('express');
const router =  express.Router();

// controllers require
const batchController = require('../controllers/batchController');
var authenticationController = require('../controllers/authenticationController');

router.post('/addBatch', authenticationController.tokenVerification, batchController.addBatch, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "Add units Successful"
    })
});


module.exports = router;