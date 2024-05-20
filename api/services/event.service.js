const httpStatus = require('http-status');
const { Event, Input, Option } = require('../models');
const ApiError = require('../utils/ApiError');


const getEventById = async (eventId) => {
    const event = await Event.findByPk(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};

const getEvents = async () => {
    const events = await Event.findAll();
    return events;
};

async function createEvent(eventData, userId) {
    const { name } = eventData;
    const event = await Event.create({ name,userId });
    return event;
}

async function updateEvent(eventId, eventData) {
    try {
        const { name } = eventData;
        const event = await getEventById(eventData)
        return event;
    } catch (error) {
        throw error;
    }
}

async function deleteEvent(eventId) {
    const event = await Event.findByPk(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    await event.destroy();
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEvents
};
