var mysequelize = require('../configs/dbconfigs')
const product = mysequelize.sequelize.define('product',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: false,
		allowNull : false
    },
    name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    categoryId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
    description: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	}
},
{
    freezeTableName : true,
    tableName: 'products'
}
)

product.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = product;  

