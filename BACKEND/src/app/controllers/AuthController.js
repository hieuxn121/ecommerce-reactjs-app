const User = require('../models/User');
const {validationResult}  = require('express-validator/check')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class AuthController {
    signUp(req, res, next){
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            console.log("===",error);
            throw error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        bcrypt
            .hash(password,12)
            .then(hashedPwd => {
                const user = new User({
                    email: email,
                    password: hashedPwd,
                    name: name
                })
                console.log('new user: ', user);
                return user.save();
            })
            .then(result => {
                res.status(201).json({message: 'User Created !', userId: result._id});
            })
            .catch( err => {
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            })
    }
    login(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);
        let loadUser;
        User.findOne({email: email})
            .then(user => {
                if(!user){
                    const error = new Error('A user with this email cound not be found');
                    error.statusCode = 401;
                    throw error;
                }
                loadUser = user;
                return bcrypt.compare(password, user.password);
            })
            .then(isEqual => {
                if(!isEqual){
                    const error = new Error("Wrong password");
                    error.statusCode = 401;
                    throw error;
                }
                const token = jwt.sign({
                    email: loadUser.email,
                    userId: loadUser._id.toString()
                },
                    "somesupersecretkey",
                    {expiresIn: '1h'}
                );
                res.status(200).json({token: token, userId: loadUser._id.toString()})
            })
            .catch(err => {
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            })

    }
}
module.exports = new AuthController;