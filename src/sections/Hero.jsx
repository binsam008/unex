import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Globe, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  FileText, 
  Package, 
  BarChart 
} from "lucide-react";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const servicesBgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="w-full bg-white font-['Outfit'] selection:bg-red-100 selection:text-red-600 overflow-x-hidden">
      
      {/* ================== HERO SECTION ================== */}
      <div className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-20 lg:pt-15">
        
        {/* Background Image & World Map Overlay */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
          <img 
            src="/hero1.jpg" 
            alt="Logistics Background" 
            className="w-full h-[120%] object-cover object-center"
          />
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/world-map.png')] bg-right bg-no-repeat bg-contain hidden md:block" />
          
          {/* Responsive Gradient: More opaque on mobile for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/40 lg:bg-gradient-to-r lg:from-white lg:via-white/95 lg:to-white/20" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white border border-slate-100 shadow-sm rounded-lg mb-6 lg:mb-8">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-slate-500">
                Global Operations Active
              </span>
            </div>

            {/* Responsive Font Sizes: text-5xl on mobile, text-8xl on desktop */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black leading-[0.95] lg:leading-[0.9] tracking-tighter text-slate-900 mb-6 lg:mb-7 uppercase">
              International <br className="hidden sm:block" /> Courier<br />
              <span className="text-red-600">Perfected.</span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg lg:text-xl leading-relaxed mb-8 lg:mb-10 max-w-lg">
              We deliver documents, parcels, commercial shipments, and cargo worldwide — 
              <span className="text-slate-900 font-bold"> fast, safe, and fully tracked.</span>
            </p>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto h-14 lg:h-16 px-8 lg:px-10 bg-[#050A18] text-white font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-3 group rounded-sm shadow-2xl mb-12 lg:mb-16"
            >
              Ship Internationally Today
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>

            {/* Responsive Stats Grid: 1 col on tiny phones, 2 on others */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 lg:gap-6 py-12">
              {[
                { label: "Door-to-door", icon: <CheckCircle2 size={16}/> },
                { label: "Express & Economy", icon: <Zap size={16}/> },
                { label: "Real-time tracking", icon: <BarChart size={16}/> },
                { label: "220+ Countries", icon: <Globe size={16}/> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-500 font-bold text-[10px] lg:text-[11px] uppercase tracking-widest">
                  <span className="text-red-600 shrink-0">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================== SERVICES SECTION ================== */}
      <div className="relative bg-[#050A18] py-20 lg:py-32 overflow-hidden">
        <motion.div style={{ y: servicesBgY }} className="absolute inset-0 opacity-10 z-0">
          <img src="/cargo-ship.jpg" alt="Cargo" className="w-full h-[120%] object-cover" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                Beyond <br /> <span className="text-red-600">The Border.</span>
              </h2>
              <div className="h-1.5 w-16 lg:h-2 lg:w-20 bg-red-600 mb-6 lg:mb-8" />
              <p className="text-slate-400 text-base lg:text-lg max-w-sm">
                Managing global trade is complex. Our specialized divisions handle the regulatory burden.
              </p>
            </div>

            <div className="space-y-8 lg:space-y-12">
              {[
                { title: "Customs & Documentation", icon: <FileText size={32} />, list: ["Export Support", "Customs Clearance", "IEC & KYC", "Paperwork"] },
                { title: "Personal Baggage", icon: <Package size={32} />, list: ["Student Shipping", "Relocation Cargo", "Effects Clearance", "Import Cargo"] }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group border-l-4 border-slate-800 hover:border-red-600 pl-6 lg:pl-8 transition-all bg-white/5 p-6 lg:p-8 backdrop-blur-md"
                >
                  <div className="text-red-600 mb-4 lg:mb-6">{service.icon}</div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white uppercase mb-4 tracking-tight">{service.title}</h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-8">
                    {service.list.map(li => (
                      <div key={li} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                        <CheckCircle2 size={12} className="text-red-600 shrink-0" /> {li}
                      </div>
                    ))}
                  </div>
                  <button className="text-white font-black uppercase text-xs tracking-widest group-hover:text-red-600 transition-colors flex items-center gap-2">
                    Learn More <ArrowRight size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}