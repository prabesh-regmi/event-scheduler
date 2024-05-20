const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const eventRoute = require('./event.route');
const holidaysRoute = require('./holiday.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/events',
    route: eventRoute,
  },
  {
    path: '/holidays',
    route: holidaysRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
