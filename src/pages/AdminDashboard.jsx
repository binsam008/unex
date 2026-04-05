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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10 font-outfit relative overflow-hidden">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-orange-400/10 blur-[120px]" />
      </div>

      {!user ? (
        <div className="flex h-[80vh] items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white flex flex-col items-center text-center max-w-sm"
          >
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-4">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
            <p className="text-slate-500 mb-6">Please log in with administrator credentials to view this dashboard.</p>
          </motion.div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-8 pt-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-sm border border-slate-200"
          >
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                <span className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/30">
                  <Package size={24}/>
                </span>
                Shipment Control Center
              </h1>
              <p className="text-slate-500 mt-1 md:ml-14">Manage and track all logistics operations in real-time.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-sm font-semibold flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 Live Updates
               </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* INBOX/FORM PANEL */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 rounded-3xl p-8 border border-white"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {isEditing ? <><Edit2 className="text-orange-500" /> Edit Shipment #{formData.invoice}</> : <><Package className="text-blue-500" /> Create New Shipment</>}
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <InputField icon={<Package/>} placeholder="Invoice Number" value={formData.invoice} disabled={isEditing} onChange={(e) => setFormData({ ...formData, invoice: e.target.value })} />
                <InputField icon={<User/>} placeholder="Customer Name" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                <InputField icon={<Mail/>} placeholder="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <InputField icon={<Phone/>} placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <InputField icon={<PlaneTakeoff/>} placeholder="Origin" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} />
                <InputField icon={<MapPin/>} placeholder="Destination" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} />
                
                <InputField icon={<Package/>} placeholder="Logistics Type (e.g. Air, Sea)" value={formData.logisticsType} onChange={(e) => setFormData({ ...formData, logisticsType: e.target.value })} />
                <InputField icon={<Package/>} placeholder="Shipment Type (e.g. Standard)" value={formData.shipmentType} onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value })} />
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Navigation size={18} />
                  </div>
                  <select
                    value={formData.currentStep}
                    onChange={(e) => setFormData({ ...formData, currentStep: Number(e.target.value) })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none font-medium cursor-pointer"
                  >
                    {trackingSteps.map((step, i) => (
                      <option key={i} value={i}>{step}</option>
                    ))}
                  </select>
                </div>

                <InputField icon={<MapPin/>} placeholder="Current Location" value={formData.currentLocation} onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 text-white font-semibold rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 shadow-xl shadow-slate-900/20"
                >
                  <Save size={20} />
                  {loading ? "Processing..." : isEditing ? "Update Shipment" : "Save Shipment"}
                </button>

                <button
                  onClick={nextStep}
                  disabled={formData.currentStep >= trackingSteps.length - 1}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 text-slate-800 font-semibold rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-800 disabled:active:scale-100"
                >
                  Next Step 
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>

            {/* SHIPMENTS LIST PANEL */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              <div className="bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 rounded-3xl p-6 border border-white flex-1 flex flex-col max-h-[800px]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Active Shipments</h2>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{shipments.length} Total</span>
                </div>

                <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1 pb-4" style={{scrollbarWidth: 'thin'}}>
                  <AnimatePresence>
                    {shipments.map((ship, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0 }}
                        key={ship.id}
                        className="bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-100 p-4 rounded-2xl flex flex-col gap-3 transition-colors group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{ship.id}</p>
                            <p className="text-sm text-slate-500 font-medium truncate w-32" title={ship.customerName}>{ship.customerName}</p>
                          </div>
                          <div className="flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(ship)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(ship.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 mb-1 overflow-hidden">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(ship.currentStep / (trackingSteps.length - 1)) * 100}%` }}></div>
                        </div>
                        <p className="text-[11px] font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded-lg self-start">
                          {trackingSteps[ship.currentStep]}
                        </p>
                      </motion.div>
                    ))}

                    {shipments.length === 0 && (
                      <div className="text-center py-10 flex flex-col items-center">
                        <Package className="text-slate-300 w-12 h-12 mb-3" />
                        <p className="text-slate-500 font-medium">No shipments found</p>
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
    <div className={`relative group ${disabled ? 'opacity-60' : ''}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <input
        {...props}
        disabled={disabled}
        className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
      />
    </div>
  );
}