const express = require('express');
const router =  express.Router();

// controllers require
const salesController = require('../controllers/salesController');
const authenticationController = require('../controllers/authenticationController');


router.get('/getLastSalesId', authenticationController.tokenVerification, salesController.getLastSalesId, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": req.salesTransactionId
    })
});

router.post('/addSalesTransaction', authenticationController.tokenVerification, salesController.addSalesTransaction, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "sales transaction added successfully"
    })
});

router.post('/addSalesDetails', authenticationController.tokenVerification, salesController.addSalesDetails, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "sales details added successfully"
    })
});


module.exports = router;