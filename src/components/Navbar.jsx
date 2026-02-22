import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  /* AUTO CLOSE FUNCTION */
  const closeMenu = () => setMobileOpen(false);

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    if (isHome) window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const textColor = isHome && !isScrolled ? "text-white" : "text-black";
  const hoverColor = isHome && !isScrolled ? "hover:text-orange-400" : "hover:text-orange-600";

  const navbarBg = isHome
    ? isScrolled
      ? "bg-white/80 backdrop-blur-xl shadow-xl"
      : "bg-transparent"
    : "bg-white shadow-xl";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="container h-20 mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" onClick={closeMenu} className="flex items-center">
          <img
            src="/logo.png"
            alt="UNEX"
            className="h-24 md:h-28 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className={`hidden md:flex items-center space-x-12 font-archivo font-medium ${textColor}`}>

          <NavItem to="/" label="Home" hoverColor={hoverColor} />
          <NavItem to="/about" label="About" hoverColor={hoverColor} />
          <NavItem to="/services" label="Services" hoverColor={hoverColor} />
          <NavItem to="/track" label="Track Shipment" hoverColor={hoverColor} />
          <NavItem to="/contact" label="Contact" hoverColor={hoverColor} />

          {/* SUPPORT DROPDOWN */}
          <div className="relative group cursor-pointer">
            <div className={`flex items-center ${hoverColor}`}>
              Support <ChevronDown size={16} className="ml-1" />
            </div>
            <div className="absolute left-0 mt-3 w-48 bg-white text-black rounded-xl shadow-lg
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <DropdownLink to="/support/documents" label="Documents" />
              <DropdownLink to="/support/prohibited-items" label="Prohibited Items" />
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/quote"
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-orange-400 transition"
          >
            Get a Quote
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className={`md:hidden ${textColor}`} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="bg-white/95 text-black px-6 py-4 space-y-4 md:hidden backdrop-blur-lg">

          <MobileLink to="/" label="Home" onClick={closeMenu} />
          <MobileLink to="/about" label="About" onClick={closeMenu} />
          <MobileLink to="/services" label="Services" onClick={closeMenu} />
          <MobileLink to="/track" label="Track Shipment" onClick={closeMenu} />
          <MobileLink to="/contact" label="Contact" onClick={closeMenu} />

          {/* SUPPORT ACCORDION */}
          <div>
            <button onClick={() => setSupportOpen(!supportOpen)} className="flex justify-between w-full">
              <span>Support</span>
              <ChevronDown size={18} className={`transition ${supportOpen ? "rotate-180" : ""}`} />
            </button>

            {supportOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <MobileLink to="/support/documents" label="Documents" onClick={closeMenu} />
                <MobileLink to="/support/prohibited-items" label="Prohibited Items" onClick={closeMenu} />
              </div>
            )}
          </div>

          <Link
            to="/quote"
            onClick={closeMenu}
            className="block bg-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-orange-400"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}

/* COMPONENTS */
function NavItem({ to, label, hoverColor }) {
  return <Link to={to} className={`relative ${hoverColor}`}>{label}</Link>;
}

function DropdownLink({ to, label }) {
  return <Link to={to} className="block px-4 py-2 hover:bg-gray-100">{label}</Link>;
}

function MobileLink({ to, label, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="block hover:text-orange-500">
      {label}
    </Link>
  );
}