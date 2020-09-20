var mysequelize = require('../configs/dbconfigs')
const vendor = mysequelize.sequelize.define('vendor',
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
    }
},
{	
    freezeTableName : true,
    tableName: 'vendors'
}
)

vendor.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = vendor;  