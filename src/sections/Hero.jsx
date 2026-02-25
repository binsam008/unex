import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock,
} from "lucide-react";

const ORANGE = "#f97316";

const slides = [
  {
    id: "01",
    title: "Logistics",
    subtitle: "Global",
    headline: "Global Courier & Logistics Without Complications",
    subtext:
      "We deliver documents, parcels, commercial shipments, and cargo worldwide — fast, safe, and fully tracked.",
    highlights: [
      "Door-to-door delivery",
      "Express options",
      "Real-time tracking",
      "220+ countries",
    ],
    ctaText: "Ship Internationally",
    image: "/hero1.jpg",
    icon: () => <Globe className="w-5 h-5" />,
  },
  {
    id: "02",
    title: "Customs",
    subtitle: "Expert",
    headline: "We Manage Customs & Documentation",
    subtext:
      "From invoice preparation to clearance, we take care of the entire paperwork process professionally.",
    highlights: [
      "Export support",
      "Customs clearance",
      "IEC & KYC guidance",
      "Commercial paperwork",
    ],
    ctaText: "Get Support",
    image: "/hero2.jpg",
    icon: () => <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: "03",
    title: "Cargo",
    subtitle: "Simple",
    headline: "Personal Baggage & Import Cargo Made Simple",
    subtext:
      "Moving abroad? Returning home? Importing goods? We handle your baggage safely and legally.",
    highlights: [
      "Student baggage",
      "Household relocation",
      "Personal effects",
      "Import handling",
    ],
    ctaText: "Request Quote",
    image: "/hero3.jpg",
    icon: () => <Clock className="w-5 h-5" />,
  },
];

export default function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const current = ((page % slides.length) + slides.length) % slides.length;

  const paginate = useCallback((dir) => {
    setPage(([prev]) => [prev + dir, dir]);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [paginate, isHovered]);

  return (
    <section
      className="relative w-full h-[100dvh] flex flex-col justify-between bg-white overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HEADER */}
      <header className="relative z-20 pt-8 px-6 md:pt-16 md:px-16 flex justify-between items-start w-full">
        <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[60px] shadow-2xl max-w-fit">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
              Navigating
            </span>
            <div className="h-[1px] w-8 bg-gray-200" />
          </div>

          <motion.div
            key={current}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline gap-2 md:gap-4"
          >
            <h1 className="text-2xl md:text-6xl font-black uppercase tracking-tighter text-gray-900">
              {slides[current].title}
            </h1>
            <span className="text-gray-300 font-light text-lg md:text-3xl italic">
              for
            </span>
          </motion.div>

          <motion.h2
            key={`sub-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-7xl md:text-[120px] font-black leading-[0.8] mt-1"
            style={{ color: ORANGE }}
          >
            {slides[current].subtitle}
          </motion.h2>
        </div>

        <div className="hidden md:flex flex-col items-end text-white font-mono">
          <span className="text-6xl font-black opacity-20">
            {slides[current].id}
          </span>
          <div className="w-12 h-[2px] bg-orange-500 mt-2" />
          <span className="text-sm tracking-widest mt-2 uppercase">
            of 0{slides.length}
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-20 px-6 md:px-16 flex flex-col md:flex-row justify-between items-end pb-12 md:pb-20 gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="w-full md:max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-6 md:p-10 rounded-[40px] text-white shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500 rounded-lg">
                {slides[current].icon()}
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight">
                {slides[current].headline}
              </h3>
            </div>

            <p className="text-gray-200 text-sm md:text-base mb-8 leading-relaxed opacity-90">
              {slides[current].subtext}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {slides[current].highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs md:text-sm font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {item}
                </div>
              ))}
            </div>

            <button className="group relative w-full md:w-auto overflow-hidden bg-white text-black px-8 py-4 rounded-2xl font-bold transition-transform active:scale-95">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {slides[current].ctaText}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* CONTROLS */}
        <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
          <div className="flex gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-14 h-14 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-orange-500 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="w-full md:w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              key={current}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="h-full bg-orange-500"
            />
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-tl-[100px] z-10 hidden lg:block" />
    </section>
  );
}