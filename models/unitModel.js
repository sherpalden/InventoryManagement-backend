/* creates a user table in the database */
var mysequelize = require('../configs/dbconfigs')
const unit = mysequelize.sequelize.define('unit',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
	},
    productId: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
	},
	unitName: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},
	baseUnit: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},
    numberOfBaseUnits: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
	salesPrice: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    }
},
{
    freezeTableName : true,
    tableName: 'units_prices'
}
)

unit.sync({force:false})
//  .then(function(){
//     console.log('user_accounts table created')
// })
// .catch(function(){
// 	console.log('err creating user_accounts table')
//  }) 

module.exports = unit;

