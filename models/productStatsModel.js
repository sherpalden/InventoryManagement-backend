/* creates a user table in the database */
var mysequelize = require('../configs/dbconfigs')
const product_stats = mysequelize.sequelize.define('product_stats',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
	},
	user_id: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    },
    product_id: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
    }
},
{
    freezeTableName : true,
    tableName: 'product_stats'
}
)

product_stats.sync({force:false})
/* .then(function(){
    console.log('user_accounts table created')
})
.catch(function(){
	console.log('err creating user_accounts table')
 }) */

module.exports = product_stats;