import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventCard = ({ id, title, date, category, image, availableSeats, totalSeats }) => {
      return (
    <motion.div
      whileHover={{
  y: -10,
  scale: 1.02,
}}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-[24px] sm:rounded-[30px] bg-zinc-900 border border-white/10"
    >

      <div className="h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden">

        <img
          src={image || "/default-event.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

      <div className="absolute top-4 right-4 bg-black/80 border border-white/10 text-white text-xs sm:text-sm px-3 py-2 rounded-full backdrop-blur-md">
        {availableSeats} / {totalSeats} Seats Left
      </div>

      <div className="absolute bottom-0 p-5 sm:p-8 w-full">

        <p className="text-[10px] sm:text-sm uppercase tracking-widest text-gray-300">
          {category}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-2 leading-tight break-words">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-gray-300 mt-3">
          {date}
        </p>

       <Link to={`/event/${id}`}>
  <button className="mt-5 sm:mt-6 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base">
    View Details
  </button>
</Link>

      </div>

    </motion.div>
  );
};

export default EventCard;