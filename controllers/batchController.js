const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;
const mySeq = require('../configs/dbconfigs') 

const batch = require('../models/batchModel');  

const addBatch = (req, res, next) => {
	unit.create({
		mfgDate: req.body.mfgDate,
		expiryDate: req.body.expiryDate
	})
	.then(result => {
		next();
	})
	.catch(err => {
		next(err);
	})
}



module.exports = {
	addBatch
}