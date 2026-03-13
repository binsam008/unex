import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[75vh] md:h-[70vh] flex items-center overflow-hidden bg-[#0b1a33]">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero1.jpg"
          className="w-full h-full object-cover"
        />

        {/* DARK GRADIENT FOR READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 w-full px-6 md:px-20 text-white text-center md:text-left"
      >

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg">
          Global Courier & Logistics <br className="hidden md:block"/>
          Without Complications
        </h1>

        <p className="mt-4 md:mt-6 text-sm md:text-lg max-w-xl mx-auto md:mx-0 font-medium text-white/90">
          Door-to-door international delivery with express time tracking.
          Reliable, secure and cost-effective shipping worldwide.
        </p>

        <button className="mt-6 md:mt-8 bg-[#e31e24] hover:bg-red-700 transition px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg shadow-lg">
          Ship Internationally Today
        </button>

      </motion.div>

    </section>
  );
}