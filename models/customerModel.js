var mysequelize = require('../configs/dbconfigs')
const customer = mysequelize.sequelize.define('customer',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
    },
    name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
	phoneNumber: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    }
},
{	
    freezeTableName : true,
    tableName: 'customers'
}
)

customer.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = customer;  