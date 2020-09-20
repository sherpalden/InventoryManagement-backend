const Sequelize = require('sequelize');
require('dotenv').config()
const bcrypt = require('bcrypt'); //for hashing passwords...
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySeq = require('../configs/dbconfigs') 



const users = require('../models/userModel');

const activeUsers = require('../models/activeUserModel');


//check email and get password
const checkUser = (req, res, next) => {
    users.findOne({
        where: { email: req.body.email }
    })
    .then(result => {
        if(result){
            req.passwordVal = result.dataValues.password;
            next();
        }else{
            next({ "status": 401, "message": "Email not registered" });
        }
    })
    .catch(function(err) {
        next({ "status": 503, "message": "DB Error!!! while checking user email" });
    })
}


const matchPassword = (req, res, next) => {
    bcrypt.compare(req.body.password, req.passwordVal, (err, res) => {
        if (res == true) {
            console.log("matched");
            next();
        } else if (res == false) {
            next({
                "status": 400,
                "message": "Password does not match"
            });
        }
    });
}

const getToken = (req, res, next) => {
    (async () => {
        try {
            const result = await mySeq.sequelize.query(
                        'SELECT id\
                        FROM active_users\
                        WHERE id = (SELECT MAX(id) FROM active_users);',
                        { type: mySeq.sequelize.QueryTypes.SELECT });
            req.activeUserId = result[0].id + 1;
            req.refreshToken = await jwt.sign({ email: req.body.email, userID: req.activeUserId },
                                         process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30days' });
            req.accessToken = await jwt.sign({ email: req.body.email, userID: req.activeUserId},
                                         process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15days' });
            next();
        }
        catch(err){
            next({ "status": 500, "message": err.message });
        }
    })();
}


const addActiveUser = (req,res,next) => {
    activeUsers.create({
        id: req.activeUserId,
        email: req.body.email,
        currToken: req.accessToken,
        refreshToken: req.refreshToken
    })
    .then(result => {
        next();
    })
    .catch(function(err) {
        next({ "status": 500, "message": "DB Error" });
    })
}

const genNewAccessToken = (req, res, next) => {
    if(req.wantNewToken == true){
        jwt.sign({ email: req.email, userID: req.userID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' }, (err, token) => {
            if(token){
                (async () => {
                    try {
                        await activeUsers.update({currToken: token}, {where: {id: req.userID }});
                        req.accessToken = token;
                        next();
                    }
                    catch(err){
                        res.send({ "status": 500, "message": err.message });
                    }

                })();
            } 
            else {
                res.send({ "status": 500, "message": err.message });
            }
        });
    }
    else{
        next();
    }
} 

const tokenVerification = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ');
    const accessToken = token[1];
    const refreshToken = token[2];
    req.wantNewToken = false;
    activeUsers.findOne({
        where: {refreshToken: refreshToken}
    })
    .then(result => {
        if(result != null && accessToken == result.dataValues.currToken){
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>  {
                if (err && err.message == "jwt expired") {
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                        if (decoded){
                            req.wantNewToken = true;
                            req.email = decoded.email;
                            req.userID = decoded.userID;
                            next();
                        }
                        else {
                            activeUsers.destroy({
                                where: {refreshToken: refreshToken }
                            })
                            .then(() => {
                                res.send({ "message": "logout" });
                            })
                            .catch(err => {
                                res.send({ "status": 500, "message": err.message });
                            })
                        }
                    });
                }
                else if(decoded){
                  req.email = decoded.email
                  next();
                } 
                else res.send({ "status": 500, "message": err.message });
            });
        }
        else{
            activeUsers.destroy({
                where: {refreshToken: refreshToken }
            })
            .then(() => {
                res.send({ "message": "logout" });
            })
            .catch(err => {
                res.send({ "status": 500, "message": err.message });
            })
        }
    })
    .catch(err => {
        res.send({ "status": 500, "message": err.message });
    })
}

/*Did you see the callback hell in the above code*/





const getUserID = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        next({ status: 400, message: 'no authorization header present' })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err != null) {
                next({ status: 401, message: err.message })
            } else {
                req.uid = decoded.uid;
                req.rfTkn = decoded.rftoken;
                next();
            }
        });
    }
}



module.exports = {
    checkUser,
    matchPassword,
    getToken,
    getUserID,
    addActiveUser,
    tokenVerification,
    genNewAccessToken
}