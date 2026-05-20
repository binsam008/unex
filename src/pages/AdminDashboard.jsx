"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import emailjs from "@emailjs/browser";
import {
  Package, MapPin, User, Mail, Phone, PlaneTakeoff, Navigation,
  Edit2, Trash2, ArrowRight, Save, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ✅ TRACKING STEPS */
const trackingSteps = [
  "Shipment Information Received",
  "Picked Up",
  "Handover To Airline",
  "Arrived Hub",
  "Custom Clearance In Progress",
  "Out For Delivery",
  "Delivered"
];

export default function AdminDashboard() {

  const [shipments, setShipments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    invoice: "",
    customerName: "",
    email: "",
    phone: "",
    logisticsType: "Sea",
    shipmentType: "FCL",
    origin: "",
    destination: "",
    currentStep: 0,
    currentLocation: "",
    lastUpdated: "",
    history: []
  });

  /* ✅ AUTH + FETCH */
  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("✅ Logged in UID:", currentUser.uid);
        setUser(currentUser);

        // 🔥 Firestore listener ONLY after login
        unsubscribeSnapshot = onSnapshot(
          collection(db, "shipments"),
          (snapshot) => {
            const data = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));

            data.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            setShipments(data);
          }
        );

      } else {
        console.log("❌ User not logged in");
        setUser(null);
        setShipments([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  /* ✅ SAVE / UPDATE */
  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in");
      return;
    }

    try {
      if (!formData.invoice) {
        alert("Invoice is required");
        return;
      }

      setLoading(true);

      const docRef = doc(db, "shipments", formData.invoice);
      const existingDoc = await getDoc(docRef);

      let updatedHistory = existingDoc.exists()
        ? existingDoc.data().history || []
        : [];

      const newEntry = {
        step: trackingSteps[formData.currentStep],
        location: formData.currentLocation,
        date: new Date().toISOString()
      };

      const lastHistory = updatedHistory[updatedHistory.length - 1];

      if (!lastHistory || lastHistory.step !== newEntry.step) {
        updatedHistory.push(newEntry);
      }

      const cleanData = {
        ...formData,
        lastUpdated: new Date().toISOString(),
        history: updatedHistory
      };

      await setDoc(docRef, cleanData);

      /* ✅ EMAILJS */
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE,
          import.meta.env.VITE_EMAILJS_TEMPLATE,
          {
            customer_name: formData.customerName,
            invoice: formData.invoice,
            status: trackingSteps[formData.currentStep],
            location: formData.currentLocation,
            to_email: formData.email
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (err) {
        console.warn("Email failed (non-blocking)", err);
      }

      alert(isEditing ? "Shipment Updated" : "Shipment Created");

      resetForm();
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("Error saving shipment");
      setLoading(false);
    }
  };

  /* ✅ RESET */
  const resetForm = () => {
    setIsEditing(false);

    setFormData({
      invoice: "",
      customerName: "",
      email: "",
      phone: "",
      logisticsType: "Sea",
      shipmentType: "FCL",
      origin: "",
      destination: "",
      currentStep: 0,
      currentLocation: "",
      lastUpdated: "",
      history: []
    });
  };

  /* ✅ DELETE */
  const handleDelete = async (id) => {
    if (!user) return alert("Login required");

    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteDoc(doc(db, "shipments", id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  /* ✅ EDIT */
  const handleEdit = (ship) => {
    setFormData({
      invoice: ship.id,
      customerName: ship.customerName,
      email: ship.email,
      phone: ship.phone,
      logisticsType: ship.logisticsType,
      shipmentType: ship.shipmentType,
      origin: ship.origin,
      destination: ship.destination,
      currentStep: ship.currentStep,
      currentLocation: ship.currentLocation,
      lastUpdated: ship.lastUpdated,
      history: ship.history || []
    });

    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ✅ NEXT STEP */
  const nextStep = () => {
    if (formData.currentStep < trackingSteps.length - 1) {
      setFormData({
        ...formData,
        currentStep: formData.currentStep + 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-outfit relative pb-12">
      
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm px-6 md:px-10 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-4 md:gap-6">
          <img src="/logo.png" alt="Unex Logistics" className="h-8 md:h-10 object-contain drop-shadow-sm" />
          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:flex items-center gap-2">
            <span className="text-blue-600">Admin</span> Portal
          </h1>
        </div>
        <div className="flex items-center gap-4">
           {user && (
             <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm pointer-events-none">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               Live System
             </div>
           )}
        </div>
      </nav>

      {!user ? (
        <div className="flex h-[80vh] items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200 flex flex-col items-center text-center max-w-sm w-full"
          >
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50">
              <ShieldAlert size={36} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
            <p className="text-slate-500 mb-6 font-medium">Please sign in as an administrator to access the control center.</p>
          </motion.div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-8 space-y-8">
          
          {/* Header Dashboard Summary */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Shipment Management</h2>
              <p className="text-slate-500 mt-2 font-medium text-lg">Create, edit, and monitor global logistics operations.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-all w-full md:w-auto justify-between md:justify-start">
                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Navigation size={24} />
                 </div>
                 <div className="flex flex-col text-right md:text-left">
                   <span className="text-xs font-bold text-slate-400 border-slate-200 uppercase tracking-widest">Active Shipments</span>
                   <span className="text-3xl font-black text-slate-800 leading-none mt-1">{shipments.length}</span>
                 </div>
               </div>
            </div>
          </motion.div>

          <div className="grid xl:grid-cols-12 gap-8">
            
            {/* INBOX/FORM PANEL */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-8 bg-white shadow-lg shadow-slate-200/40 rounded-[2rem] p-6 md:p-8 border border-slate-200 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  {isEditing ? (
                    <><span className="text-orange-500 bg-orange-50 p-2 rounded-xl"><Edit2 size={24} /></span> Modify Shipment <span className="text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-lg ml-2 border border-blue-100">#{formData.invoice}</span></>
                  ) : (
                    <><span className="text-blue-600 bg-blue-50 p-2 rounded-xl"><Package size={24} /></span> Create New Shipment</>
                  )}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                <InputField icon={<Package/>} placeholder="Invoice Number" value={formData.invoice} disabled={isEditing} onChange={(e) => setFormData({ ...formData, invoice: e.target.value })} />
                <InputField icon={<User/>} placeholder="Customer Name" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                <InputField icon={<Mail/>} placeholder="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <InputField icon={<Phone/>} placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <InputField icon={<PlaneTakeoff/>} placeholder="Origin Location" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} />
                <InputField icon={<MapPin/>} placeholder="Destination Location" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} />
                
                <InputField icon={<Package/>} placeholder="Logistics Mode (e.g. Air, Sea)" value={formData.logisticsType} onChange={(e) => setFormData({ ...formData, logisticsType: e.target.value })} />
                <InputField icon={<Package/>} placeholder="Container Type (e.g. LCL, FCL)" value={formData.shipmentType} onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value })} />
                
                <div className="relative group col-span-1 md:col-span-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Navigation size={18} strokeWidth={2.5}/>
                  </div>
                  <select
                    value={formData.currentStep}
                    onChange={(e) => setFormData({ ...formData, currentStep: Number(e.target.value) })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none font-medium cursor-pointer hover:border-slate-300"
                  >
                    {trackingSteps.map((step, i) => (
                      <option key={i} value={i} className="text-slate-800">{step}</option>
                    ))}
                  </select>
                </div>

                <InputField icon={<MapPin/>} placeholder="Current Location Details" value={formData.currentLocation} onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-3 py-4 px-6 text-white font-bold rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 shadow-md shadow-blue-500/20"
                >
                  <Save size={20} />
                  {loading ? "Processing Update..." : isEditing ? "Save Modifications" : "Initialize Shipment"}
                </button>

                <button
                  onClick={nextStep}
                  disabled={formData.currentStep >= trackingSteps.length - 1}
                  className="flex-1 flex items-center justify-center gap-3 py-4 px-6 text-slate-700 font-bold rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:bg-slate-100 disabled:active:scale-100"
                >
                  Advance Status Step 
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>

            {/* SHIPMENTS LIST PANEL */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-4 flex flex-col space-y-6"
            >
              <div className="bg-white shadow-lg shadow-slate-200/40 rounded-[2rem] p-6 border border-slate-200 flex-1 flex flex-col h-[850px]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    Recent Shipments
                  </h2>
                </div>

                <div className="overflow-y-auto pr-2 space-y-4 custom-scrollbar flex-1 pb-4" style={{scrollbarWidth: 'none'}}>
                  <AnimatePresence>
                    {shipments.map((ship, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0 }}
                        key={ship.id}
                        className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg p-5 rounded-2xl flex flex-col gap-3 transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base">{ship.id}</p>
                            <p className="text-sm text-slate-500 font-medium truncate w-40 mt-0.5" title={ship.customerName}>
                              {ship.customerName}
                            </p>
                          </div>
                          <div className="flex gap-1.5 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(ship)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(ship.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 mb-1 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${(ship.currentStep / (trackingSteps.length - 1)) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 inline-block px-2 py-1 rounded-md">
                            {trackingSteps[ship.currentStep]}
                          </span>
                          <span className="text-[11px] text-slate-400 font-bold">
                            {Math.round((ship.currentStep / (trackingSteps.length - 1)) * 100)}%
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {shipments.length === 0 && (
                      <div className="text-center py-16 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                          <Package className="text-slate-300 w-8 h-8" />
                        </div>
                        <p className="text-slate-500 font-semibold text-lg">No records found</p>
                        <p className="text-slate-400 text-sm mt-1">Add a shipment to populate this list.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      )}
    </div>
  );
}

// Custom Input Field Helper
function InputField({ icon, disabled, ...props }) {
  return (
    <div className={`relative group ${disabled ? 'opacity-50' : ''}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
        {React.cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
      </div>
      <input
        {...props}
        disabled={disabled}
        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium hover:border-slate-300 disabled:hover:border-slate-200"
      />
    </div>
  );
}