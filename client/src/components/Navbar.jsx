import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">

        <Link
          to="/"
          className="text-2xl sm:text-3xl font-black text-white shrink-0"
        >
          EVENTIX
        </Link>

        <div className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-300 font-medium">

          <Link
            to="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/admin"
            className="hover:text-white transition"
          >
            Admin
          </Link>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;