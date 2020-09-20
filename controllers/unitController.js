const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;
const mySeq = require('../configs/dbconfigs') 

const unit = require('../models/unitModel');  


const addUnit = (req, res, next) => {
	let unitData = req.body.data;
	(async () => {
		try {
			await unit.bulkCreate(unitData);
			next();
		}
		catch(err){
			next(err);
		}
	})();
}

const getUnits = (req, res, next) => {
	unit.findAll({
		attributes: ['unitName']
	},
	{
		where: {
			productId: req.body.productId
		}
	})
	.then(result => {
		req.units = result;
		next();
	})
	.catch(err => {
		next(err);
	})
}

const getUnitsForProductId = (req, res, next) => {
	const productId = req.params.productId;
	mySeq.sequelize.query(
        'SELECT up.unitName, up.salesPrice\
			FROM units_prices up\
			WHERE up.productId = '+productId+';',
        { type: mySeq.sequelize.QueryTypes.SELECT })	
	.then(result => {
		req.unitData = result;
		next();
	})
	.catch(err => {
		next(err);
	})
}

const getSalesPrice = (req, res, next) => {
	unit.findOne({
		attributes: ['salesPrice']
	},
	{
		where: {
			productId: req.body.productId,
			unitName: req.body.unitName
		}
	})
	.then(result => {
		req.salesPrice = result;
		next();
	})
	.catch(err => {
		next(err);
	})
}

const deleteUnit = (req, res, next) => {
	unit.destroy(
	{
		where: {
			productId: req.body.productId,
			unitName: req.body.unitName
		}
	})
	.then(result => {
		next();
	})
	.catch(err => {
		next(err);
	})
}

const updateUnit = (req, res, next) => {
	unit.update(
	{
		unitName: req.body.unitName,
		baseUnit: req.body.baseUnit,
		numberOfBaseUnits: req.body.numberOfBaseUnits,
		salesPrice: req.body.salesPrice
	},
	{
		where: {
			productId: req.body.productId,
			unitName: req.body.oldUnitName
		}
	})
	.then(result => {
		next();
	})
	.catch(err => {
		next(err);
	})
}

module.exports = {
	addUnit,
	getUnits,
	getSalesPrice,
	deleteUnit,
	updateUnit,
	getUnitsForProductId
}