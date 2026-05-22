const {
  getEvents: readEvents,
  getEventById,
  createEvent: insertEvent,
  updateEvent: updateEventById,
  deleteEvent: removeEvent,
} = require("../utils/mockDb");

const parseNumber = (value) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const hasRequiredEventFields = (body) => {
  return Boolean(
    body.title &&
    body.title.trim() &&
    body.category &&
    body.category.trim() &&
    body.date &&
    body.image &&
    body.image.trim() &&
    body.description &&
    body.description.trim()
  );
};

const getEvents = (req, res) => {
  res.status(200).json(readEvents());
};

const getSingleEvent = (req, res) => {
  const { id } = req.params;
  res.status(200).json(getEventById(id));
};

const createEvent = (req, res) => {
  const { title, category, date, image, img, description, location, vip_price, standard_price, total_seats, available_seats } = req.body;

  if (!hasRequiredEventFields(req.body)) {
    return res.status(400).json({ message: "Title, category, date, image, and description are required." });
  }

  const parsedVipPrice = parseNumber(vip_price);
  const parsedStandardPrice = parseNumber(standard_price);
  const parsedTotalSeats = parseNumber(total_seats);
  const parsedAvailableSeats = parseNumber(available_seats);
  const eventImage = (image || img || "").trim();
  const totalSeatsValue = parsedTotalSeats ?? parsedAvailableSeats ?? 100;
  const availableSeatsValue = parsedAvailableSeats ?? totalSeatsValue;

  if (!eventImage) {
    return res.status(400).json({ message: "Image is required." });
  }

  const createdEvent = insertEvent({
    title: title.trim(),
    category: category.trim(),
    date,
    image: eventImage,
    description: description.trim(),
    location: location ? location.trim() : "",
    vip_price: parsedVipPrice,
    standard_price: parsedStandardPrice,
    total_seats: totalSeatsValue,
    available_seats: availableSeatsValue,
  });

  res.status(201).json({
    message: "Event created successfully",
    eventId: createdEvent.id,
  });
};

const updateEvent = (req, res) => {
  const { id } = req.params;
  const { title, category, date, image, img, description, location, vip_price, standard_price, total_seats, available_seats } = req.body;

  if (!hasRequiredEventFields(req.body)) {
    return res.status(400).json({ message: "Title, category, date, image, and description are required." });
  }

  const parsedVipPrice = parseNumber(vip_price);
  const parsedStandardPrice = parseNumber(standard_price);
  const parsedTotalSeats = parseNumber(total_seats);
  const parsedAvailableSeats = parseNumber(available_seats);
  const eventImage = (image || img || "").trim();

  if (!eventImage) {
    return res.status(400).json({ message: "Image is required." });
  }

  const updatedEvent = updateEventById(id, {
    title: title.trim(),
    category: category.trim(),
    date,
    image: eventImage,
    description: description.trim(),
    location: location ? location.trim() : "",
    vip_price: parsedVipPrice,
    standard_price: parsedStandardPrice,
    total_seats: Number.isFinite(parsedTotalSeats) ? parsedTotalSeats : undefined,
    available_seats: Number.isFinite(parsedAvailableSeats) ? parsedAvailableSeats : undefined,
  });

  if (!updatedEvent) {
    return res.status(200).json({
      message: "Event updated successfully",
      affectedRows: 0,
    });
  }

  res.status(200).json({
    message: "Event updated successfully",
    affectedRows: 1,
  });
};

const deleteEvent = (req, res) => {
  const { id } = req.params;

  const affectedRows = removeEvent(id);

  res.status(200).json({
    message: "Event deleted successfully",
    affectedRows,
  });
};

module.exports = {
  getEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};