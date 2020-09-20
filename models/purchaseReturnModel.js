var mysequelize = require('../configs/dbconfigs')
const purchaseReturn = mysequelize.sequelize.define('purchaseReturn',
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
    vendorId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
	batchId: {
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
    returnPrice: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    sectionId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    }
},
{	
    freezeTableName : true,
    tableName: 'purchase_returns'
}
)

purchaseReturn.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = purchaseReturn;  