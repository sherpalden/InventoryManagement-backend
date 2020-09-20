var mysequelize = require('../configs/dbconfigs')
const shopAndOutlet = mysequelize.sequelize.define('shopAndOutlet',
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
    tableName: 'shops_outlets'
}
)

shopAndOutlet.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = shopAndOutlet;  