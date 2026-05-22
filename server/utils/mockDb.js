const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "..", "data", "mock-db.json");

const defaultState = {
  events: [],
  bookings: [],
  eventId: 1,
  bookingId: 1,
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const ensureStore = () => {
  const directoryPath = path.dirname(dataFilePath);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultState, null, 2), "utf8");
  }
};

const readState = () => {
  ensureStore();

  try {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    const parsed = JSON.parse(raw);

    return {
      events: Array.isArray(parsed.events) ? parsed.events : [],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      eventId: Number.isInteger(parsed.eventId) ? parsed.eventId : 1,
      bookingId: Number.isInteger(parsed.bookingId) ? parsed.bookingId : 1,
    };
  } catch {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultState, null, 2), "utf8");
    return clone(defaultState);
  }
};

const nextId = (records) => {
  const highestId = records.reduce((maxId, record) => {
    const recordId = Number(record.id);
    return Number.isFinite(recordId) && recordId > maxId ? recordId : maxId;
  }, 0);

  return highestId + 1;
};

const persistState = (state) => {
  const normalizedState = {
    events: state.events || [],
    bookings: state.bookings || [],
    eventId: Math.max(Number(state.eventId) || 1, nextId(state.events || [])),
    bookingId: Math.max(Number(state.bookingId) || 1, nextId(state.bookings || [])),
  };

  fs.writeFileSync(dataFilePath, JSON.stringify(normalizedState, null, 2), "utf8");
  return normalizedState;
};

const readEvent = (event) => ({ ...event });

const getEvents = () => clone(readState().events);

const getEventById = (id) => {
  const state = readState();
  const event = state.events.find((record) => String(record.id) === String(id));
  return event ? readEvent(event) : null;
};

const createEvent = (payload) => {
  const state = readState();
  const event = {
    id: state.eventId,
    title: payload.title,
    category: payload.category,
    date: payload.date,
    image: payload.image,
    img: payload.image,
    description: payload.description,
    location: payload.location || "",
    vip_price: payload.vip_price ?? 0,
    standard_price: payload.standard_price ?? 0,
    total_seats: payload.total_seats ?? 100,
    available_seats: payload.available_seats ?? payload.total_seats ?? 100,
  };

  state.events.push(event);
  state.eventId += 1;
  persistState(state);

  return readEvent(event);
};

const updateEvent = (id, payload) => {
  const state = readState();
  const eventIndex = state.events.findIndex((record) => String(record.id) === String(id));

  if (eventIndex === -1) {
    return null;
  }

  const existingEvent = state.events[eventIndex];
  const nextTotalSeats = Number.isFinite(Number(payload.total_seats))
    ? Number(payload.total_seats)
    : existingEvent.total_seats ?? 100;

  const nextAvailableSeats = Number.isFinite(Number(payload.available_seats))
    ? Number(payload.available_seats)
    : existingEvent.available_seats ?? nextTotalSeats;

  const updatedEvent = {
    ...existingEvent,
    title: payload.title,
    category: payload.category,
    date: payload.date,
    image: payload.image,
    img: payload.image,
    description: payload.description,
    location: payload.location || "",
    vip_price: payload.vip_price ?? existingEvent.vip_price ?? 0,
    standard_price: payload.standard_price ?? existingEvent.standard_price ?? 0,
    total_seats: nextTotalSeats,
    available_seats: Math.min(nextAvailableSeats, nextTotalSeats),
  };

  state.events[eventIndex] = updatedEvent;
  persistState(state);

  return readEvent(updatedEvent);
};

const deleteEvent = (id) => {
  const state = readState();
  const beforeCount = state.events.length;
  state.events = state.events.filter((record) => String(record.id) !== String(id));

  if (state.events.length === beforeCount) {
    return 0;
  }

  persistState(state);
  return 1;
};

const getBookings = () => clone(readState().bookings);

const resolveBookingPrice = (event, ticketCategory) => {
  if (ticketCategory === "vip") {
    return Number(event.vip_price ?? event.standard_price ?? 0);
  }

  return Number(event.standard_price ?? event.vip_price ?? 0);
};

const createBooking = (payload) => {
  const state = readState();
  const eventIndex = state.events.findIndex((record) => String(record.id) === String(payload.event_id));

  if (eventIndex === -1) {
    return { error: { status: 404, message: "Event not found." } };
  }

  const event = state.events[eventIndex];
  const tickets = Number(payload.tickets);

  if (!Number.isInteger(tickets) || tickets <= 0) {
    return { error: { status: 400, message: "Ticket quantity must be a positive number." } };
  }

  const availableSeats = Number(event.available_seats ?? 0);

  if (tickets > availableSeats) {
    return { error: { status: 400, message: "Not enough seats available." } };
  }

  const ticketCategory = payload.ticket_category || "standard";
  const derivedPrice = resolveBookingPrice(event, ticketCategory);
  const numericTotalAmount = Number(payload.total_amount);
  const totalAmount = Number.isFinite(numericTotalAmount) ? numericTotalAmount : derivedPrice * tickets;

  const booking = {
    id: state.bookingId,
    event_id: Number(payload.event_id),
    name: payload.name,
    email: payload.email,
    mobile: payload.mobile,
    tickets,
    ticket_category: ticketCategory,
    total_amount: totalAmount,
    booking_date: new Date().toISOString(),
    status: "confirmed",
  };

  state.bookings.push(booking);
  state.bookingId += 1;
  state.events[eventIndex] = {
    ...event,
    available_seats: Math.max(availableSeats - tickets, 0),
  };
  persistState(state);

  return { booking: clone(booking), event: readEvent(state.events[eventIndex]) };
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getBookings,
  createBooking,
};