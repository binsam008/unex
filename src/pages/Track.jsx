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
    "Handover To Airline",
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

  const currentStep = shipment ? (shipment.currentStep ?? 0) : -1;
  const history = shipment?.history || [];

  const formatTimestamp = (dateInput) => {
    if (!dateInput) return "";
    try {
      const d = new Date(dateInput);
      if (isNaN(d.getTime())) return String(dateInput);
      const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return `${dateStr} • ${timeStr}`;
    } catch (e) {
      return String(dateInput);
    }
  };

  // Determine timeline items: use history list if available, or fall back to steps
  const displayItems = history.length > 0 ? history : trackingSteps.map((step, idx) => ({
    step,
    statusText: step,
    date: idx <= currentStep ? (shipment?.lastUpdated || "") : "",
    location: idx === currentStep ? (shipment?.currentLocation || "") : ""
  }));

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
              placeholder="INVOICE-NUMBER"
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

                  <div className="mb-6 relative z-10">
                    <span className="text-[10px] tracking-[0.2em] text-red-600 font-bold uppercase bg-red-50 px-2 py-1.5 rounded-md">Tracking ID</span>
                    <h2 className="text-3xl font-mono font-black text-slate-800 mt-2 tracking-tight">{invoice}</h2>
                  </div>

                  {/* LATEST TEXT UPDATE HIGHLIGHT BANNER */}
                  {(shipment.updateText || (history.length > 0 && (history[history.length - 1].statusText || history[history.length - 1].step))) && (
                    <div className="mb-6 p-4 bg-emerald-50/90 border border-emerald-200/70 rounded-2xl flex items-start gap-3 shadow-sm relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse mt-0.5 flex-shrink-0 ring-4 ring-emerald-500/20" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-emerald-800 tracking-widest">Latest Status Update</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">
                          {shipment.updateText || history[history.length - 1].statusText || history[history.length - 1].step}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {(shipment.lastUpdated || (history.length > 0 && history[history.length - 1].date)) && (
                            <span className="text-[11px] text-emerald-700 font-semibold">
                              🕒 {formatTimestamp(shipment.lastUpdated || history[history.length - 1].date)}
                            </span>
                          )}
                          {(shipment.updatedBy || (history.length > 0 && history[history.length - 1].updatedBy)) && (
                            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200/60">
                              👤 Updated by: {shipment.updatedBy || history[history.length - 1].updatedBy}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

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
                    href={`https://wa.me/918277287881?text=${encodeURIComponent(`Hello UNEX, I need an update on shipment ${invoice}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 text-sm bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30 rounded-xl transition-all font-bold hover:bg-[#25D366] hover:text-white group shadow-sm"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="transition-transform group-hover:scale-110"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>WhatsApp Support</span>
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: VERTICAL TIMELINE WITH GREEN DOTS */}
              <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50">
                <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    Journey Logs & Status Updates
                  </h3>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full animate-pulse flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> LIVE UPDATES
                  </span>
                </div>

                <div className="relative space-y-0 pl-1">
                  {/* VERTICAL GREEN LINE */}
                  <div className="absolute left-[19px] top-4 bottom-8 w-[3px] bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="w-full bg-gradient-to-b from-emerald-500 via-green-400 to-emerald-600"
                    />
                  </div>

                  {displayItems.map((item, index) => {
                    const isLatest = index === displayItems.length - 1;
                    const textContent = item.statusText || item.step || "Shipment Update";
                    const itemLocation = item.location || (isLatest ? shipment.currentLocation : "");
                    const itemDate = item.date || item.timestamp;
                    const itemUpdatedBy = item.updatedBy || (isLatest ? shipment.updatedBy : "");

                    return (
                      <motion.div
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.08 }}
                        className="relative pl-12 pb-8 last:pb-0 flex items-start transition-all duration-300"
                      >
                        {/* GREEN DOT / STATUS ICON */}
                        <div className={`absolute -left-1 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${isLatest
                          ? "bg-white border-[3px] border-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.5)] scale-110"
                          : "bg-emerald-500 shadow-md shadow-emerald-500/20 border-2 border-white"
                          }`}>
                          {isLatest ? (
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                          )}
                        </div>

                        <div className={`flex-1 bg-white border p-4 rounded-xl shadow-sm transition-all -mt-2 ${isLatest ? "border-emerald-300 shadow-emerald-500/5 ring-2 ring-emerald-500/10" : "border-slate-100 hover:border-emerald-200"
                          }`}>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <p className={`text-sm md:text-base font-bold ${isLatest ? "text-emerald-700" : "text-slate-800"}`}>
                              {textContent}
                            </p>
                            {isLatest && (
                              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                                Current
                              </span>
                            )}
                          </div>

                          {/* Details & Manual Timestamp */}
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
                            {itemLocation && (
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(itemLocation)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors border border-slate-200/60"
                                title="Open Location Map"
                              >
                                📍 {itemLocation} <span className="text-[9px] opacity-60">↗</span>
                              </a>
                            )}
                            {itemDate && (
                              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1">
                                🕒 {formatTimestamp(itemDate)}
                              </div>
                            )}
                            {itemUpdatedBy && (
                              <div className="bg-slate-100 text-slate-700 border border-slate-200/60 px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1">
                                👤 {itemUpdatedBy}
                              </div>
                            )}
                          </div>

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
  const mapsUrl = value ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}` : null;

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5 flex items-center gap-1">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-[15px] ${highlight ? "text-red-600" : "text-slate-800"}`}>{value}</p>
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 hover:underline bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md transition-all"
            title="View Map"
          >
            🗺️ Maps ↗
          </a>
        )}
      </div>
    </div>
  );
}