const productRoute = require('./User/product')
const categoryRoute = require('./User/category')
const dashboardRoute = require('./Admin/dashboard');
const productAdminRoute = require('./Admin/product');
const authRoute = require('./auth');
function route(app) {
    app.use('/admin/dashboard' , dashboardRoute);
    app.use('/admin/products' , productAdminRoute);
    app.use('/auth', authRoute);
    app.use('/categories', categoryRoute);
    app.use('/products', productRoute);
    app.use((error, req,res,next) => {
        console.log(error);
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;
        res.status(status).json({
            message: message,
            data: data
        });
    })
}
module.exports = route;