const Category = require('../../models/Category')

class CategoryController {
    showListCate(req, res, next) {
        Category.find({}).
        then(categories => res.json(categories))
        .catch(err => next(err));
    }
}
module.exports = new CategoryController;