const axios = require('axios');
const config = require('../config/config');

const getHolidays = async (query) => {
    const { country, year } = query;
    const response = await axios.get(`https://holidayapi.com/v1/holidays`, {
      params: {
        key: config.holiday_api_key, // Replace with your API key
        country: country,
        year: year,
      },
    });
    return response.data;
}
module.exports = { getHolidays };
