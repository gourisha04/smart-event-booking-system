import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { API_BASE_URL } from "../config/api";

const Booking = () => {

  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    tickets: 1,
    ticket_category: "standard",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const selectedPrice = useMemo(() => {
    if (!event) return 0;
    return formData.ticket_category === "vip"
      ? Number(event.vip_price || 0)
      : Number(event.standard_price || 0);
  }, [event, formData.ticket_category]);

  const totalAmount = useMemo(() => {
    return Number(formData.tickets || 0) * selectedPrice;
  }, [formData.tickets, selectedPrice]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "tickets" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || Number(formData.tickets) <= 0) {
      alert("Please fill all required fields with a valid ticket quantity.");
      return;
    }

    if (!formData.mobile.trim()) {
      alert("Please add a mobile number.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/bookings`, {
        event_id: id,
        ticket_category: formData.ticket_category,
        total_amount: totalAmount,
        ...formData,
      });

      setBookingSuccess(true);

      setFormData({
        name: "",
        email: "",
        mobile: "",
        tickets: 1,
        ticket_category: "standard",
      });

    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-20 overflow-x-hidden">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[30px] p-6 sm:p-10"
      >

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-10">
          Book Event
        </h1>

        {event && (
          <div className="mb-8 bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
              {event.category}
            </p>
            <h2 className="text-xl sm:text-2xl font-black mt-2">
              {event.title}
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              {event.location || "Location not added yet"}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
        {!bookingSuccess ? (
          <motion.form
            key="booking-form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 outline-none"
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 outline-none"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm text-gray-400 mb-2">Ticket Category</span>
                <select
                  name="ticket_category"
                  value={formData.ticket_category}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 outline-none"
                >
                  <option value="standard">Standard</option>
                  <option value="vip">VIP</option>
                </select>
              </label>

              <label className="block">
                <span className="block text-sm text-gray-400 mb-2">Quantity</span>
                <input
                  type="number"
                  name="tickets"
                  min="1"
                  value={formData.tickets}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 outline-none"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-black border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Price</p>
                <p className="text-xl font-black mt-2">₹{selectedPrice}</p>
              </div>
              <div className="bg-black border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Qty</p>
                <p className="text-xl font-black mt-2">{formData.tickets}</p>
              </div>
              <div className="bg-black border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Total</p>
                <p className="text-xl font-black mt-2">₹{totalAmount}</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg"
            >
              Confirm Booking
            </button>

          </motion.form>
        ) : (
          <motion.div
            key="booking-success"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="text-center py-10 relative overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mb-6 w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center"
            >
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-4xl"
              >
                ✓
              </motion.span>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute block w-2 h-2 rounded-full bg-white/80"
                  style={{
                    top: `${20 + (index % 4) * 12}%`,
                    left: `${15 + (index * 9) % 70}%`,
                  }}
                  animate={{ y: [0, -18, 0], opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.12 }}
                />
              ))}
            </div>

            <h2 className="text-3xl font-black">Booking Confirmed</h2>
            <p className="text-gray-400 mt-4">Your ticket request has been received successfully.</p>
          </motion.div>
        )}
        </AnimatePresence>

      </motion.div>

    </div>
  );
};

export default Booking;