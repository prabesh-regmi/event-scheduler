const cron = require('node-cron');
const { Event, User } = require('../models');
const { sendEventNotifierMail } = require('./email.service');

// Schedule a task to run every minute
cron.schedule('* * * * *', async () => {
    const now = new Date();
    // Find events that are starting now
    const upcomingEvents = await Event.findAll({
        where: {
            start: { $lte: now },
            end: { $gte: now },
        },
        include: { model: User }
    });
    await Promise.all(upcomingEvents.map(event => sendEventNotifierMail(event)));
});