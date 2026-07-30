import React, { useState, useEffect, useRef } from "react";
import { MapPin, Compass, Loader2 } from "lucide-react";

// Pre-cached major global logistics hubs & airports for instant autocomplete
const COMMON_HUBS = [
  { name: "Bangalore, Karnataka, India", details: "Kempegowda International Airport (BLR) / City Hub" },
  { name: "Dubai, United Arab Emirates", details: "Dubai International Airport (DXB) & Jebel Ali Port" },
  { name: "Singapore", details: "Singapore Changi Airport (SIN) & Port of Singapore" },
  { name: "Kozhikode, Kerala, India", details: "Calicut International Airport (CCJ)" },
  { name: "London, United Kingdom", details: "London Heathrow Airport (LHR)" },
  { name: "New York, NY, USA", details: "John F. Kennedy International Airport (JFK)" },
  { name: "Frankfurt, Germany", details: "Frankfurt Airport (FRA) Freight Hub" },
  { name: "Sydney, Australia", details: "Sydney Kingsford Smith Airport (SYD)" },
  { name: "Tokyo, Japan", details: "Narita International Airport (NRT)" },
  { name: "Mumbai, Maharashtra, India", details: "Chhatrapati Shivaji Maharaj Airport (BOM) & JNPT" },
  { name: "Delhi, India", details: "Indira Gandhi International Airport (DEL)" },
  { name: "Chennai, Tamil Nadu, India", details: "Chennai International Airport (MAA) & Port" }
];

export default function LocationInput({ value, onChange, placeholder, icon, className = "", id, disabled }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geolocating, setGeolocating] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch location suggestions as user types
  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (val.trim().length >= 2) {
      const localMatches = COMMON_HUBS.filter(h =>
        h.name.toLowerCase().includes(val.toLowerCase()) ||
        h.details.toLowerCase().includes(val.toLowerCase())
      );

      setSuggestions(localMatches);
      setIsOpen(true);
      fetchOnlineSuggestions(val);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const fetchOnlineSuggestions = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      if (res.ok) {
        const data = await res.json();
        const onlineItems = data.map(item => ({
          name: item.display_name.split(",").slice(0, 3).join(",").trim(),
          details: item.display_name
        }));

        setSuggestions(prev => {
          const combined = [...prev];
          onlineItems.forEach(item => {
            if (!combined.some(c => c.name.toLowerCase() === item.name.toLowerCase())) {
              combined.push(item);
            }
          });
          return combined.slice(0, 7);
        });
      }
    } catch (e) {
      console.warn("Location fetch fallback", e);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve current location via browser Geolocation API
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (res.ok) {
            const data = await res.json();
            const placeName = data.address?.city || data.address?.town || data.address?.county || data.address?.state || "";
            const country = data.address?.country || "";
            const fullLocation = placeName ? `${placeName}, ${country}` : data.display_name.split(",").slice(0, 3).join(",");
            onChange(fullLocation.trim());
          } else {
            onChange(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setGeolocating(false);
          setIsOpen(false);
        }
      },
      (err) => {
        console.warn(err);
        setGeolocating(false);
        alert("Unable to retrieve current location. Please type manually.");
      }
    );
  };

  return (
    <div ref={containerRef} className={`relative group ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
        {icon || <MapPin size={18} strokeWidth={2.5} />}
      </div>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleInputChange}
        onFocus={() => {
          if (value && value.length >= 2) setIsOpen(true);
        }}
        className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium hover:border-slate-300 disabled:hover:border-slate-200"
      />

      {/* Geolocation Button */}
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        disabled={disabled}
        title="Detect my current location via GPS"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
      >
        {geolocating ? <Loader2 size={16} className="animate-spin text-blue-600" /> : <Compass size={16} />}
      </button>

      {/* Suggested locations dropdown */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
          <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <span>Suggested Locations</span>
            {loading && <Loader2 size={12} className="animate-spin text-blue-500" />}
          </div>
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(item.name);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-start gap-2.5 transition-colors border-b border-slate-50 last:border-0 cursor-pointer"
            >
              <MapPin size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-slate-800 truncate">{item.name}</p>
                {item.details && <p className="text-[10px] text-slate-400 truncate">{item.details}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
