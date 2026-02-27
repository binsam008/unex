import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  /* SCROLL EFFECT */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    if (isHome) window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  const textColor = isHome && !scrolled ? "text-slate-800" : "text-gray-900";
  const hoverColor = isHome && !scrolled ? "hover:text-orange-300" : "hover:text-orange-600";

  const bgClass =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-white/90 backdrop-blur-xl shadow-md";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" className="h-16 w-auto" />
        </Link>

        {/* DESKTOP MENU */}
        <div className={`hidden md:flex items-center gap-10 text-sm font-semibold ${textColor}`}>
          <NavItem to="/" label="Home" hoverColor={hoverColor} />
          <NavItem to="/about" label="About" hoverColor={hoverColor} />
          <NavItem to="/services" label="Services" hoverColor={hoverColor} />
          <NavItem to="/track" label="Track" hoverColor={hoverColor} />
          <NavItem to="/contact" label="Contact" hoverColor={hoverColor} />

          {/* DROPDOWN */}
          <div className="relative group cursor-pointer">
            <p className={`flex items-center gap-1 ${hoverColor}`}>
              Support <ChevronDown size={16} />
            </p>
            <div className="absolute mt-3 bg-slate-800 shadow-xl rounded-xl w-48 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <DropdownLink to="/support/documents" label="Documents" />
              <DropdownLink to="/support/prohibited-items" label="Prohibited Items" />
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/quote"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 shadow-md"
          >
            Get a Quote
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button className={`md:hidden ${textColor}`} onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="md:hidden bg-white shadow-xl px-6 py-4 space-y-4">
          <MobileLink to="/" label="Home" close={() => setOpenMenu(false)} />
          <MobileLink to="/about" label="About" close={() => setOpenMenu(false)} />
          <MobileLink to="/services" label="Services" close={() => setOpenMenu(false)} />
          <MobileLink to="/track" label="Track" close={() => setOpenMenu(false)} />
          <MobileLink to="/contact" label="Contact" close={() => setOpenMenu(false)} />

          {/* MOBILE DROPDOWN */}
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
            className="block bg-orange-500 text-white text-center py-2 rounded-full font-semibold"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}

/********* SUB COMPONENTS *********/

function NavItem({ to, label, hoverColor }) {
  return (
    <Link
      to={to}
      className={`relative ${hoverColor}`}
    >
      {label}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function DropdownLink({ to, label }) {
  return (
    <Link to={to} className="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600">
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