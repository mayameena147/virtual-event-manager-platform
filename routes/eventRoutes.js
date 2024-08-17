const express = require("express");
const eventRouter = express.Router();
const { createEvent, updateEvent, deleteEvent, registerForEvent } = require("../controllers/eventController");
const authenticate = require("./../middlewares/auth");

eventRouter.post("/", authenticate, createEvent);
eventRouter.put("/:id", authenticate, updateEvent);
eventRouter.delete("/:id", authenticate, deleteEvent);
eventRouter.post("/:id/register", authenticate, registerForEvent);

module.exports = eventRouter;