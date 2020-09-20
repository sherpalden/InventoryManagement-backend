/* creates a user table in the database */
var mysequelize = require('../configs/dbconfigs')
const userRegister = mysequelize.sequelize.define('userRegister',
{
	id: {
		type: mysequelize.Sequelize.STRING,
		primaryKey: true,
		allowNull : false
	},
    email: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false,
		unique: true
	},
    password: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
	phoneNumber: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false,
		unique: true
    }
},
{
    freezeTableName : true,
    tableName: 'users'
}
)

userRegister.sync({force:false})
//  .then(function(){
//     console.log('user_accounts table created')
// })
// .catch(function(){
// 	console.log('err creating user_accounts table')
//  }) 

module.exports = userRegister;

/*
email, phone number and password are mandatory user attributes required for registration so as to ensure the 
easy registration. Remaining useful details will be collected gradually after the registration using interesting
methods like modal pop ups and audio alert after the user logins. Else obligation is created for user to give their 
information after registration.
*/

/*
Other important user details are:-
	1. shopName/businessName
	2. address and so on
*/

/*
user can register in only one way that is through normal form registration. Though the fashion of google and facebook
are quite popular. But taking into consideration the security issues, these methods are discarded in this application.

advantages of google and facebook are taken from the users in the case of marketing by google authorization i.e oauth
*/