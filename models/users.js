const mongoose = require("mongoose");

const users = new mongoose.Schema([
    {
        name: String,
        password: String,
        email: String,
        role: String
    }
]);

const Users = mongoose.model("users", users);

module.exports = Users;