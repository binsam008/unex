import { useState } from "react";
// Import Link from react-router-dom for Vite/CRA projects
import { Link } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  PackageCheck, 
  Search, 
  Utensils, 
  FileText, 
  ClipboardCheck, 
  Globe, 
  Headphones, 
  BoxSelect 
} from "lucide-react";

const servicesData = [
  { 
    id: 1, 
    title: "Door Pickup", 
    icon: <Truck size={24} />, 
    headline: "Shipping from your Doorstep",
    desc: "Unex Logistics brings the shipping counter to your doorstep.",
    image: "/images/door.png"
  },
  { 
    id: 2, 
    title: "Free Packing", 
    icon: <PackageCheck size={24} />, 
    headline: "Professional Secure Packaging",
    desc: "Expert packing using industrial-grade materials.",
    image: "/images/free.png"
  },
  { 
    id: 3, 
    title: "Online Tracking", 
    icon: <Search size={24} />, 
    headline: "Real-time Visibility",
    desc: "Track your shipment live.",
    image: "/images/tracking.jpg"
  },
  { 
    id: 4, 
    title: "Food Delivery", 
    icon: <Utensils size={24} />, 
    headline: "Perishable Goods Specialist",
    desc: "Temperature-controlled logistics.",
    image: "/images/food-delivery.jpg"
  },
  { 
    id: 5, 
    title: "Document Delivery", 
    icon: <FileText size={24} />, 
    headline: "Secure Priority Handling",
    desc: "Safe handling for important documents.",
    image: "/images/documents.jpg"
  },
  { 
    id: 6, 
    title: "Proof of Delivery", 
    icon: <ClipboardCheck size={24} />, 
    headline: "Instant Confirmation",
    desc: "Get delivery proof instantly.",
    image: "/images/proof.jpg"
  },
  { 
    id: 7, 
    title: "Imports", 
    icon: <Globe size={24} />, 
    headline: "Global Sourcing Solutions",
    desc: "We manage imports smoothly.",
    image: "/images/imports.jpg"
  },
  { 
    id: 8, 
    title: "Support", 
    icon: <Headphones size={24} />, 
    headline: "24/7 Expert Assistance",
    desc: "We are always available.",
    image: "/images/support.jpg"
  },
  { 
    id: 9, 
    title: "Special Freight", 
    icon: <BoxSelect size={24} />, 
    headline: "Heavy & Bulky Solutions",
    desc: "Handling oversized shipments.",
    image: "/images/freight.jpg"
  },
];

export default function ServicesTabs() {
  const [activeId, setActiveId] = useState(servicesData[0].id);
  const currentService = servicesData.find(s => s.id === activeId);

  return (
    <div className="bg-gray-50 min-h-screen py-25 px-4 md:px-6 font-outfit">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#002242] mb-4"
          >
            Unex <span className="text-orange-500">Logistics</span> Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            Explore our wide range of customized shipping solutions designed for your convenience.
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-10">
          {servicesData.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveId(service.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300
                ${activeId === service.id 
                  ? "bg-orange-500 text-white shadow-lg scale-105" 
                  : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                }`}
            >
              <span className={activeId === service.id ? "text-white" : "text-orange-500"}>
                {service.icon}
              </span>
              <span>{service.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
              <img 
                src={currentService.image} 
                alt={currentService.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
                Service 0{currentService.id}
              </div>
              <h3 className="text-3xl font-extrabold text-[#f44900] mb-4">
                {currentService.headline}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {currentService.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                {/* Updated to use Link for routing */}
                <Link to="/quote">
                  <button className="bg-[#ff3c00] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-500 transition-all shadow-md active:scale-95">
                    Book Now
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <div className="mt-16 text-center bg-[#021a31] p-10 rounded-3xl text-white">
          <h3 className="text-2xl font-bold mb-2">Need a custom logistics plan?</h3>
          <p className="opacity-80 mb-6">Our experts are ready to help you optimize your supply chain.</p>
          <Link 
            to="/contact" 
            className="inline-block bg-orange-500 text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all"
          >
            Chat with an Expert
          </Link>
        </div>
      </div>
    </div>
  );
}