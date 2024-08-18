const express = require("express");
const eventRouter = express.Router();
const { getEvent, createEvent, updateEvent, deleteEvent, registerForEvent } = require("../controllers/eventController");
const authenticate = require("./../middlewares/auth");

eventRouter.get("/", authenticate, getEvent);
eventRouter.post("/", authenticate, createEvent);
eventRouter.put("/:id", authenticate, updateEvent);
eventRouter.delete("/:id", authenticate, deleteEvent);
eventRouter.post("/:id/register", authenticate, registerForEvent);

module.exports = eventRouter;