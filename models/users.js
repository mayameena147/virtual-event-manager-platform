const mongoose = require("mongoose");

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['attendee', 'organizer'],
        default: 'attendee'
    }
   }
);

const Users = mongoose.model("users", users);

module.exports = Users;