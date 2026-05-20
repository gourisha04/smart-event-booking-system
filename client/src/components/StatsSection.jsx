import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ end, duration = 3 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const tickInterval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      setValue(Math.round(end * progress));

      if (progress >= 1) {
        window.clearInterval(tickInterval);
      }
    }, 16);

    return () => window.clearInterval(tickInterval);
  }, [end, duration]);

  return value;
};

const stats = [
  {
    number: 500,
    label: "Events Hosted",
  },

  {
    number: 12000,
    label: "Tickets Booked",
  },

  {
    number: 150,
    label: "Partner Brands",
  },

  {
    number: 98,
    label: "Customer Satisfaction",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-black py-32 px-6">

      <div className="max-w-[1400px] mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-black text-white mb-24"
        >
          Trusted By Thousands
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-10">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="border border-white/10 rounded-[30px] p-10 bg-zinc-900/40 backdrop-blur-lg"
            >

              <h3 className="text-6xl font-black text-white">
                <AnimatedNumber end={item.number} duration={3} />
                +
              </h3>

              <p className="text-gray-400 mt-4 text-lg">
                {item.label}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default StatsSection;