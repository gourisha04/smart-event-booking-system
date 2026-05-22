const {
  getBookings: readBookings,
  createBooking: insertBooking,
} = require("../utils/mockDb");

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
  const bookingResult = insertBooking({
    event_id,
    name: name.trim(),
    email: email.trim(),
    mobile: mobile.trim(),
    tickets,
    ticket_category,
    total_amount: parsedTotalAmount,
  });

  if (bookingResult.error) {
    return res.status(bookingResult.error.status).json({ message: bookingResult.error.message });
  }

  res.status(201).json({
    message: "Booking Successful",
    bookingId: bookingResult.booking.id,
    event: bookingResult.event,
  });
};

const getBookings = (req, res) => {
  res.status(200).json(readBookings());
};

module.exports = {
  createBooking,
  getBookings,
};