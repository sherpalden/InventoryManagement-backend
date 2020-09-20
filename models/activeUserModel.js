var mysequelize = require('../configs/dbconfigs')
const active_user = mysequelize.sequelize.define('active_user',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: false,
		allowNull : false
	},
    email: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},
	currToken: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},
	refreshToken: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    }
},
{
    freezeTableName : true,
    tableName: 'active_users'
}
)

active_user.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */

module.exports = active_user;  

/*
multibrowser login support which means same user will have different refresh token.
*/