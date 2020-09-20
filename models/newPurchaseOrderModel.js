var mysequelize = require('../configs/dbconfigs')
const newPurchaseOrder = mysequelize.sequelize.define('newPurchaseOrder',
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
	productName: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
    vendorId: {
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
    purchasePrice: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    inDate: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    }
},
{	
    freezeTableName : true,
    tableName: 'new_purchase_orders'
}
)

newPurchaseOrder.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = newPurchaseOrder;  