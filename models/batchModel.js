var mysequelize = require('../configs/dbconfigs')
const batch = mysequelize.sequelize.define('batch',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
    },
    mfgDate: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
	expiryDate: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    }
},
{	
    freezeTableName : true,
    tableName: 'batches'
}
)

batch.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = batch;  