const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;
const mySeq = require('../configs/dbconfigs') 

const salesTransaction = require('../models/salesTransactionModel');  
const salesDetails = require('../models/salesDetailsModel');  


const getLastSalesId = (req, res, next) => {
    mySeq.sequelize.query(
        'SELECT id\
        FROM sales_transactions\
        WHERE id = (SELECT MAX(id) FROM sales_transactions);',
        { type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        req.salesTransactionId = result[0].id;
        console.log(typeof(result))
        next();
    })
    .catch(err => {
        res.send({ "status": 500, "message": err.message });
    })
}

const addSalesTransaction = (req, res, next) => {
	next();
}

const addSalesDetails = (req, res, next) => {
	let salesDetailData = req.body.salesDetailData;
	(async () => {
		try {
			await salesDetails.bulkCreate(salesDetailData);
			next();
		}
		catch(err){
			next(err);
		}
	})();
}

module.exports = {
	getLastSalesId,
	addSalesDetails,
	addSalesTransaction
}