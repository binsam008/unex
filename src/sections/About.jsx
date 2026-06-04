"use client";
import { motion, useMotionValue, useSpring, useInView, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef } from "react";

// --- Sub-component for the counting effect ---
function Counter({ value, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Create a motion value to track the number
  const motionValue = useMotionValue(direction === "down" ? value : 0);

  // Use a spring for a smooth "organic" counting feel
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  const isFloat = value % 1 !== 0;

  useMotionValueEvent(springValue, "change", (latest) => {
    if (ref.current) {
      if (isFloat) {
        ref.current.textContent = latest.toFixed(1);
      } else {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    }
  });

  return <span ref={ref} />;
}

export default function About() {
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

  const stats = [
    { target: 20, suffix: "+", label: "Years of Experience", desc: "In global logistics and shipping" },
    { target: 10, suffix: " Lakh+", label: "Shipments Delivered", desc: "Safe, secure, and on-time worldwide" },
    { target: 5.5, suffix: " Lakh+", label: "Happy Customers", desc: "Trusted by students, families, and businesses" },
  ];

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
          className="text-red-600 font-extrabold text-4xl px-4 md:px-20 mb-10 tracking-tight"
        >
          ABOUT US
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center px-4 md:px-10">
          {/* LEFT IMAGE */}
          <motion.div variants={imageVariants} className="flex justify-center relative group">
            <div className="absolute -inset-2 rounded-[40px] scale-95 group-hover:scale-100 transition-transform duration-500 -z-10" />
            <img
              src="/about.png"
              alt="About Logistics"
              className="rounded-4xl h-auto object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
            />
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div variants={itemVariants}>
            <p
              lang="en"
              className="text-gray-600 leading-relaxed text-base md:text-[18px] text-left"
            >
              At UNEX, we believe shipping shouldn't be stressful. We've built a comprehensive logistics network that treats every package as if it were our own. From the moment you place an order to the final doorstep delivery, our team works around the clock to manage every step of the journey with precision. Combining cutting-edge tracking technology with a deeply human, customer-first approach, we make sure your shipments arrive safely, on time, and without surprises.
            </p>
          </motion.div>
        </div>

        {/* STATS SECTION */}
        <motion.div
          variants={containerVariants}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-16 border-t border-gray-100 pt-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 to-[#e31e24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <h3 className="text-3xl md:text-4xl font-black text-[#0b1a33] tracking-tight whitespace-nowrap">
                <Counter value={stat.target} />
                <span className="text-[#e31e24]">{stat.suffix}</span>
              </h3>
              <p className="text-[#0b1a33] font-bold text-sm mt-2 leading-snug">
                {stat.label}
              </p>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-[220px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}