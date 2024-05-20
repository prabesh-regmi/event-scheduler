// server.js
const express = require('express');
const app = express();
const sequelize = require('./database'); // Import your Sequelize database configuration

// Import your models
const Event = require('./models/Event');
const User = require('./models/User');

// Import required libraries
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Set up middleware
app.use(express.json());

// API routes
app.post('/events', async (req, res) => {
  try {
    const { title, start, end, description, userId } = req.body;
    const event = await Event.create({ title, start, end, description, userId });
    res.status(201).json(event);

    // Schedule a notification for the event start time
    const sendNotification = cron.schedule(start, () => {
      // Send notification logic here (e.g., using Nodemailer)
    });
    sendNotification.start();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});