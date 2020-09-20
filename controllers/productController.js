const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;
const mySeq = require('../configs/dbconfigs') 

const product = require('../models/productModel');  

/*Operations for single product*/
const getLastProductID = (req, res, next) => {
    mySeq.sequelize.query(
        'SELECT id\
        FROM products\
        WHERE id = (SELECT MAX(id) FROM products);',
        { type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        req.productId = result[0].id;
        console.log(typeof(result))
        next();
    })
    .catch(err => {
        res.send({ "status": 500, "message": err.message });
    })
}

const addProduct = (req, res, next) => {
    product.create({
        id: req.body.id,
        name: req.body.name,
        categoryId: req.body.categoryId,
        description: req.body.description
    })
    .then(result => {
        next();
    })
    .catch(err => {
        res.send({ "status": 500, "message": err.message });
    })
}

const getProduct = (req, res, next) => {
    product.findOne({where: {name: req.body.productName, categoryId: req.body.catId}})
    .then(result => {
        req.imagePath = result.dataValues.imagePath;
        req.description = result.dataValues.description;
        next();
    })
    .catch(err => {
        res.send({"status": 400, "message": err.message})
    })
}

const deleteProduct = (req, res, next) => {
    product.destroy({where: {id: req.body.productId}})
    .then(() => {
        next();
    })
    .catch(err => {
        res.send({"status": 400, "message": err.message})
    })
}

const updateProduct = (req, res, next) => {
    product.update(
        {
            name: req.body.newName,
            categoryId: req.body.categoryId,
            imagePath: req.body.newImagePath,
            description: req.body.newDescription
        },
        { 
            where: {
                id: req.body.productId
            }
        }
    )
    .then(() => {
        next();
    })
    .catch(err => {
        res.send({"status": 400, "message": err.message})
    })
}


/*operations for multiple products*/
//display products by category names..

const getProductsByCategory = (req, res, next) => {
    product.findAll({where: {categoryId: req.body.categoryId}})
    .then(result => {
        req.productList = result;
        next();
    })
    .catch(err => {
        res.send({"status": 400, "message": err.message})
    })
}


module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductsByCategory,
    getLastProductID
}