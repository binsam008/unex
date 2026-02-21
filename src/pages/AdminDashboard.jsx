import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

export default function AdminDashboard() {

  const [shipments, setShipments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [previousStatus, setPreviousStatus] = useState(null);

  const [formData, setFormData] = useState({
    invoice: "",
    customerName: "",
    email: "",
    phone: "",
    logisticsType: "Sea",
    shipmentType: "FCL",
    origin: "",
    destination: "",
    status: "DOCUMENT RECEIVED",
    currentLocation: "",
    lastUpdated: ""
  });

  const statusOptions = [
    "DOCUMENT RECEIVED",
    "DOCUMENT PROCESSING",
    "APPROVALS PENDING",
    "APPROVALS PAYMENT DONE",
    "CDF PREPARED",
    "UNDER CLEARANCE DOCUMENTATION",
    "CDF PAYMENT PENDING",
    "DUTY & VAT PAYMENT DONE",
    "UNDER CLEARANCE",
    "CLEARANCE COMPLETED",
    "DELIVERED AT PLACE"
  ];

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

  const handleSubmit = async () => {
    try {
      const cleanData = {
        ...formData,
        logisticsType: formData.logisticsType || "Sea",
        shipmentType: formData.shipmentType || "FCL",
        status: formData.status || "DOCUMENT RECEIVED"
      };

      await setDoc(doc(db, "shipments", formData.invoice), cleanData);

      if (isEditing && previousStatus !== formData.status) {
        const params = {
          customer_name: formData.customerName,
          invoice: formData.invoice,
          status: formData.status,
          location: formData.currentLocation,
          to_email: formData.email
        };

        emailjs.send(
          "service_t60r5r6",
          "template_1hwc68h",
          params,
          "6mzefNX56lFODJ5ZM"
        );
      }

      alert(isEditing ? "Job Updated Successfully" : "Job Created Successfully");

      resetForm();
      fetchShipments();

    } catch (error) {
      console.error(error);
      alert("Error saving job");
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setPreviousStatus(null);
    setFormData({
      invoice: "",
      customerName: "",
      email: "",
      phone: "",
      logisticsType: "Sea",
      shipmentType: "FCL",
      origin: "",
      destination: "",
      status: "DOCUMENT RECEIVED",
      currentLocation: "",
      lastUpdated: ""
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "shipments", id));
    fetchShipments();
  };

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
      status: ship.status,
      currentLocation: ship.currentLocation,
      lastUpdated: ship.lastUpdated
    });

    setPreviousStatus(ship.status);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-8 font-outfit py-25">

      {/* MAIN FORM PANEL */}
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl mx-auto border border-gray-200">

        <h1 className="text-3xl font-bold mb-10 text-[#0A1D45]">
          UNEX Job Management
        </h1>

        {/* FORM GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          <FormInput label="Job Number" disabled={isEditing}
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

          <FormInput label="Phone (+91...)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <FormSelect label="Logistics Type" value={formData.logisticsType}
            options={["Sea", "Air", "Road"]}
            onChange={(e) => setFormData({ ...formData, logisticsType: e.target.value })}
          />

          <FormSelect label="Shipment Type" value={formData.shipmentType}
            options={["FCL", "LCL"]}
            onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value })}
          />

          <FormInput label="Origin"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
          />

          <FormInput label="Destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />

          <FormSelect full label="Shipment Status" value={formData.status}
            options={statusOptions}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          className="mt-10 w-full py-4 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg hover:opacity-90"
        >
          {isEditing ? "Update Job" : "Save Job"}
        </button>

      </div>

      {/* JOB LIST */}
      <div className="max-w-5xl mx-auto mt-12">

        <h2 className="text-2xl font-bold mb-4 text-[#0A1D45]">All Jobs</h2>

        <div className="space-y-4">
          {shipments.map((ship) => (
            <div key={ship.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center border border-gray-200 hover:shadow-lg transition"
            >
              <div>
                <p className="font-semibold text-[#0A1D45]">{ship.id}</p>
                <p>{ship.customerName}</p>
                <p className="text-sm text-gray-500">{ship.status}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(ship)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(ship.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
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
          <option key={i}>{op}</option>
        ))}
      </select>
    </div>
  );
}