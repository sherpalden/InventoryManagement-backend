const Sequelize = require('sequelize');
require('dotenv').config();
const mySeq = require('../configs/dbconfigs'); 
const { Op } = require('sequelize');

const Stack = require('stack-lifo')


const category = require('../models/categoryModel');

const createRootNode = (req, res, next) => {
	(async () => {
		try {
			const result = await category.findAll();
			if(result.length == 0){
				category.create({
					id: 1,
					name: "Categories",
					lft: 1,
					rgt: 2
				})
				next();
			}
			else next();
		}
		catch(err){
			next(err);
		}
	})();
}

const addCategory = (req, res, next) => {
	let parentId = req.body.parentId;
	let newCategory = req.body.newCategory;

	(async () => {
		try {
			let result = await category.findOne({ where: { id: parentId } });
			let rgtVal = result.dataValues.rgt;
			await category.update(
				{
					rgt: mySeq.Sequelize.literal('rgt + 2')
				},
				{
					where: {
						rgt: {[Op.gte]: rgtVal}
					}
				}
			);
			await category.update(
				{
					lft: mySeq.Sequelize.literal('lft + 2')
				},
				{
					where: {
						lft: {[Op.gte]: rgtVal}
					}
				}
			);

			await category.create({
				name: newCategory,
				lft: rgtVal,
				rgt: rgtVal + 1
			});
			next();
		}
		catch(err){
			res.send({ "status": 400, "message": err.message });
		}
	})();
}


const getCategoryData = (req, res, next) => {
    mySeq.sequelize.query(
        "SELECT node.id, node.name, (COUNT(parent.name) - 1) AS depth\
		FROM categories AS node, categories AS parent\
		WHERE node.lft BETWEEN parent.lft AND parent.rgt\
        GROUP BY node.name\
		ORDER BY node.lft;",
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            req.catData = result;
            next();
        }).catch(err => {
            res.send({ "status": 400, "message": err.message });
    })
}

const moldData = (result, cb) => {
	let myData = [];
	let pStack = new Stack();
	pStack.push(myData);
	for(let i = 0; i < result.length; i++){
		if(i+1 < result.length){
			if(result[i].depth < result[i+1].depth){
				let temp = pStack.peek();
				temp.push({
					value: result[i].id,
					title: result[i].name,
					children: [],
				});
				pStack.push(temp[temp.length - 1].children);
			}
			else if(result[i].depth > result[i+1].depth){
				let temp = pStack.peek();
				temp.push({
					value: result[i].id,
					title: result[i].name,
				});
				for(let j = result[i+1].depth; j < result[i].depth; j++){
					pStack.pop();
				}
			}
			else {
				let temp = pStack.peek();
				temp.push({
					value: result[i].id,
					title: result[i].name,
				});
			}
		}
		else {
			let temp = pStack.peek();
			temp.push({
				value: result[i].id,
				title: result[i].name,
			});
		}
	}
	cb(myData[0].children);
}

const getCategoryDataForProduct = (req, res, next) => {
    mySeq.sequelize.query(
        "SELECT node.id, node.name, (COUNT(parent.name) - 1) AS depth\
		FROM categories AS node, categories AS parent\
		WHERE node.lft BETWEEN parent.lft AND parent.rgt\
        GROUP BY node.name\
		ORDER BY node.lft;",
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            moldData(result, (data) => {
            	req.catData = data;
            });
            next();
        }).catch(err => {
            res.send({ "status": 400, "message": err.message });
    })
}



const deleteCategory = (req, res, next) => {
	let categoryId = req.body.categoryId;
	(async () => {
		try {
			let result = await category.findOne({where: { id: categoryId}});
			let lftVal = result.dataValues.lft;
			let rgtVal = result.dataValues.rgt;
			await category.destroy({where: { id: categoryId }});
			if(rgtVal-lftVal > 1){
				await category.destroy({
					where: {
						lft: {[Op.between]: [lftVal, rgtVal]}
					}
				})
			}
			next();
		}
		catch(err){
			res.send({ "status": 400, "message": err.message });
		}
	})();
}

const renameCategory = (req, res, next) => {
	let categoryName = req.body.categoryName;
	let categoryId = req.body.categoryId;
	category.update({name: categoryName},{where: { id: categoryId }})
	.then(() => {
		next();
	})
	.catch(err => {
		res.send({ "status": 400, "message": err.message });
	});
}

module.exports = {
	createRootNode,
	addCategory,
	getCategoryData,
	deleteCategory,
	renameCategory,
	getCategoryDataForProduct
}

