var mysequelize = require('../configs/dbconfigs')
const salesDetails = mysequelize.sequelize.define('salesDetails',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
    },
    transactionId: {
    	type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
	productId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
    qty: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    unit: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    price: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    }
},
{	
    freezeTableName : true,
    tableName: 'sales_details'
}
)

salesDetails.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = salesDetails;  