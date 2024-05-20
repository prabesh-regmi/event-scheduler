// Joi Validation Schema
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const event = {
  title: Joi.string().required().messages({
    'any.required': 'Title is required.',
  }),
  startTime: Joi.date().required().messages({
    'any.required': 'Start time is required.',
  }),
  endTime: Joi.date().required().messages({
    'any.required': 'Ent time is required.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required.',
  }),
}

const createEvent = {
  body: Joi.object(event)
};
const updateEvent = {
  params: Joi.object({
    eventId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Event Id is required.',
      'string.empty': 'Event id cannot be empty.'
    }),
  }),
  body: Joi.object(event)
};
const getEvent = {
  params: Joi.object({
    eventId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Event Id is required.',
      'string.empty': 'Event id cannot be empty.'
    }),
  }),
};
const deleteEvent = {
  params: Joi.object({
    eventId: Joi.string().required().custom(objectId).messages({
      'any.required': 'Event Id is required.',
      'string.empty': 'Event id cannot be empty.'
    }),
  }),
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};
