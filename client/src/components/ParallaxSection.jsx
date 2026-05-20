import { motion } from "framer-motion";

const ParallaxSection = () => {
  return (
    <section className="relative h-[120vh] overflow-hidden bg-black">

      <motion.img
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
        alt="event"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-[9rem] font-black text-white uppercase leading-none"
        >
          Feel The <br /> Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-lg text-gray-300 max-w-2xl"
        >
          Discover immersive concerts, technology conferences,
          startup networking events, and unforgettable experiences
          crafted for the modern generation.
        </motion.p>

      </div>

    </section>
  );
};

export default ParallaxSection;