"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, PackageCheck, Search, Utensils, FileText, 
  ClipboardCheck, Globe, Headphones, BoxSelect, ArrowUpRight
} from "lucide-react";

// servicesData remains the same as your provided array
const servicesData = [

  {

    id: 1,

    title: "Door Pickup",

    icon: <Truck size={20} />,

    headline: "Shipping from your Doorstep",

    desc: "At UNEX, we bring the shipping counter directly to you. Our professional agents arrive at your home or office to verify weights and handle all documentation on-site. This seamless end-to-end convenience ensures your shipping journey begins without you ever having to leave your desk.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774165934/door_nnj67e.jpg"

  },

  {

    id: 2,

    title: "Free Packing",

    icon: <PackageCheck size={20} />,

    headline: "Professional Secure Packaging",

    desc: "Safety is our priority, which is why we provide expert packing at no extra cost. Using industrial-grade corrugated boxes and high-density wrap, we engineer a protective environment for your goods. We ensure your items are built to withstand the rigors of global transit and arrive in pristine condition.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774166412/Mar_22_2026_01_29_56_PM_jt5s4p.png"

  },

  {

    id: 3,

    title: "Online Tracking",

    icon: <Search size={20} />,

    headline: "24/7 Real-time Visibility",

    desc: "Stay connected to your shipment with our sophisticated tracking ecosystem. From pickup to the final signature, every milestone is logged and visible through our secure portal. We utilize advanced GPS technology to provide accurate updates, ensuring you always know exactly where your cargo is located.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774165921/tracking_yfg2tt.png"

  },

  // {

  //   id: 4,

  //   title: "Food Delivery",

  //   icon: <Utensils size={20} />,

  //   headline: "Shipping the Flavors of Home",

  //   desc: "Specializing in the transport of homemade food and spices, UNEX bridges the distance to your loved ones. We employ vacuum sealing and moisture-resistant packaging to preserve freshness and aroma. Our team handles international regulations to ensure your traditional delicacies clear customs fast and reach the table fresh.",

  //   image: "/images/food-delivery.jpg"

  // },

  {

    id: 5,

    title: "Document Delivery",

    icon: <FileText size={20} />,

    headline: "Swift Handling for Vital Papers",

    desc: "For legal contracts or university transcripts, speed and security are non-negotiable. Our Document Delivery service uses tamper-evident envelopes and a closed-loop chain of custody. With expedited air-routing, we guarantee your time-sensitive papers bypass standard delays to reach their global destination with total urgency.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774165919/documents_j915pn.png"

  },

  {

    id: 6,

    title: "Proof of Delivery",

    icon: <ClipboardCheck size={20} />,

    headline: "Instant Confirmation of Success",

    desc: "Rest easy with our digital Proof of Delivery system. We capture electronic signatures and timestamps the second a package is handed over, uploading them instantly to your dashboard. This transparent audit trail ensures you never have to guess about the status or receipt of your high-value business or personal shipments.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774166586/ChatGPT_Image_Mar_22_2026_01_32_57_PM_ns8d9f.png"

  },

  {

    id: 7,

    title: "Imports",

    icon: <Globe size={20} />,

    headline: "Seamless Global Sourcing",

    desc: "UNEX manages the entire import process from foreign shores to your doorstep. We handle supplier coordination, freight booking, and the complexities of customs duties. Our local expertise in regulatory compliance means your imports move through checkpoints without delays, making global sourcing feel as simple as a local purchase.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774165926/imports_zxkb6d.jpg"

  },

  {

    id: 8,

    title: "Support",

    icon: <Headphones size={20} />,

    headline: "Expert Assistance, Every Step",

    desc: "Logistics is a people business at UNEX. Our support team consists of trained experts available to help with documentation, prohibited items, or rerouting. We pride ourselves on fast response times and personalized problem-solving, ensuring every client feels supported and valued throughout the entire shipping process.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774165926/support_jpqfxp.jpg"

  },

  {

    id: 9,

    title: "Special Freight",

    icon: <BoxSelect size={20} />,

    headline: "Solutions for Oversized Cargo",

    desc: "Our Special Freight division specializes in the transport of machinery and bulky industrial equipment. We provide custom crating and dedicated transit routes tailored to your specific cargo dimensions. No matter how complex the shipment, we have the technical expertise to ensure it is moved safely and efficiently across borders.",

    image: "https://res.cloudinary.com/dzruikkiw/image/upload/v1774165924/freight_e3umbk.png"

  }

];

export default function ModernServices() {
  const [activeId, setActiveId] = useState(servicesData[0].id);
  const currentService = servicesData.find((s) => s.id === activeId);

  return (
    <section className="bg-white py-26 px-6 md:px-12 font-outfit">
      <div className="max-w-6xl mx-auto">
        
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-[#002242] tracking-tighter mb-3">
              Our <span className="text-[#e31e24]">Services.</span>
            </h2>
            <p className="text-gray-500 text-base font-medium">
              Refined logistics to move your goods faster, safer, and smarter.
            </p>
          </div>
        </div>

        {/* Modern Segmented Control (Tabs) */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-gray-100/80 backdrop-blur-md rounded-2xl mb-8 border border-gray-200/50">
          {servicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveId(service.id)}
              className={`relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                ${activeId === service.id ? "text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              {activeId === service.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-[#002242] rounded-xl shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{service.title}</span>
            </button>
          ))}
        </div>

        {/* Content Feature Card - Reduced Height Version */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-12 gap-0 rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] bg-white"
          >
            {/* Image Section - Height Capped at 450px */}
            <div className="lg:col-span-6 h-[280px] lg:h-[450px] overflow-hidden relative">
               <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
                src={currentService.image} 
                alt={currentService.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-6 left-6">
                <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                   <span className="text-[#e31e24]">{currentService.icon}</span>
                   <span className="text-[#002242] font-bold text-[10px] uppercase tracking-widest">{currentService.title}</span>
                </div>
              </div>
            </div>

            {/* Content Section - Compact Padding */}
            <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl md:text-3xl font-black text-[#002242] mb-4 leading-tight">
                  {currentService.headline}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  {currentService.desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/quote" className="flex-1">
                    <button className="w-full bg-[#e31e24] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#c4161b] transition-all text-sm">
                      Book Now
                      <ArrowUpRight size={18} />
                    </button>
                  </Link>
                  <Link to="/contact" className="flex-1">
                    <button className="w-full bg-transparent text-[#002242] py-4 rounded-xl font-bold border border-[#002242]/10 hover:border-[#002242] transition-all text-sm">
                      Inquiry
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}