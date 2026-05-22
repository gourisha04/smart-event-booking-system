export const fallbackEvents = [
  {
    id: 1,
    title: "City Lights Music Fest",
    category: "Concert",
    date: "2026-06-12",
    image: "/default-event.svg",
    img: "/default-event.svg",
    description:
      "An open-air night concert featuring live bands, food stalls, and a rooftop after-party.",
    location: "Mumbai, India",
    vip_price: 2499,
    standard_price: 999,
    total_seats: 150,
    available_seats: 150,
  },
  {
    id: 2,
    title: "Future Founders Summit",
    category: "Conference",
    date: "2026-07-04",
    image: "/default-event.svg",
    img: "/default-event.svg",
    description:
      "A polished startup and innovation summit with keynote talks, panel sessions, and networking rooms.",
    location: "Bengaluru, India",
    vip_price: 3999,
    standard_price: 1499,
    total_seats: 240,
    available_seats: 196,
  },
  {
    id: 3,
    title: "Golden Street Food Carnival",
    category: "Festival",
    date: "2026-08-18",
    image: "/default-event.svg",
    img: "/default-event.svg",
    description:
      "A citywide evening food festival with live entertainment, tasting zones, and family-friendly activities.",
    location: "Delhi, India",
    vip_price: 1799,
    standard_price: 599,
    total_seats: 320,
    available_seats: 288,
  },
];

export const fallbackBookings = [];

export const getFallbackEventById = (id) => {
  const matchedEvent = fallbackEvents.find((event) => String(event.id) === String(id));
  return matchedEvent || fallbackEvents[0] || null;
};