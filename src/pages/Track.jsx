"use client";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, MapPin, CheckCircle2, Circle, Truck, MessageSquare } from "lucide-react";

export default function Track() {
  const [invoice, setInvoice] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const trackingSteps = [
    "Shipment Information Received",
    "Picked Up",
    // "Handover To Airline",
    "Arrived Hub",
    "Custom Clearance In Progress",
    "Out For Delivery",
    "Delivered"
  ];

  const handleTrack = async () => {
    if (!invoice) return;
    setLoading(true);
    try {
      const ref = doc(db, "shipments", invoice.trim());
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setShipment(snap.data());
        setError("");
      } else {
        setShipment(null);
        setError("Invalid tracking ID. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = shipment ? shipment.currentStep : -1;

  return (
    // Background changed to light gray/white
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-24 px-4 font-outfit">
      <div className="max-w-4xl mx-auto">
        
        {/* COMPACT SEARCH HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
            UNEX LOGISTICS
          </h1>
          <div className="relative max-w-md mx-auto">
            <input
              placeholder="Enter Tracking Number"
              // Input changed to white with subtle shadow
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-16 text-slate-800"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <button
              onClick={handleTrack}
              className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-xl transition-all shadow-md active:scale-95"
            >
              {loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <Search size={20} />}
            </button>
          </div>
          {error && <p className="text-rose-500 mt-4 text-sm font-medium">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {shipment && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid md:grid-cols-12 gap-8"
            >
              {/* LEFT COLUMN: SHIPMENT TICKET */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 text-slate-900">
                    <Truck size={80} />
                  </div>
                  
                  <div className="mb-8 relative z-10">
                    <span className="text-[10px] tracking-[0.2em] text-orange-500 font-bold uppercase">Tracking ID</span>
                    <h2 className="text-2xl font-mono font-bold text-slate-800">{invoice}</h2>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <DetailItem label="Recipient" value={shipment.customerName} />
                    <div className="flex justify-between items-center gap-4">
                      <DetailItem label="From" value={shipment.origin} />
                      <div className="h-[1px] flex-1 bg-slate-100 mt-4" />
                      <DetailItem label="To" value={shipment.destination} textRight />
                    </div>
                    <DetailItem label="Current Hub" value={shipment.currentLocation} highlight />
                  </div>

                  <a
  href={`https://wa.me/9188108851?text=Hello UNEX, I need an update on shipment ${invoice}`}
  target="_blank"
  rel="noreferrer"
  className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl transition-all font-bold hover:bg-emerald-100"
>
                    <MessageSquare size={18} /> Support Chat
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: VERTICAL TIMELINE */}
              <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-800">
                  <Package className="text-orange-500" />
                  Journey Logs
                </h3>

                <div className="relative space-y-2">
                  {/* VERTICAL LINE - Changed to light gray */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-slate-100" />
                  
                  {trackingSteps.map((step, index) => {
                    const isDone = index <= currentStep;
                    const isCurrent = index === currentStep;

                    return (
                      <motion.div 
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative pl-10 pb-8 last:pb-0 flex items-start transition-all ${isDone ? "opacity-100" : "opacity-40"}`}
                      >
                        {/* DOT */}
                        <div className={`absolute left-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all ${
                          isCurrent ? "bg-orange-500 shadow-lg shadow-orange-200" : 
                          isDone ? "bg-emerald-500" : "bg-slate-100"
                        }`}>
                          {isDone ? (
                            <CheckCircle2 size={16} className="text-white" />
                          ) : (
                            <Circle size={12} className="text-slate-300" />
                          )}
                        </div>

                        <div>
                          <p className={`text-sm font-bold ${isCurrent ? "text-orange-600 text-lg" : "text-slate-700"}`}>
                            {step}
                          </p>
                          {isCurrent && (
                            <motion.span 
                              layoutId="active-pill"
                              className="inline-block px-2 py-0.5 mt-1 bg-orange-100 text-orange-600 text-[10px] font-black rounded uppercase tracking-tighter"
                            >
                              Live Status
                            </motion.span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailItem({ label, value, highlight, textRight }) {
  return (
    <div className={textRight ? "text-right" : ""}>
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{label}</p>
      <p className={`font-semibold ${highlight ? "text-orange-600" : "text-slate-700"}`}>{value}</p>
    </div>
  );
}