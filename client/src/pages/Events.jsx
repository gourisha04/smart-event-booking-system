import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Reveal from "../components/Reveal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.3:5000";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((res) => {
        if (!isMounted) return;
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.log(err);
        setError("Unable to load events right now.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const uniqueLocations = Array.from(
    new Set(events.map((event) => (event.location || "").trim()).filter(Boolean))
  );

  const filteredEvents = events.filter((event) => {
    const matchesSearch = [event.title, event.category, event.location]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter
      ? (event.location || "").toLowerCase() === locationFilter.toLowerCase()
      : true;

    const matchesDate = dateFilter
      ? (event.date || "").toLowerCase().includes(dateFilter.toLowerCase())
      : true;

    return matchesSearch && matchesLocation && matchesDate;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-14"
          >
            <p className="text-sm uppercase tracking-[0.5em] text-gray-400 mb-4">
              Live Catalog
            </p>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight">
              Explore Events
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl leading-relaxed">
              Browse upcoming concerts, conferences, and experiences pulled
              directly from the booking system.
            </p>
          </motion.div>
        </Reveal>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events, categories, or locations"
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="Filter by date"
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />
        </div>

        {loading && (
          <div className="min-h-[40vh] flex items-center justify-center text-xl text-gray-300">
            Loading events...
          </div>
        )}

        {!loading && error && (
          <div className="min-h-[40vh] flex items-center justify-center text-xl text-red-400 text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <EventCard
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  category={event.category}
                  image={event.image || event.img}
                  availableSeats={event.available_seats ?? 100}
                  totalSeats={event.total_seats ?? 100}
                />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="min-h-[30vh] flex items-center justify-center text-xl text-gray-400">
            No events available yet.
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;