import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] flex items-center overflow-hidden bg-[#0b1a33]">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img src="/hero1.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* LEFT TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="container mx-auto md:px-20 relative z-20 text-white"
      >
        <h1 className="text-4xl md:text-4xl font-black drop-shadow-lg">
          Global Courier & Logistics <br /> Without Complications
        </h1>

        <p className="mt-6 text-lg max-w-xl font-medium">
          Door-to-door international delivery,  
          Express time tracking – Reliable & economy tracking
        </p>

        <button className="mt-8 bg-[#e31e24] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg">
          Ship Internationally Today
        </button>
      </motion.div>

      {/* RIGHT IMAGE WITH STROKE */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-[45%] z-10">
        <div className="absolute inset-0 bg-white hero-stroke-clip z-20"></div>

        <div className="w-full h-full hero-right-clip relative">
          <motion.img
            src="/hero.png"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
}