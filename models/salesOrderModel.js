var mysequelize = require('../configs/dbconfigs')
const salesOrder = mysequelize.sequelize.define('salesOrder',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
    },
    date: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
	productId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
    customerId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
    quantity: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    unit: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    salesPrice: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    outDate: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    }
},
{	
    freezeTableName : true,
    tableName: 'sales_returns'
}
)

salesOrder.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = salesOrder;  