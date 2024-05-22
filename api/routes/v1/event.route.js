// routes/eventRoutes.js

const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { eventValidation } = require('../../validations')
const { eventController } = require('../../controllers');

const router = express.Router();
router.get('/', auth(), eventController.getEvents);
router.post('/', auth(), validate(eventValidation.createEvent), eventController.createEvent);
router.get('/:eventId', auth(), validate(eventValidation.getEvent), eventController.getEventById);
router.put('/:eventId', auth(), validate(eventValidation.updateEvent), eventController.updateEvent);
router.delete('/:eventId', auth(), validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;
