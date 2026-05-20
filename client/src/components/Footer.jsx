import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-20 px-6">

      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-16">

        <div>
          <h2 className="text-4xl font-black text-white">
            EVENTIX
          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed">
            Premium event booking platform delivering immersive
            digital experiences for concerts, conferences,
            and community events.
          </p>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-6">
            Navigation
          </h3>

          <ul className="space-y-4 text-gray-400">
            <li>Home</li>
            <li>Events</li>
            <li>Bookings</li>
            <li>Admin</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-6">
            Contact
          </h3>

          <ul className="space-y-4 text-gray-400">
            <li>support@eventix.com</li>
            <li>+91 9876543210</li>
            <li>Mumbai, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-6">
            Follow Us
          </h3>

          <div className="flex gap-6 text-2xl text-white">

            <FaInstagram className="cursor-pointer hover:scale-110 transition" />

            <FaTwitter className="cursor-pointer hover:scale-110 transition" />

            <FaLinkedin className="cursor-pointer hover:scale-110 transition" />

          </div>
        </div>

      </div>

      <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500">
        © 2026 EVENTIX. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;