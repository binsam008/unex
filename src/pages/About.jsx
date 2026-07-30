"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe, ShieldCheck, Clock, Award, Users, CheckCircle2,
  Target, Compass, ArrowRight, PackageCheck, Plane, Building2, MapPin, Sparkles
} from "lucide-react";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const imageHover = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  const stats = [
    { icon: <Globe className="text-red-500 shrink-0" size={22} />, value: "50+", label: "Countries Served" },
    { icon: <CheckCircle2 className="text-emerald-500 shrink-0" size={22} />, value: "99.8%", label: "On-Time Delivery" },
    { icon: <PackageCheck className="text-blue-500 shrink-0" size={22} />, value: "10K+", label: "Successful Cargo" },
    { icon: <Clock className="text-amber-500 shrink-0" size={22} />, value: "24/7", label: "Global Support" }
  ];

  const pillars = [
    {
      icon: <Plane className="text-red-600" size={24} />,
      title: "Express Air Freight",
      description: "Fast-track air cargo forwarding for time-sensitive consignments and urgent documents globally."
    },
    {
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      title: "Secure & Compliant",
      description: "Comprehensive customs export clearance and rigorous handling standards for complete peace of mind."
    },
    {
      icon: <MapPin className="text-emerald-600" size={24} />,
      title: "Door-to-Door Network",
      description: "Seamless pickup and delivery across major international hubs with reliable ground support."
    },
    {
      icon: <Users className="text-amber-600" size={24} />,
      title: "Customer Centric",
      description: "Dedicated account support specialists ready to assist you through every milestone."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-outfit pt-16 sm:pt-24 pb-12 sm:pb-20 overflow-hidden">

      {/* 1. HERO HEADER SECTION */}
      <section className="relative px-4 sm:px-8 md:px-16 pt-6 sm:pt-10 pb-10 sm:pb-16 max-w-7xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-4 max-w-4xl mx-auto"
        >
          {/* <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 font-bold text-[10px] sm:text-xs tracking-wider uppercase shadow-sm">
            <Sparkles size={12} className="text-red-500 animate-pulse" />
            <span>GLOBAL LOGISTICS & EXPRESS DELIVERY</span>
          </div> */}

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-snug">
            Empowering Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-amber-500">Global Shipping</span> & Cargo Solutions
          </h1>

          <p className="text-slate-600 text-xs sm:text-base md:text-lg leading-relaxed text-center font-normal max-w-2xl mx-auto px-2">
            UNEX is Bangalore's premier international courier, air cargo, and freight forwarding partner. We connect businesses and individuals to worldwide destinations with speed, security, and absolute reliability.
          </p>
        </motion.div>

        {/* STATS BAR */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={fadeInUp}
          className="mt-8 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-md p-3.5 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform mb-1.5 sm:mb-2">
                {item.icon}
              </div>
              <span className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">{item.value}</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. COMPANY OVERVIEW SECTION */}
      <section className="px-4 sm:px-8 md:px-16 py-8 sm:py-14 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center"
        >
          {/* Left Column: Text Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
              <Building2 size={13} /> ABOUT UNEX LOGISTICS
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Driven by Excellence, Connecting You to the World
            </h2>

            <div className="space-y-3 text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
              <p>
                Founded in Bangalore, UNEX has built a solid reputation as a reliable global courier, air cargo, and international freight forwarding service provider. We understand that behind every parcel and cargo consignment is a vital commitment to time and trust.
              </p>
              <p>
                With a dedicated customer service team and reliable pickup staff, we ensure timely, secure, and cost-effective delivery of documents and consignments worldwide. We handle export clearances and logistics management at major international destinations supported by strict safety measures.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1">
              {[
                "Custom Export Clearances",
                "Worldwide Door-to-Door",
                "Advanced Cargo Tracking",
                "Strict Security Protocols",
                "Competitive Freight Rates",
                "24/7 Dedicated Assistance"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-800 font-medium text-xs sm:text-sm">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-red-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/track"
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200"
              >
                <span>Track Shipment</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Image with Overlay Card */}
          <motion.div variants={imageHover} className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-r from-red-500 to-amber-500 rounded-3xl opacity-20 blur-xl -z-10" />
              <img
                src="/about1.png"
                alt="UNEX Global Cargo & Logistics"
                className="rounded-2xl sm:rounded-3xl shadow-xl w-full object-cover border border-white/60"
              />

              {/* Overlay Card */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-4 sm:-left-4 bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-lg flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                  <Award size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Certified Global Partner</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Safe handling & guaranteed delivery</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CORE PILLARS SECTION */}
      <section className="px-4 sm:px-8 md:px-16 py-8 sm:py-14 max-w-7xl mx-auto my-4 sm:my-8">
        <div className="bg-slate-100/70 rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-200/70">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md">WHY UNEX LOGISTICS</span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Our Core Pillars of Service
            </h2>
            <p className="text-slate-500 mt-1 text-xs sm:text-sm font-normal">Built on precision, global reach, and relentless dedication to your cargo.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 bg-slate-50 rounded-lg w-fit border border-slate-100 mb-3 text-left">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 text-left">{pillar.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed text-left">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION CARDS */}
      <section className="px-4 sm:px-8 md:px-16 py-8 sm:py-14 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center"
        >
          {/* Image Left */}
          <motion.div variants={imageHover} className="lg:col-span-5">
            <img
              src="/about2.png"
              alt="UNEX Vision & Mission"
              className="rounded-2xl sm:rounded-3xl shadow-lg w-full object-cover border border-white"
            />
          </motion.div>

          {/* Cards Right */}
          <div className="lg:col-span-7 space-y-4">
            {/* VISION CARD */}
            <motion.div
              variants={fadeInUp}
              className="bg-slate-900 text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg relative overflow-hidden group text-left"
            >
              <div className="absolute -right-8 -bottom-8 opacity-10 text-white group-hover:scale-105 transition-transform pointer-events-none">
                <Target size={140} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 bg-red-600 rounded-lg text-white shrink-0">
                    <Target size={20} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">OUR VISION</h3>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  To be the most trusted global logistics partner by delivering flawless, high-reliability international courier and freight services that businesses and individuals around the world can depend on seamlessly.
                </p>
              </div>
            </motion.div>

            {/* MISSION CARD */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-slate-200 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md relative overflow-hidden group hover:border-red-300 transition-all text-left"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-lg border border-red-100 shrink-0">
                    <Compass size={20} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">OUR MISSION</h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  To provide timely, safe, and cost-effective logistics solutions while adhering to high service standards, clear end-to-end communication, and strict safety guidelines at every phase of the shipment journey.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="px-4 sm:px-8 md:px-16 pt-4 sm:pt-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700/50">
          <div className="space-y-2 max-w-xl text-left">
            <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase bg-red-950/60 px-2.5 py-0.5 rounded-md border border-red-800/40">
              START SHIPPING WITH UNEX
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Ready to Send Your Cargo Worldwide?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-normal">
              Contact our team today or get an instant quote for express international delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/quote"
              className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-red-600/30 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-md text-xs sm:text-sm border border-white/20 flex items-center justify-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}