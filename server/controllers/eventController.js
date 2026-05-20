const db = require("../config/db");

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
  const query = "SELECT * FROM events";

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

const getSingleEvent = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM events WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result[0]);
    }
  });
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
  const totalSeatsValue = parsedTotalSeats ?? parsedAvailableSeats ?? 100;
  const availableSeatsValue = parsedAvailableSeats ?? totalSeatsValue;
  const eventImage = (image || img || "").trim();

  if (!eventImage) {
    return res.status(400).json({ message: "Image is required." });
  }

  const query =
    "INSERT INTO events (title, category, date, image, description, location, vip_price, standard_price, total_seats, available_seats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      title.trim(),
      category.trim(),
      date,
      eventImage,
      description.trim(),
      location ? location.trim() : "",
      parsedVipPrice,
      parsedStandardPrice,
      totalSeatsValue,
      availableSeatsValue,
    ],
    (err, result) => {
      if (err) {
        if (err.errno === 1054) {
          const fallbackQuery =
            "INSERT INTO events (title, category, date, image, description) VALUES (?, ?, ?, ?, ?)";

          db.query(
            fallbackQuery,
            [title.trim(), category.trim(), date, eventImage, description.trim()],
            (fallbackErr, fallbackResult) => {
              if (fallbackErr) {
                res.status(500).json(fallbackErr);
              } else {
                res.status(201).json({
                  message: "Event created successfully",
                  eventId: fallbackResult.insertId,
                });
              }
            }
          );
          return;
        }

        res.status(500).json(err);
      } else {
        res.status(201).json({
          message: "Event created successfully",
          eventId: result.insertId,
        });
      }
    }
  );
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
  const totalSeatsValue = parsedTotalSeats ?? parsedAvailableSeats ?? 100;
  const availableSeatsValue = parsedAvailableSeats ?? totalSeatsValue;
  const eventImage = (image || img || "").trim();

  if (!eventImage) {
    return res.status(400).json({ message: "Image is required." });
  }

  const query =
    "UPDATE events SET title = ?, category = ?, date = ?, image = ?, description = ?, location = ?, vip_price = ?, standard_price = ?, total_seats = ?, available_seats = ? WHERE id = ?";

  db.query(
    query,
    [
      title.trim(),
      category.trim(),
      date,
      eventImage,
      description.trim(),
      location ? location.trim() : "",
      parsedVipPrice,
      parsedStandardPrice,
      totalSeatsValue,
      availableSeatsValue,
      id,
    ],
    (err, result) => {
      if (err) {
        if (err.errno === 1054) {
          const fallbackQuery =
            "UPDATE events SET title = ?, category = ?, date = ?, image = ?, description = ? WHERE id = ?";

          db.query(
            fallbackQuery,
            [title.trim(), category.trim(), date, eventImage, description.trim(), id],
            (fallbackErr, fallbackResult) => {
              if (fallbackErr) {
                res.status(500).json(fallbackErr);
              } else {
                res.status(200).json({
                  message: "Event updated successfully",
                  affectedRows: fallbackResult.affectedRows,
                });
              }
            }
          );
          return;
        }

        res.status(500).json(err);
      } else {
        res.status(200).json({
          message: "Event updated successfully",
          affectedRows: result.affectedRows,
        });
      }
    }
  );
};

const deleteEvent = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM events WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        message: "Event deleted successfully",
        affectedRows: result.affectedRows,
      });
    }
  });
};

module.exports = {
  getEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};