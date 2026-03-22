"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Truck,
  Shield,
  SatelliteDish,
  DollarSign
} from "lucide-react";

export default function WhyChooseUs() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const features = [
    {
      icon: <Globe size={32} />,
      title: "Global Reach",
      desc: "We handle international courier, air cargo, and freight forwarding with strong coordination across major destinations.",
    },
    {
      icon: <Truck size={32} />,
      title: "Reliable Delivery",
      desc: "We ensure timely and secure movement of documents and shipments.",
    },
    {
      icon: <Shield size={32} />,
      title: "Safe Handling",
      desc: "Strict safety measures minimize risks of loss, damage, or pilferage.",
    },
    {
      icon: <SatelliteDish size={32} />,
      title: "Clear Tracking",
      desc: "Real-time tracking keeps you informed from pickup to delivery.",
    },
    {
      icon: <DollarSign size={32} />,
      title: "Fair Pricing",
      desc: "Transparent and competitive rates without hidden charges.",
    },
  ];

  return (
    <section
      className="relative bg-cover bg-center py-24 px-6 overflow-hidden min-h-[600px] flex items-center"
      style={{
        backgroundImage: "url('/why-bg.png')",
      }}
    >
      {/* Orange Overlay with subtle gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/95 to-red-600/80"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 text-white items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* LEFT SIDE - Sticky Heading */}
        <motion.div variants={leftSideVariants} className="space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-white/0 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black leading-tight font-outfit uppercase">
            WHY <br /> 
            <span className="text-red-200">CHOOSE US?</span>
          </h2>
          <div className="w-20 h-2 bg-white rounded-full" />
          <p className="text-xl md:text-2xl leading-relaxed font-light max-w-md opacity-90">
            Tailored logistics solutions for every business requirement.
          </p>
        </motion.div>

        {/* RIGHT SIDE - Animated List */}
        <div className="space-y-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/10 transition-colors duration-300 cursor-default group"
            >
              <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-lg">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}