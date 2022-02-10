const Product = require('../../models/Product');
const User = require('../../models/User');
class DashboardController {
    async calStaticData(req,res,next) {
        console.log("DASH");
        const total = await Product.count({});
        const users = await User.count({});
        res.render('dashboard', {numProds: total, numUsers: users})
    }
}
module.exports = new DashboardController;