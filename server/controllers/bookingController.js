const db = require("../config/db");

const parseNumber = (value) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const isPositiveInteger = (value) => {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0;
};

const createBooking = (req, res) => {

  const { event_id, name, email, mobile, tickets, ticket_category, total_amount } = req.body;

  if (!event_id || !name || !email || !mobile || !tickets || !ticket_category) {
    return res.status(400).json({ message: "Event, name, email, mobile, ticket quantity, and ticket category are required." });
  }

  if (!isPositiveInteger(tickets)) {
    return res.status(400).json({ message: "Ticket quantity must be a positive number." });
  }

  const parsedTotalAmount = parseNumber(total_amount);

  const query =
    "INSERT INTO bookings (event_id, name, email, mobile, tickets, ticket_category, total_amount, booking_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'confirmed')";

  db.query(
    query,
    [event_id, name.trim(), email.trim(), mobile.trim(), tickets, ticket_category, parsedTotalAmount],
    (err, result) => {
      if (err) {
        if (err.errno === 1054) {
          const fallbackQuery =
            "INSERT INTO bookings (event_id, name, email, mobile, tickets) VALUES (?, ?, ?, ?, ?)";

          db.query(
            fallbackQuery,
            [event_id, name.trim(), email.trim(), mobile.trim(), tickets],
            (fallbackErr, fallbackResult) => {
              if (fallbackErr) {
                res.status(500).json(fallbackErr);
              } else {
                res.status(201).json({
                  message: "Booking Successful",
                  bookingId: fallbackResult.insertId,
                });
              }
            }
          );
          return;
        }

        res.status(500).json(err);
      } else {
        res.status(201).json({
          message: "Booking Successful",
          bookingId: result.insertId,
        });
      }
    }
  );
};

const getBookings = (req, res) => {

  const query = "SELECT * FROM bookings";

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  createBooking,
  getBookings,
};