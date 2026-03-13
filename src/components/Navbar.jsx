import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Scroll navbar behavior
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    if (isHome) window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  const bgClass =
    isHome && !scrolled ? "bg-white/40  backdrop-blur-xl" : "bg-transparent ";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" className="h-16 w-auto select-none" />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-semibold text-black">
          
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="About" />
          <NavItem to="/services" label="Services" />
          <NavItem to="/track" label="Track Shipment" />
          <NavItem to="/contact" label="Contact" />

          {/* DROPDOWN */}
          <div className="relative group cursor-pointer">
            <p className="flex items-center gap-1 hover:text-orange-600 transition">
              Support <ChevronDown size={16} />
            </p>

            <div className="absolute mt-3 bg-white shadow-xl rounded-xl w-48 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <DropdownLink to="/support/documents" label="Documents" />
              <DropdownLink to="/support/prohibited-items" label="Prohibited Items" />
            </div>
          </div>

          {/* CTA BUTTON */}
          <Link
            to="/quote"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
          >
            Get a Quote
          </Link>

        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="md:hidden bg-white shadow-xl px-6 py-4 space-y-4">
          
          <MobileLink to="/" label="Home" close={() => setOpenMenu(false)} />
          <MobileLink to="/about" label="About" close={() => setOpenMenu(false)} />
          <MobileLink to="/services" label="Services" close={() => setOpenMenu(false)} />
          <MobileLink to="/track" label="Track Shipment" close={() => setOpenMenu(false)} />
          <MobileLink to="/contact" label="Contact" close={() => setOpenMenu(false)} />

          {/* SUPPORT DROPDOWN (MOBILE) */}
          <div>
            <button
              onClick={() => setOpenSupport(!openSupport)}
              className="flex justify-between w-full font-semibold py-2"
            >
              Support
              <ChevronDown size={18} className={`${openSupport ? "rotate-180" : ""} transition`} />
            </button>

            {openSupport && (
              <div className="ml-4 space-y-2">
                <MobileLink to="/support/documents" label="Documents" close={() => setOpenMenu(false)} />
                <MobileLink to="/support/prohibited-items" label="Prohibited Items" close={() => setOpenMenu(false)} />
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            to="/quote"
            className="block bg-red-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}

/********* SUB COMPONENTS *********/

function NavItem({ to, label }) {
  return (
    <Link to={to} className="relative group hover:text-orange-600 transition">
      {label}
      {/* underline */}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function DropdownLink({ to, label }) {
  return (
    <Link to={to} className="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">
      {label}
    </Link>
  );
}

function MobileLink({ to, label, close }) {
  return (
    <Link to={to} onClick={close} className="block py-2 text-gray-900 hover:text-orange-600">
      {label}
    </Link>
  );
}