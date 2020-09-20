var mysequelize = require('../configs/dbconfigs')
const salesTransaction = mysequelize.sequelize.define('salesTransaction',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: false,
		allowNull: false
    },
    date: {
    	type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
	customerId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : true
    },
    amount: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    dis_percent: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : true
    },
    paidAmount: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    sectionID: {
    	type: mysequelize.Sequelize.BIGINT,
		allowNull : true
    }
},
{	
    freezeTableName : true,
    tableName: 'sales_transactions'
}
)

salesTransaction.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = salesTransaction;  