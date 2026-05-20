# Smart Event Booking System

Full-stack event booking app with a React frontend, Node/Express API, and MySQL database. It includes event browsing, event details, ticket booking, and a simple admin dashboard for managing events and viewing bookings.

## Features

- Browse and filter events
- View event details with pricing and map embed
- Book tickets with live total calculation
- Admin dashboard for add, edit, and delete actions
- MySQL-backed events and bookings

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Axios, React Router DOM
- Backend: Node.js, Express, MySQL, Socket.IO

## Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ..\client
npm install
```

### 2. Configure the backend

Set MySQL credentials in `server/config/db.js`, or create a `.env` file in `server` with:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=smart_event_booking
```

### 3. Configure the frontend

Create `client/.env` if you want to point to a different API host:

```env
VITE_API_BASE_URL=http://localhost:5000
```

If you do not set this variable, the app uses `http://localhost:5000`.

### 4. Run the project

```bash
# backend
cd server
npm run dev

# frontend
cd ..\client
npm run dev -- --host
```

## Database

Import `server/event_booking.sql` into MySQL to create or update the required tables.

## Notes

- Admin login is currently a simple client-side demo login.
- The backend exposes event and booking APIs for the frontend.
- If you deploy the app, set `VITE_API_BASE_URL` to your live backend URL.