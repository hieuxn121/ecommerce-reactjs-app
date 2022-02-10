const Product = require('../../models/Product');
const utilFc = (cate, paramSort, valueSort, limit, res, next) => {
    if(cate){
        Product.find({category: cate}, null, {sort: {[paramSort]: valueSort},limit: parseInt(limit)})
        .then(products => res.json(products))
        .catch(err => next(err));
    }
    else {
        Product.find({}, null,{sort: {[paramSort]: valueSort},limit: parseInt(limit)})
        .then(products => res.json(products))
        .catch(err => next(err));
    }
}
class ProductController {
    showListProd(req,res,next){
        const limit = req.body.limit;
        const keyword = req.body.keyword;
        const sort = req.body.sort;
        const cate = req.body.cate
        console.log("===", limit, '-', keyword, '-', sort, '-', cate);
        if(keyword){
            Product.find({ "title" : { $regex : new RegExp(keyword, "i") } }, null, {limit: parseInt(limit)})
            .then(products => res.json(products))
            .catch(err => next(err));
        }
        else {
            switch(sort){
                case 'nameAZ': {
                    utilFc(cate,"title", 1, limit, res, next);
                }
                break;
                case 'nameZA': {
                    utilFc(cate,"title", -1, limit, res, next);
                }
                break;
                case 'priceIncre': {
                    utilFc(cate,"price", 1 , limit, res, next);
                }
                break;
                case 'priceDescre':{
                    utilFc(cate,"price", -1 , limit, res, next);
                }
                break;
                default:
                    utilFc(cate,"title", 1, limit, res, next);
            }
        }
    }
    detail(req,res,next){
        const id = req.params.idProd;
        Product.findOne({_id: id})
        .then(product => res.json(product))
        .catch(err => next(err));
    }

    showListProdByCate(req,res,next){
        Product.find({category: req.params.cateName})
        .then(products => res.json(products))
        .catch(err => next(err));
    }
}
module.exports = new ProductController