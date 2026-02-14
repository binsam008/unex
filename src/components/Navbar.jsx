import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-yellow-400">
        UNEX
      </h1>

      <div className="space-x-6 hidden md:flex items-center">

        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>

        <Link to="/about" className="hover:text-yellow-400">
          About
        </Link>

        <Link to="/services" className="hover:text-yellow-400">
          Services
        </Link>

        {/* ✅ FIXED SUPPORT DROPDOWN */}
        <div className="relative group">

          <button className="hover:text-yellow-400">
            Support ▾
          </button>

          <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all duration-200">

            <Link
              to="/support/documents"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Documents
            </Link>

            <Link
              to="/support/prohibited-items"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Prohibited Items
            </Link>

          </div>
        </div>

        <Link to="/track" className="hover:text-yellow-400">
          Track
        </Link>

        <Link to="/contact" className="hover:text-yellow-400">
          Contact
        </Link>
        <Link
  to="/quote"
  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
>
  Get a Quote
</Link>


      </div>
    </nav>
  );
}
