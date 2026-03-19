"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate(); // ✅ initialize

  return (
    <section className="mt-5 relative w-full h-[65vh] md:h-[85vh] flex items-center overflow-hidden bg-[#0b1a33] ">
      
      {/* BACKGROUND */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/hero1.jpg"
          alt="Logistics background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-20 w-full px-6 md:px-20 text-white">
        
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight"
        >
          Global Courier <br className="hidden md:block"/>
          <span className="text-[#e31e24]">Without Limits</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-sm md:text-xl max-w-xl text-white/90"
        >
          Door-to-door international delivery with express time tracking.
          Reliable, secure and cost-effective shipping worldwide.
        </motion.p>

        {/* ✅ BUTTON WITH NAVIGATION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate("/quote")} // ✅ redirect here
            className="mt-8 md:mt-10 bg-[#e31e24] hover:bg-red-700 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-red-600/20 active:scale-95 transition-all"
          >
            Ship Internationally Today
          </button>
        </motion.div>

      </div>

      {/* DECOR */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute right-0 bottom-0 w-1/3 h-[2px] bg-[#e31e24] hidden md:block"
      />
    </section>
  );
}