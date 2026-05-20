const express = require("express");
const router = express.Router();

const {
  getEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", getEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

router.get("/:id", getSingleEvent);

module.exports = router;