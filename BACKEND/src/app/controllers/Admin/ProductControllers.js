const Product = require('../../models/Product');
class ProductController {
    showListProd(req,res,next){
        Product.find({})
        .then(products => res.json(products))
        .catch(err => next(err));
    }
}
module.exports = new ProductController