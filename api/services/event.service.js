const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const checkValidStarAndEndDate = (start, end) => {
    if (new Date(start) >= new Date(end)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Start date should be before end date.');
    }
}
const getEventById = async (eventId, user) => {
    const event = await Event.findByPk(eventId);
    if (!event) {
        throw new ApiError(httpStatus.NOT_FOUND, "Event not found")
    }
    if (user?.id !== event.userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized")
    }
    return event;
};

const getEventsOfUser = async (userId) => {
    const events = await Event.findAll({ where: { userId } });
    return events;
};

async function createEvent(eventData, userId) {
    checkValidStarAndEndDate(eventData.start, eventData.end);
    // Check for overlapping events
    const overlappingEvents = await Event.findOne({
        where: {
            userId: user.id,
            [Op.or]: [
                {
                    start: {
                        [Op.between]: [eventData.start, eventData.end]
                    }
                },
                {
                    end: {
                        [Op.between]: [eventData.start, eventData.end]
                    }
                },
                {
                    [Op.and]: [
                        {
                            start: {
                                [Op.lte]: eventData.start
                            }
                        },
                        {
                            end: {
                                [Op.gte]: eventData.end
                            }
                        }
                    ]
                }
            ]
        }
    });

    if (overlappingEvents) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'There is already an event scheduled within the given start and end time.');
    }
    // Create the event
    return Event.create({ ...eventData, userId });
}

async function updateEvent(eventId, eventData, user) {
    checkValidStarAndEndDate(eventData.start, eventData.end);
    const event = await getEventById(eventId, user)
    // Check for overlapping events
    const overlappingEvents = await Event.findOne({
        where: {
            id: { [Op.ne]: eventId }, // Exclude the current event
            userId: user.id,
            [Op.or]: [
                {
                    start: {
                        [Op.between]: [eventData.start, eventData.end]
                    }
                },
                {
                    end: {
                        [Op.between]: [eventData.start, eventData.end]
                    }
                },
                {
                    [Op.and]: [
                        {
                            start: {
                                [Op.lte]: eventData.start
                            }
                        },
                        {
                            end: {
                                [Op.gte]: eventData.end
                            }
                        }
                    ]
                }
            ]
        }
    });
    if (overlappingEvents) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'There is already an event scheduled within the given start and end time.');
    }
    await event.update(eventData);
    return getEventById(eventId, user);
}

async function deleteEvent(eventId, user) {
    const event = await getEventById(eventId, user)
    await event.destroy();
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsOfUser
};
