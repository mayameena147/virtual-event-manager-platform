const mongoose = require("mongoose");

const events = new mongoose.Schema([
    {
        description: String,
        date: String,
        time: String,
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
]);

const Events = mongoose.model("events", events);

module.exports = Events;