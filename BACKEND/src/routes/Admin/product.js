const express = require('express');
const router = express.Router();
const productControllers = require('../../app/controllers/Admin/ProductControllers');

router.get('/', productControllers.showListProd);

module.exports = router;
