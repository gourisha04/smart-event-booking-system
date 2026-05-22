import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config/api";
import { getFallbackEventById } from "../utils/demoData";

const EventDetails = () => {

  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
        setEvent(getFallbackEventById(id));
      });
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      <div className="relative h-[56vh] sm:h-[62vh] md:h-[70vh] overflow-hidden">

        <img
          src={event.image || event.img}
          alt={event.title}
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute bottom-10 sm:bottom-14 md:bottom-20 left-4 sm:left-8 md:left-10 max-w-[90vw] sm:max-w-3xl">

          <p className="uppercase tracking-[3px] sm:tracking-[5px] text-xs sm:text-sm text-gray-300">
            {event.category}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mt-3 sm:mt-4 leading-[0.95] break-words">
            {event.title}
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300">
            {event.date}
          </p>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-24">

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-10">
              About Event
            </h2>

            <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl">
              {event.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-3xl">
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">
                  Location
                </p>
                <p className="text-white text-lg sm:text-xl font-semibold break-words">
                  {event.location || "Location not added yet"}
                </p>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">
                  Pricing
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  VIP: ₹{event.vip_price ?? 0}
                </p>
                <p className="text-gray-300 text-sm sm:text-base mt-1">
                  Standard: ₹{event.standard_price ?? 0}
                </p>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-5 sm:p-6 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">
                  Available Seats
                </p>
                <p className="text-white text-lg sm:text-xl font-semibold">
                  {(event.available_seats ?? 100)} / {(event.total_seats ?? 100)} Seats Left
                </p>
              </div>
            </div>

            <Link to={`/booking/${event.id}`}>
              <button className="mt-8 sm:mt-12 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base">
                Proceed To Booking
              </button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-white/10 rounded-[30px] p-4 sm:p-6"
          >
            <div className="rounded-[24px] overflow-hidden bg-black">
              <iframe
                title="Event location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(event.location || event.title)}&output=embed`}
                className="w-full h-[320px] sm:h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default EventDetails;