import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config/api";
import { fallbackBookings, fallbackEvents } from "../utils/demoData";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuthenticated") === "true";
  });
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    image: "",
    description: "",
    location: "",
    vip_price: "",
    standard_price: "",
    total_seats: "",
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (loginForm.username.trim() && loginForm.password.trim()) {
      localStorage.setItem("adminAuthenticated", "true");
      setIsAuthenticated(true);
      setLoginError("");
      setLoginForm({ username: "", password: "" });
    } else {
      setLoginError("Enter any demo credentials to access the dashboard.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
    setLoginForm({ username: "", password: "" });
    setLoginError("");
    setEvents([]);
    setBookings([]);
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
      setEvents(fallbackEvents);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const loadDashboardData = async () => {
        const [eventsResult, bookingsResult] = await Promise.allSettled([
          axios.get(`${API_BASE_URL}/api/events`),
          axios.get(`${API_BASE_URL}/api/bookings`),
        ]);

        if (eventsResult.status === "fulfilled") {
          setEvents(eventsResult.value.data);
        } else {
          console.error(eventsResult.reason);
          setEvents(fallbackEvents);
        }

        if (bookingsResult.status === "fulfilled") {
          setBookings(bookingsResult.value.data);
        } else {
          console.error(bookingsResult.reason);
          setBookings(fallbackBookings);
        }
      };

      void loadDashboardData();
    }
  }, [isAuthenticated]);

  const resetEventForm = () => {
    setFormData({
      title: "",
      category: "",
      date: "",
      image: "",
      description: "",
      location: "",
      vip_price: "",
      standard_price: "",
      total_seats: "",
    });
    setEditingEventId(null);
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event.id);
    setFormData({
      title: event.title || "",
      category: event.category || "",
      date: event.date || "",
      image: event.image || "",
      description: event.description || "",
      location: event.location || "",
      vip_price: event.vip_price ?? "",
      standard_price: event.standard_price ?? "",
      total_seats: event.total_seats ?? "",
    });
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmed = window.confirm("Delete this event permanently?");
    if (!confirmed) return;

    await axios.delete(`${API_BASE_URL}/api/events/${eventId}`);
    fetchEvents();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Event title is required.");
      return;
    }

    const payload = {
      ...formData,
      title: formData.title.trim(),
      category: formData.category.trim(),
      image: formData.image.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
    };

    if (editingEventId) {
      await axios.put(`${API_BASE_URL}/api/events/${editingEventId}`, payload);
      alert("Event Updated");
    } else {
      await axios.post(`${API_BASE_URL}/api/events`, payload);
      alert("Event Added");
    }

    resetEventForm();

    fetchEvents();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-16 sm:py-20 overflow-x-hidden flex items-center justify-center">
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            Admin Login
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mb-8">
            Enter your admin credentials to access the dashboard.
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <input
              type="text"
              name="username"
              placeholder="Admin Username"
              value={loginForm.username}
              onChange={handleLoginChange}
              required
              className="w-full bg-black border border-white/10 px-5 py-4 rounded-xl outline-none text-sm sm:text-base"
            />

            <input
              type="password"
              name="password"
              placeholder="Admin Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
              className="w-full bg-black border border-white/10 px-5 py-4 rounded-xl outline-none text-sm sm:text-base"
            />

            {loginError && (
              <p className="text-red-400 text-sm sm:text-base">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-white text-black px-6 py-4 rounded-xl font-bold text-sm sm:text-base"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-16 sm:py-20 overflow-x-hidden">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10 flex-col sm:flex-row">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            Admin Dashboard
          </h1>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-zinc-900 border border-white/10 text-white px-5 py-3 rounded-xl font-semibold text-sm sm:text-base w-full sm:w-auto"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-14 sm:mb-20">

          <div className="bg-zinc-900 p-6 sm:p-8 rounded-3xl">
            <h2 className="text-4xl sm:text-5xl font-black">
              {events.length}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-4">
              Total Events
            </p>
          </div>

          <div className="bg-zinc-900 p-6 sm:p-8 rounded-3xl">
            <h2 className="text-4xl sm:text-5xl font-black">
              {bookings.length}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-4">
              Total Bookings
            </p>
          </div>

          <div className="bg-zinc-900 p-6 sm:p-8 rounded-3xl">
            <h2 className="text-4xl sm:text-5xl font-black">
              ₹{bookings.length * 499}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-4">
              Revenue
            </p>
          </div>

        </div>

        <div className="bg-zinc-900 p-6 sm:p-10 rounded-3xl mb-14 sm:mb-20">

          <h2 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-10">
            {editingEventId ? "Edit Event" : "Add Event"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
            />

            <input
              type="text"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl h-40"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <input
                type="number"
                name="vip_price"
                min="0"
                placeholder="VIP Price"
                value={formData.vip_price}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
              />

              <input
                type="number"
                name="standard_price"
                min="0"
                placeholder="Standard Price"
                value={formData.standard_price}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
              />
            </div>

            <input
              type="number"
              name="total_seats"
              min="0"
              placeholder="Total Seats"
              value={formData.total_seats}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="bg-white text-black px-8 py-4 rounded-xl font-bold"
              >
                {editingEventId ? "Update Event" : "Add Event"}
              </button>

              {editingEventId && (
                <button
                  type="button"
                  onClick={resetEventForm}
                  className="bg-zinc-800 text-white px-8 py-4 rounded-xl font-bold border border-white/10"
                >
                  Cancel Edit
                </button>
              )}
            </div>

          </form>

        </div>

        <div className="bg-zinc-900 p-6 sm:p-10 rounded-3xl mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-10">
            Manage Events
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border border-white/10 rounded-3xl overflow-hidden bg-black"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image || event.img}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
                    {event.category}
                  </p>
                  <h3 className="text-2xl font-black break-words">{event.title}</h3>
                  <p className="text-gray-400 text-sm break-words">{event.location || "No location set"}</p>
                  <p className="text-gray-400 text-sm">Date: {event.date}</p>
                  <p className="text-gray-400 text-sm">VIP: ₹{event.vip_price ?? 0} | Standard: ₹{event.standard_price ?? 0}</p>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleEditEvent(event)}
                      className="flex-1 bg-white text-black px-4 py-3 rounded-xl font-bold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="flex-1 bg-red-500/90 text-white px-4 py-3 rounded-xl font-bold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 p-6 sm:p-10 rounded-3xl">

          <h2 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-10">
            Recent Bookings
          </h2>

          <div className="space-y-4 sm:space-y-6">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-white/10 p-5 sm:p-6 rounded-2xl"
              >

                <h3 className="text-lg sm:text-2xl font-bold break-words">
                  {booking.name}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 mt-2 break-words">
                  {booking.email}
                </p>

                <p className="text-sm sm:text-base text-gray-400 mt-2">
                  Tickets: {booking.tickets}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Admin;