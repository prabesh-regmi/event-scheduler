
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { holidayService } = require('../services');

const getHolidays = catchAsync(async (req, res) => {
    const holidays = await holidayService.getHolidays(req.query);
    res.status(httpStatus.OK).json(holidays);
});

module.exports = {
    getHolidays,
};