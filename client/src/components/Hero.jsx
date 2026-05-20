import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28">

      {/* Glow Effect */}
      <div className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-purple-500/20 blur-[90px] sm:blur-[120px] rounded-full top-20 left-1/2 -translate-x-1/2"></div>

      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl sm:text-6xl md:text-[10rem] font-black uppercase text-center leading-[0.95] tracking-tight max-w-[11ch]"
      >
        Smart <br /> Events
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 sm:mt-8 text-sm sm:text-lg text-gray-400 text-center max-w-md sm:max-w-xl px-2"
      >
        Experience next-generation event booking with immersive UI,
        premium animations, and real-time seat management.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-8 sm:mt-10 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base"
      >
        Explore Events
      </motion.button>

    </section>
  );
};

export default Hero;