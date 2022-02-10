const isAuth = require('../../app/middleware/isAuth');
const express = require('express');
const router = express.Router();
const categoryController = require('../../app/controllers/User/CategoryControllers');

router.get('/',categoryController.showListCate)

module.exports = router;