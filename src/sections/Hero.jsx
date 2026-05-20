"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="mt-5 relative w-full h-[65vh] md:h-[85vh] flex items-center overflow-hidden bg-[#0b1a33]">
      
      {/* BACKGROUND */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/hero1.jpg"
          alt="Logistics background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent"></div>
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-20 w-full px-6 md:px-20 text-white">
        
        <motion.div
           initial="hidden"
           animate="visible"
           variants={{
             visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
             hidden: {}
           }}
        >
          <motion.h1 
            variants={{
                hidden: { opacity: 0, filter: "blur(20px)", y: 30 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1.2, ease: "easeOut" } }
            }}
            className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight"
          >
            Global Courier <br className="hidden md:block"/>
            <span className="text-[#e31e24]">Without Limits</span>
          </motion.h1>

          <motion.p 
            variants={{
                hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: "easeOut" } }
            }}
            className="mt-6 text-sm md:text-xl max-w-xl text-white/90"
          >
            Door-to-door international delivery with express time tracking.
            Reliable, secure and cost-effective shipping worldwide.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut", delay: 0.2 } }
            }}
            className="mt-8 md:mt-10 inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/quote")}
              className="bg-[#e31e24] hover:bg-red-700 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-red-600/30 transition-colors"
            >
              Ship Internationally Today
            </motion.button>
          </motion.div>
        </motion.div>

      </div>

      {/* DECOR */}
      <motion.div 
        initial={{ opacity: 0, width: "0%" }}
        animate={{ opacity: 1, width: "33%" }}
        transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
        className="absolute right-0 bottom-0 h-[4px] bg-[#e31e24] hidden md:block"
      />
    </section>
  );
}