const jwt = require('jsonwebtoken');
const sendEmail = require("./emailSender");
const Event = require('../models/events');

const getEvent = async () => {
    return await Event.find();
};

const createEvent = async (eventData, user) => {
    if (user.role !== 'organizer') {
        throw new Error('Not authorized');
    }
    const newEvent = new Event({
        date: eventData.date,
        time: eventData.time,
        description: eventData.description,
        participants: []
    });
    newEvent.save();
    return newEvent;
};

const updateEvent = async (eventId, eventData, user) => {
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new Error('Event not found');
    }
    if (user.role !== 'organizer') {
        throw new Error('Not authorized');
    }
    event.time = eventData.time;
    event.date = eventData.date;
    event.description = eventData.description;
    event.save();
    return event;
};

const deleteEvent = async (eventId, user) => {
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new Error('Event not found');
    }
    if (user.role !== 'organizer') {
        throw new Error('Not authorized');
    }
    await Event.deleteOne({ _id: eventId });
};

const registerForEvent = async (eventId, user) => {
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
        throw new Error('Event not found');
    }
    if (event.participants.includes(user.id)) {
        throw new Error('User already registered for this event');
    }
    event.participants.push(user.id);
    sendEmail(user.email);
    //sendEmail("mayameena147@gmail.com");
};

module.exports = { getEvent, createEvent, updateEvent, deleteEvent, registerForEvent}