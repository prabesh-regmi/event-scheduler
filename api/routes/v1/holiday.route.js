// routes/eventRoutes.js

const express = require('express');
const { holidayController } = require('../../controllers');

const router = express.Router();
router.get('/', holidayController.getHolidays);
module.exports = router;
