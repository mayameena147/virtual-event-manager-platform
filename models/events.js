const mongoose = require("mongoose");

const events = new mongoose.Schema([
    {
        id: Number,
        description: String,
        date: String,
        time: String,
        participants: []
    }
]);

const Events = mongoose.model("events", events);

module.exports = Events;