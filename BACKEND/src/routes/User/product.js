const express = require('express');
const router = express.Router();
const productControllers = require('../../app/controllers/User/ProductControllers');

router.get('/:idProd', productControllers.detail);
router.post('/', productControllers.showListProd);

module.exports = router;
