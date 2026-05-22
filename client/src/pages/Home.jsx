import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import ParallaxSection from "../components/ParallaxSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config/api";
import { fallbackEvents } from "../utils/demoData";

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setEvents(fallbackEvents);
        setError("");
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
      Loading Events...
    </div>
  );
}

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-6 text-2xl text-red-400">
        {error}
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

        {events.length > 0 ? (
          <Reveal>
            <div className="grid md:grid-cols-3 gap-8">

              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  category={event.category}
                  image={event.image || event.img}
                />
              ))}

            </div>
          </Reveal>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-gray-300">
            No events available yet.
          </div>
        )}

      </section>

      <ParallaxSection />

      <StatsSection />

      <Footer />

    </div>
  );
};

export default Home;