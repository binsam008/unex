"use client";
import { motion } from "framer-motion";

export default function About() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-white px-6 overflow-hidden">
      <motion.div 
        className="max-w-8xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* TOP SECTION */}
        <motion.h2 
          variants={itemVariants}
          className="text-orange-500 font-extrabold text-4xl px-4 md:px-20 mb-10 tracking-tight"
        >
          ABOUT US
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center px-4 md:px-10">
          {/* LEFT IMAGE */}
          <motion.div 
            variants={imageVariants}
            className="flex justify-center relative group"
          >
            <div className="absolute -inset-2 rounded-[40px] scale-95 group-hover:scale-100 transition-transform duration-500 -z-10" />
            <img
              src="/about.png"
              alt="About Logistics"
              className="rounded-4xl h-auto object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
            />
          </motion.div>

          {/* RIGHT TEXT */}
  {/* RIGHT TEXT */}
<motion.div variants={itemVariants}>
<p 
  lang="en" 
  className="text-gray-700 leading-relaxed text-lg md:text-[25px] font-outfit text-justify hyphens-auto"
  style={{ hyphens: 'auto' }}
>
  We Deliver, Track & Ship is a comprehensive logistics and
  transportation provider dedicated to delivering seamless, 
  reliable solutions for businesses and individuals. From initial 
  order placement to final delivery, we manage every stage of the 
  supply chain with precision, powered by advanced tracking 
  technology and a customer-first approach.
</p>
</motion.div>
        </div>

        {/* STATS SECTION */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-24 border-t border-gray-100 pt-16"
        >
          {[
            { label: "10 Yr+", desc: "of shipping expertise" },
            { label: "120 +", desc: "cargo handled worldwide" },
            { label: "12 K+", desc: "customer satisfied" }
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="space-y-2">
              <h3 className="text-5xl font-black text-gray-900">{stat.label}</h3>
              <p className="text-orange-600 font-bold uppercase tracking-widest text-xs">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}