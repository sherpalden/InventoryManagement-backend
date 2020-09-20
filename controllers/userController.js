const validator = require("./validationController");
const mySeq = require('../configs/dbconfigs') 
const bcrypt = require('bcrypt'); //for hashing passwords...
const saltRounds = 10;
const users = require('../models/userModel');

const validationRule = require('./validationController');

const registerValidation = (req, res, next) => {
    if(validationRule.numberValidation(req.body.phoneNumber) === true
     && validationRule.phoneNumberLengthValidation(req.body.phoneNumber) == true 
     && validationRule.emailValidation(req.body.email) == true
     && validationRule.passwordLengthValidation(req.body.password) == true 
     && validationRule.noSpaceValidation(req.body.password) == true)
    {
        next();
    }
    else
    {
        next({ "status": 401, "message": "user register validation Error!!!" });
    }
}

const checkUniquePhoneNumber = (req, res, next) => {
    users.findOne({
        where: { phoneNumber: req.body.phoneNumber }
    })
    .then(result => {
        if(result){
            next({ "status": 401, "message": "Phone number already exists!!!" });
        }else{
            next();
        }
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error while checking unique phoneNumber.", "err":err });
    })
}

const checkUniqueEmail = (req, res, next) => {
    users.findOne({
        where: { email: req.body.email }
    })
    .then(result => {
        if(result){
            next({ "status": 401, "message": "Email already exists!!!" });
        }else{
            next();
        }
    })
    .catch(err => {
        next({ "status": 400, "message": "DB error while checking unique email" });
    })
}

const genUserID = (req, res, next) => {
    mySeq.sequelize.query(
        'SELECT id\
        FROM users\
        WHERE id = (SELECT MAX(id) FROM users);',
        { type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        req.userId = parseInt(result[0].id) + 1;
        next();
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error generating user id." });
    })
}

const hash = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            req.hash = hash;
            next();
        })
        .catch(function (err) {
            next({ "status": 400, "message": "System Error during password hash" });
        })
}

const registerUser = (req, res, next) => {
    users.create({
        id: req.userId,
        password: req.hash, 
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    .then(function(result) {
        next();
    })
    .catch(function(err) {
        next({ "status": 500, "message": "DB Error while registering user" });
    })
}

const getProfile = (req, res, next) => {
     mySeq.sequelize.query(
        'SELECT phoneNumber\
        FROM users\
        where email = '+req.email+';',
        { type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        res.status(200)
        req.userData = result;
        next();
    }).catch(err => {
       next({ "status": 500, "message": err });
    })
}

module.exports = {    
    registerValidation, 
    checkUniquePhoneNumber,
    checkUniqueEmail,
    genUserID,
    hash,
    registerUser,
    getProfile
    // getUserData
}
