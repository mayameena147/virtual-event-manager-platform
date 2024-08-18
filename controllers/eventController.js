const eventService = require('./../services/eventService');

const getEvent = async (req, res) => {
    try {
        const event = await eventService.getEvent();
        res.status(201).json({ event });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body, req.user);
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await eventService.updateEvent(req.params.id, req.body, req.user);
        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        await eventService.deleteEvent(req.params.id, req.user);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const registerForEvent = async (req, res) => {
    try {
        await eventService.registerForEvent(req.params.id, req.user);
        res.status(200).json({ message: 'Registered for event successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { getEvent, createEvent, updateEvent, deleteEvent, registerForEvent }