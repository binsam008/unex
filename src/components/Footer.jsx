import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const services = [
    "Door Pickup", "Free Packing", "Online Tracking", 
    "Food Delivery", "Document Delivery", "Imports"
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className="bg-white text-[#0A0F1C] pt-12 pb-6 px-6 rounded-t-[30px] font-outfit border-t border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Column - Compact */}
          <div className="space-y-4">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-20 w-auto object-contain" 
              />
            </Link>
            <p className="text-slate-500 text-sm leading-snug max-w-xs">
              Global logistics solutions tailored for speed, reliability, and security.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-red-600 transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-red-600">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-[#0A0F1C] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Compact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-red-600">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-slate-500 hover:text-[#0A0F1C] text-sm transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Compact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-red-600">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <Phone size={14} className="text-red-600" />
                <span>+1 234 567-890</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <Mail size={14} className="text-red-600" />
                <span>support@unex.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={14} className="text-red-600" />
                <span className="truncate">Global Hub, Business Dist.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar - Slim */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Unex Logistics.
          </p>
          <div className="flex gap-6 text-slate-400 text-xs font-medium">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}