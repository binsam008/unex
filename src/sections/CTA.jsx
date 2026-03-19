import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="px-6 py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full h-[350px] md:h-[420px] bg-cover bg-center rounded-[30px] overflow-hidden"
        style={{
          backgroundImage: "url('/truck-banner.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 text-white max-w-lg"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold leading-snug mb-6"
          >
            Tailored logistics <br />
            solutions for every <br />
            business requirement.
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white text-black rounded-lg px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            Ship now
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}