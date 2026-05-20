import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  const headingLines = ["Tailored logistics", "solutions for every", "business requirement."];

  return (
    <section className="px-6 py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative w-full h-[350px] md:h-[420px] rounded-[30px] overflow-hidden group shadow-2xl"
      >
        {/* Animated Background Image */}
        <motion.div
          animate={{ scale: [1.1, 1] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110"
          style={{
            backgroundImage: "url('/truck-banner.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-1000 group-hover:bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 text-white max-w-lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
              hidden: {}
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6 flex flex-col gap-1">
              {headingLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden py-1">
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: "100%" },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="block leading-none"
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h2>

            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black rounded-lg px-6 py-3 text-sm font-bold hover:bg-gray-100 transition-colors shadow-xl"
              onClick={() => navigate("/quote")}
            >
              Ship now
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}