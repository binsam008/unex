"use client";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function Track() {
  const [invoice, setInvoice] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const trackingSteps = [
    "Shipment Information Received",
    "Picked Up",
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
  const history = shipment?.history || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-slate-100 text-slate-900 py-26 px-4 font-outfit relative overflow-hidden">

      <div className="max-w-5xl mx-auto relative z-10">

        {/* COMPACT SEARCH HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2.5 bg-red-600 rounded-xl shadow-md shadow-red-500/10 mb-4 text-white font-black text-xs tracking-widest px-5">
            CARGO TRACKING
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Shipment</span>
          </h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium text-base">Enter tracking number for real-time updates.</p>

          <div className="relative max-w-lg mx-auto">
            <input
              placeholder="e.g. UNX-882100"
              className="w-full bg-white/80 backdrop-blur-md border border-white p-4 pl-6 rounded-full shadow-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all pr-32 text-slate-800 text-base font-semibold placeholder:font-normal placeholder:opacity-50 uppercase tracking-wider"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-red-600 text-white px-8 rounded-full transition-all shadow-sm active:scale-95 text-sm font-bold flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                "Track"
              )}
            </button>
          </div>
          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-rose-500 mt-4 text-sm font-bold bg-rose-50 inline-block px-4 py-2 rounded-md">
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {shipment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* LEFT COLUMN: SHIPMENT TICKET */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">

                  <div className="mb-8 relative z-10">
                    <span className="text-[10px] tracking-[0.2em] text-red-600 font-bold uppercase bg-red-50 px-2 py-1.5 rounded-md">Tracking ID</span>
                    <h2 className="text-3xl font-mono font-black text-slate-800 mt-2 tracking-tight">{invoice}</h2>
                  </div>

                  <div className="space-y-6 relative z-10 p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                    <DetailItem label="From Origin" value={shipment.origin} />

                    <div className="py-2 flex items-center gap-3 opacity-30">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <div className="w-1 h-1 rounded-full bg-slate-400" />
                      <div className="w-1 h-1 rounded-full bg-slate-400" />
                      <div className="flex-1 h-[1px] bg-slate-400" />
                      <div className="w-2 h-2 rounded-full border border-slate-500" />
                    </div>

                    <DetailItem label="To Destination" value={shipment.destination} highlight />
                  </div>

                  <div className="mt-6 flex justify-between gap-2 bg-slate-900 text-white p-4 rounded-xl relative z-10">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Recipient</p>
                      <p className="font-semibold text-sm truncate max-w-[110px]">{shipment.customerName}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Logistics</p>
                      <p className="font-semibold text-sm">{shipment.logisticsType || "Sea"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Shipment</p>
                      <p className="font-semibold text-sm">{shipment.shipmentType || "FCL"}</p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/9188108851?text=Hello UNEX, I need an update on shipment ${invoice}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex items-center justify-center w-full py-3.5 text-sm bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/20 rounded-xl transition-all font-bold hover:bg-[#25D366] hover:text-white"
                  >
                    WhatsApp Support
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: VERTICAL TIMELINE */}
              <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50">
                <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-800">
                    Journey Logs
                  </h3>
                  <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full animate-pulse">
                    LIVE
                  </span>
                </div>

                <div className="relative space-y-0 pl-1">
                  {/* VERTICAL LINE - Using gradient fill based on progress */}
                  <div className="absolute left-[19px] top-4 bottom-8 w-[2px] bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(currentStep / (trackingSteps.length - 1)) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="w-full bg-gradient-to-b from-red-500 to-orange-500"
                    />
                  </div>

                  {trackingSteps.map((step, index) => {
                    const isDone = index <= currentStep;
                    const isCurrent = index === currentStep;

                    const historyEntry = history.find(h => h.step === step);
                    let dateStr = "";
                    let timeStr = "";
                    if (historyEntry && historyEntry.date) {
                      const d = new Date(historyEntry.date);
                      dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                      timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    }

                    return (
                      <motion.div
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative pl-12 pb-8 last:pb-0 flex items-start transition-all duration-300 ${isDone ? "opacity-100" : "opacity-40 grayscale"}`}
                      >
                        {/* DOT / STATUS ICON */}
                        <div className={`absolute -left-1 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${isCurrent ? "bg-white border-[3px] border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)] scale-105" :
                          isDone ? "bg-gradient-to-br from-red-500 to-orange-500 shadow-sm border-2 border-white" : "bg-white border-2 border-slate-200"
                          }`}>
                          {isCurrent ? (
                            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                          ) : isDone ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                          )}
                        </div>

                        <div className="flex-1 bg-white border border-slate-50 hover:bg-slate-50/50 hover:border-slate-100 p-4 rounded-xl shadow-sm transition-all -mt-2">
                          <p className={`text-sm md:text-base font-bold ${isCurrent ? "text-orange-600" : "text-slate-800"}`}>
                            {step}
                          </p>

                          {/* Details & Timestamp */}
                          {(isDone && historyEntry) ? (
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500">
                              {historyEntry.location && (
                                <div className="bg-slate-100/80 px-2 py-1 rounded">
                                  {historyEntry.location}
                                </div>
                              )}
                              <div className="bg-slate-100/80 px-2 py-1 rounded text-slate-400">
                                {dateStr} • {timeStr}
                              </div>
                            </div>
                          ) : (
                            isCurrent && shipment.currentLocation && (
                              <div className="mt-2 bg-orange-50 px-2 py-1 text-[11px] text-orange-700 font-bold rounded w-fit">
                                Current: {shipment.currentLocation}
                              </div>
                            )
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

function DetailItem({ label, value, highlight }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5 flex items-center gap-1">
        {label}
      </p>
      <p className={`font-bold text-[15px] ${highlight ? "text-red-600" : "text-slate-800"}`}>{value}</p>
    </div>
  );
}