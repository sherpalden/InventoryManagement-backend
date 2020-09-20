
const productStats = require('../models/statistics/productStatsModel');  

const addProductClickStats = (req, res, next) => {
    productStats.create({
        user_id: req.body.user_id,
        product_id: req.body.product_id
    })
    .then(function(result) {
        next();
    })
    .catch(function(err) {
        next({ "status": 500, "message": "DB Error" });
    })
}

module.exports = {
    addProductClickStats
}