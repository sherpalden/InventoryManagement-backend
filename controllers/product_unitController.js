const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;
const mySeq = require('../configs/dbconfigs') 

const product = require('../models/productModel'); 
const unit = require('../models/unitModel'); 

//get products and units details based on product id...products

const getProductDetails = (req, res, next) => {
	const productId = req.params.productId;
	mySeq.sequelize.query(
        'SELECT p.id, p.name, up.baseUnit, up.salesPrice\
			FROM products p\
			INNER JOIN units_prices up\
			ON p.id = up.productId\
			WHERE up.numberOfBaseUnits = 1 AND\
				p.id = '+productId+';',
        { type: mySeq.sequelize.QueryTypes.SELECT })	
	.then(result => {
		req.productDetails = result;
		next();
	})
	.catch(err => {
		next(err);
	})
}

module.exports = {
	getProductDetails
}