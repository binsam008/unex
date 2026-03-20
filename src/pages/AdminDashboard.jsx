"use client";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

/* ✅ SIMPLE TRACKING STEPS */
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
  const [previousStep, setPreviousStep] = useState(null);

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

  /* ✅ FETCH */
  const fetchShipments = async () => {
    const querySnapshot = await getDocs(collection(db, "shipments"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setShipments(data);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  /* ✅ SAVE / UPDATE */
  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "shipments", formData.invoice);
      const existingDoc = await getDoc(docRef);

      let updatedHistory = [];

      if (existingDoc.exists()) {
        updatedHistory = existingDoc.data().history || [];
      }

      const newEntry = {
        step: trackingSteps[formData.currentStep],
        location: formData.currentLocation,
        date: formData.lastUpdated
      };

      // ✅ Only add new history if step changed
      if (!isEditing || previousStep !== formData.currentStep) {
        updatedHistory.push(newEntry);
      }

      const cleanData = {
        ...formData,
        currentStep: formData.currentStep,
        history: updatedHistory
      };

      await setDoc(docRef, cleanData);

      /* ✅ EMAILJS SEND */
      if (!isEditing || previousStep !== formData.currentStep) {
        const params = {
          customer_name: formData.customerName,
          invoice: formData.invoice,
          status: trackingSteps[formData.currentStep],
          location: formData.currentLocation,
          to_email: formData.email
        };

        await emailjs.send(
          "service_t60r5r6",
          "template_1hwc68h",
          params,
          "6mzefNX56lFODJ5ZM"
        );
      }

      alert(isEditing ? "Shipment Updated Successfully" : "Shipment Created Successfully");

      resetForm();
      fetchShipments();

    } catch (error) {
      console.error(error);
      alert("Error saving shipment");
    }
  };

  /* ✅ RESET */
  const resetForm = () => {
    setIsEditing(false);
    setPreviousStep(null);
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
    await deleteDoc(doc(db, "shipments", id));
    fetchShipments();
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

    setPreviousStep(ship.currentStep);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ✅ NEXT STEP BUTTON */
  const nextStep = () => {
    if (formData.currentStep < trackingSteps.length - 1) {
      setFormData({
        ...formData,
        currentStep: formData.currentStep + 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-8 font-outfit py-24">

      {/* FORM */}
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl mx-auto border">

        <h1 className="text-3xl font-bold mb-10 text-[#0A1D45]">
          Shipment Management
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <FormInput label="Invoice Number" disabled={isEditing}
            value={formData.invoice}
            onChange={(e) => setFormData({ ...formData, invoice: e.target.value })}
          />

          <FormInput label="Customer Name"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          />

          <FormInput label="Customer Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <FormInput label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          {/* <FormSelect label="Logistics Type" value={formData.logisticsType}
            options={["Sea", "Air", "Road"]}
            onChange={(e) => setFormData({ ...formData, logisticsType: e.target.value })}
          /> */}

          {/* <FormSelect label="Shipment Type" value={formData.shipmentType}
            options={["FCL", "LCL"]}
            onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value })}
          /> */}

          <FormInput label="Origin"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
          />

          <FormInput label="Destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />

          {/* ✅ STEP SELECT */}
          <FormSelect
            full
            label="Tracking Step"
            value={formData.currentStep}
            options={trackingSteps.map((step, i) => ({
              label: step,
              value: i
            }))}
            onChange={(e) =>
              setFormData({ ...formData, currentStep: Number(e.target.value) })
            }
          />

          <FormInput label="Last Updated" type="date"
            value={formData.lastUpdated}
            onChange={(e) => setFormData({ ...formData, lastUpdated: e.target.value })}
          />

          <FormInput label="Current Location"
            value={formData.currentLocation}
            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
          />

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-10">

          <button
            onClick={handleSubmit}
            className="flex-1 py-4 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-400"
          >
            {isEditing ? "Update Shipment" : "Save Shipment"}
          </button>

          <button
            onClick={nextStep}
            className="flex-1 py-4 text-white text-lg font-semibold rounded-xl bg-blue-600"
          >
            Next Step →
          </button>

        </div>

      </div>

      {/* LIST */}
      <div className="max-w-5xl mx-auto mt-12">

        <h2 className="text-2xl font-bold mb-4 text-[#0A1D45]">All Shipments</h2>

        <div className="space-y-4">
          {shipments.map((ship) => (
            <div key={ship.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center border hover:shadow-lg transition"
            >
              <div>
                <p className="font-semibold text-[#0A1D45]">{ship.id}</p>
                <p>{ship.customerName}</p>
                <p className="text-sm text-gray-500">
                  {trackingSteps[ship.currentStep]}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(ship)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(ship.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* COMPONENTS */

function FormInput({ label, full, type = "text", ...props }) {
  return (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <label className="block mb-1 font-semibold text-[#0A1D45]">{label}</label>
      <input
        type={type}
        className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400"
        {...props}
      />
    </div>
  );
}

function FormSelect({ label, options, full, ...props }) {
  return (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <label className="block mb-1 font-semibold text-[#0A1D45]">{label}</label>
      <select
        className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400"
        {...props}
      >
        {options.map((op, i) => (
          <option key={i} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
}