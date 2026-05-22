import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventCard = ({ id, title, date, category, image, availableSeats, totalSeats }) => {
      return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -14, scale: 1.03 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      className="group relative overflow-hidden rounded-[28px] sm:rounded-[34px] border border-white/10 bg-white/5 shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
    >

      <div className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[34px] bg-gradient-to-br from-white/12 via-transparent to-cyan-400/10 opacity-0 transition duration-500 group-hover:opacity-100"></div>

      <div className="pointer-events-none absolute -inset-px rounded-[28px] sm:rounded-[34px] bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-40 blur-xl transition duration-500 group-hover:opacity-75"></div>

      <div className="relative h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden">

        <img
          src={image || "/default-event.svg"}
          alt={title}
          className="w-full h-full object-cover transition duration-700 ease-out will-change-transform group-hover:scale-115"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-cyan-400/10"></div>
      </div>

      <div className="absolute top-4 right-4 z-10 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-white shadow-lg backdrop-blur-xl">
        {category}
      </div>

      <div className="absolute top-4 left-4 z-10 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-[11px] sm:text-xs font-medium text-emerald-100 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        {availableSeats} / {totalSeats} Seats Left
      </div>

      <div className="absolute bottom-0 z-10 w-full p-5 sm:p-8">

        <div className="mb-4 h-px w-20 bg-gradient-to-r from-cyan-300 via-white/70 to-transparent opacity-80"></div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight break-words drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
          {title}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-300/90">
          {date}
        </p>

        <Link to={`/event/${id}`}>
          <button className="mt-5 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/95 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-black shadow-[0_10px_30px_rgba(255,255,255,0.16)] transition duration-300 group-hover:translate-y-[-1px] group-hover:shadow-[0_18px_40px_rgba(255,255,255,0.22)]">
            View Details
          </button>
        </Link>

      </div>

    </motion.div>
  );
};

export default EventCard;