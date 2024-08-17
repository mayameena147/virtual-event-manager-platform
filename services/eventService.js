const jwt = require('jsonwebtoken');
const sendEmail = require("./emailSender");
const { getMaxListeners } = require('../models/events');

let events = [{
    id: 1,
    date: '2024-08-30',
    time: '10:00',
    description: 'Sample Event',
    participants: []
}];
let users = [];

const findEventById = (id) => events.find(event => event.id === id);
const findUserById = (id) => users.find(user => user.id === id);

// Create a new event
const createEvent = async (eventData, user) => {
    if (user.role !== 'organizer') {
        throw new Error('Not authorized');
    }
    const newEvent = {
        id: events.length + 1,
        ...eventData,
        participants: []
    };
    events.push(newEvent);
    return newEvent;
};

// Update an existing event
const updateEvent = async (eventId, eventData, user) => {
    const event = findEventById(parseInt(eventId));
    if (!event) {
        throw new Error('Event not found');
    }
    if (user.role !== 'organizer') {
        throw new Error('Not authorized');
    }
    Object.assign(event, eventData);
    return event;
};

// Delete an event
const deleteEvent = async (eventId, user) => {
    const eventIndex = events.findIndex(event => event.id === parseInt(eventId));
    if (eventIndex === -1) {
        throw new Error('Event not found');
    }
    if (user.role !== 'organizer') {
        throw new Error('Not authorized');
    }
    events.splice(eventIndex, 1);
};

// Register a user for an event
const registerForEvent = async (eventId, user) => {
    const event = findEventById(parseInt(eventId));
    if (!event) {
        throw new Error('Event not found');
    }
    if (event.participants.includes(user.id)) {
        throw new Error('User already registered for this event');
    }
    event.participants.push(user.id);
    //sendEmail(user.email);
    sendEmail("mayameena147@gmail.com");
};

module.exports = { createEvent, updateEvent, deleteEvent, registerForEvent}