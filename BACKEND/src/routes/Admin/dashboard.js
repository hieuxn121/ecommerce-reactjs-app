const express = require('express');
const router = express.Router();
const dashboardControllers = require('../../app/controllers/Admin/DashboardControllers');

router.get('/', dashboardControllers.calStaticData);

module.exports = router;
