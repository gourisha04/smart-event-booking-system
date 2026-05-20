import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import ParallaxSection from "../components/ParallaxSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.3:5000";

const Home = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!events.length) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
      Loading Events...
    </div>
  );
}
  return (
<div className="bg-black min-h-screen pt-24">
      <Navbar />

      <Hero />

      <Marquee />

      <section className="max-w-[1400px] mx-auto px-6 py-24">

        <Reveal>
          <h2 className="text-5xl font-bold text-white mb-16">
            Featured Events
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-3 gap-8">

            {events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                category={event.category}
                image={event.image}
              />
            ))}

          </div>
        </Reveal>

      </section>

      <ParallaxSection />

      <StatsSection />

      <Footer />

    </div>
  );
};

export default Home;