const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const {body} = require('express-validator/check');
const User = require('../app/models/User.js')

router.post('/login', authController.login);
router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
            return User.findOne({email: value})
                    .then(userDoc => {
                        if(userDoc){
                            return Promise.reject('E-mail address already exits');
                        }
                    });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 8}),
    body('name')
        .not()
        .isEmpty()
], authController.signUp);
module.exports = router;