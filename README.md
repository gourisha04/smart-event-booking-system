# Smart Event Booking System

A premium full-stack MERN-based Event Booking Platform with dynamic event management, booking system, admin dashboard, responsive UI, and MySQL integration.

---

## Features

### User Features
- Browse Events
- Dynamic Event Details
- Book Tickets
- Responsive Mobile UI
- Premium Animated Interface

### Admin Features
- Admin Login
- Add Events
- View Bookings
- Dashboard Analytics

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## Project Structure

smart_event_booking_system
│
├── client
│ ├── src
│ ├── components
│ ├── pages
│ └── utils
│
├── server
│ ├── config
│ ├── controllers
│ ├── routes
│ └── server.js

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd smart_event_booking_system
```

### Install Dependencies

```bash
cd server
npm install

cd ..\client
npm install
```

### Run Project

```bash
# Start backend
cd server
node server.js

# Start frontend
cd ..\client
npm run dev -- --host
```

### Database Setup

- Create the MySQL database named `smart_event_booking`.
- Make sure the `events` and `bookings` tables exist.
- Update the database credentials in `server/config/db.js` if needed.

### Database Migration Queries

Run these once to add the new event and booking fields without deleting data:

```sql
ALTER TABLE events
	ADD COLUMN location VARCHAR(255) NULL,
	ADD COLUMN vip_price DECIMAL(10,2) NULL DEFAULT 0,
	ADD COLUMN standard_price DECIMAL(10,2) NULL DEFAULT 0;

ALTER TABLE bookings
	ADD COLUMN ticket_category VARCHAR(20) NULL DEFAULT 'standard',
	ADD COLUMN total_amount DECIMAL(10,2) NULL DEFAULT 0;
```