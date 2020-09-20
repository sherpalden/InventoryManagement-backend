const express = require('express');
const router =  express.Router();

// controllers require
const unitController = require('../controllers/unitController');
const authenticationController = require('../controllers/authenticationController');

router.post('/addUnit', authenticationController.tokenVerification, unitController.addUnit, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "Add units Successful"
    })
});

router.get('/getUnits', authenticationController.tokenVerification, unitController.getUnits, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "get units Successful"
    })
});

//get units data for specific product id
router.get('/getUnitsForProductId/:productId', authenticationController.tokenVerification, unitController.getUnitsForProductId, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": req.unitData
    })
});

router.get('/getSalesPrice', authenticationController.tokenVerification, unitController.getSalesPrice, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "get sales price Successful"
    })
});

router.delete('/deleteUnit', authenticationController.tokenVerification, unitController.deleteUnit, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "delete units Successful"
    })
});

router.put('/updateUnit', authenticationController.tokenVerification, unitController.updateUnit, 
    authenticationController.genNewAccessToken, (req, res, next) => {
    res.status(200);
    res.send({
        "message": "udpate units Successful"
    })
});


module.exports = router;