"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const sliderRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const services = [
    { title: "International Courier Tracking", img: "/service1.png", desc: "Track your international shipments in real time with global coverage." },
    { title: "Door-to-Door Pickup & Delivery", img: "/service2.png", desc: "Fast doorstep pickup and secure delivery across domestic locations." },
    { title: "Import & Export Service", img: "/service3.png", desc: "Reliable import/export handling with documentation and customs." },
    { title: "Free Baggage Service", img: "/service4.png", desc: "Send extra baggage safely at affordable rates without restrictions." },
    { title: "Secured Document Delivery", img: "/service5.png", desc: "Confidential and time-sensitive documents delivered with speed." },
  ];

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* 1. HEADER */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1]">
              GLOBAL LOGISTICS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                EXPERTISE
              </span>
            </h2>
          </div>

          <div className="flex gap-3 mb-2">
            <NavButton icon={<ChevronLeft size={24} />} onClick={() => slide("left")} />
            <NavButton icon={<ChevronRight size={24} />} onClick={() => slide("right")} />
          </div>
        </motion.div>

        {/* 2. SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto mt-16 pb-10 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* 3. VIEW ALL CTA */}
        <div className="flex justify-center mt-8">
           <ExploreButton />
        </div>
      </div>
    </section>
  );
}

/********* SUB-COMPONENTS *********/

function ServiceCard({ service, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -15 }}
      className="group min-w-[300px] md:min-w-[380px] bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 snap-start"
    >
      <div className="relative h-[300px] md:h-[350px] overflow-hidden rounded-t-[32px]">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
          {service.desc}
        </p>
        
        {/* Navigation Logic Added Here */}
        <div 
          onClick={() => navigate("/services")}
          className="mt-6 flex items-center gap-2 text-red-600 font-bold text-sm cursor-pointer group/link w-fit"
        >
          <span>Read More</span>
          <div className="w-6 h-[2px] bg-red-600 group-hover/link:w-10 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

function NavButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 active:scale-90 shadow-sm"
    >
      {icon}
    </button>
  );
}

function ExploreButton() {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate("/services")}
      className="group relative overflow-hidden bg-gray-900 text-white rounded-full px-10 py-4 font-bold transition-all hover:pr-14"
    >
      <span className="relative z-10">Explore All Services</span>
      <div className="absolute inset-0 bg-red-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
    </button>
  );
}