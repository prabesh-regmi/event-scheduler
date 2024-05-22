// EventController.js

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const getEventById = catchAsync(async (req, res) => {
    const { eventId } = req.params;
    const event = await eventService.getEventById(eventId, req.user);
    res.status(httpStatus.OK).json({ event });
});

const getEvents = catchAsync(async (req, res) => {
    const events = await eventService.getEventsOfUser(req.user?.id);
    res.status(httpStatus.OK).json({ events });
});

const createEvent = catchAsync(async (req, res) => {
    const eventData = req.body;
    const event = await eventService.createEvent(eventData, req.user?.id);
    res.status(httpStatus.CREATED).json({ event });
});

const updateEvent = catchAsync(async (req, res) => {
    const { eventId } = req.params;
    const eventData = req.body;
    const updatedEvent = await eventService.updateEvent(eventId, eventData, req.user);
    res.status(httpStatus.OK).json({ event: updatedEvent });
});

const deleteEvent = catchAsync(async (req, res) => {
    const { eventId } = req.params;
    await eventService.deleteEvent(eventId, req.user);
    res.status(httpStatus.NO_CONTENT).end();
});

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEvents
};
