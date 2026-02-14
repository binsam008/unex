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

      // ✅ EMAILJS (ONLY WHEN STATUS CHANGES)
      if (isEditing && previousStatus !== formData.status) {

const templateParams = {
  customer_name: formData.customerName,
  invoice: formData.invoice,
  status: formData.status,
  location: formData.currentLocation,
  to_email: formData.email,
  name: "UNEX Logistics",
  email: "support@unex.com"
};


        emailjs.send(
          "service_t60r5r6",
          "template_1hwc68h",
          templateParams,
          "6mzefNX56lFODJ5ZM"   // 🔥 replace this
        )
        .then(() => {
          alert("Status updated & email sent successfully ✅");
        })
        .catch((error) => {
          console.error("Email error:", error);
          alert("Email failed ❌");
        });
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
      invoice: ship.id || "",
      customerName: ship.customerName || "",
      email: ship.email || "",
      phone: ship.phone || "",
      logisticsType: ship.logisticsType || "Sea",
      shipmentType: ship.shipmentType || "FCL",
      origin: ship.origin || "",
      destination: ship.destination || "",
      status: ship.status || "DOCUMENT RECEIVED",
      currentLocation: ship.currentLocation || "",
      lastUpdated: ship.lastUpdated || ""
    });

    setPreviousStatus(ship.status);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          UNEX Job Management
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            value={formData.invoice}
            disabled={isEditing}
            placeholder="Job Number"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, invoice: e.target.value })
            }
          />

          <input
            value={formData.customerName}
            placeholder="Customer Name"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
          />

          <input
            value={formData.email}
            placeholder="Customer Email"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            value={formData.phone}
            placeholder="Phone (+91...)"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <select
            value={formData.logisticsType}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, logisticsType: e.target.value })
            }
          >
            <option>Sea</option>
            <option>Air</option>
            <option>Road</option>
          </select>

          <select
            value={formData.shipmentType}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, shipmentType: e.target.value })
            }
          >
            <option>FCL</option>
            <option>LCL</option>
          </select>

          <input
            value={formData.origin}
            placeholder="Origin"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, origin: e.target.value })
            }
          />

          <input
            value={formData.destination}
            placeholder="Destination"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
          />

          <select
            value={formData.status}
            className="border p-3 rounded-lg md:col-span-2"
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            {statusOptions.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>

          <input
            type="date"
            value={formData.lastUpdated}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, lastUpdated: e.target.value })
            }
          />

          <input
            value={formData.currentLocation}
            placeholder="Current Location"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, currentLocation: e.target.value })
            }
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90"
        >
          {isEditing ? "Update Job" : "Save Job"}
        </button>

      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">All Jobs</h2>

        <div className="space-y-4">
          {shipments.map((ship) => (
            <div
              key={ship.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{ship.id}</p>
                <p>{ship.customerName}</p>
                <p className="text-sm text-gray-600">{ship.status}</p>
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
