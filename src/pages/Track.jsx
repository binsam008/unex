import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Track() {

  const [invoice, setInvoice] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  // ✅ Full status list (same as Admin)
  const statusSteps = [
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

  const handleTrack = async () => {
    if (!invoice) return;

    try {
      const docRef = doc(db, "shipments", invoice.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setShipment(docSnap.data());
        setError("");
      } else {
        setShipment(null);
        setError("Shipment not found");
      }
    } catch (err) {
      setError("Error fetching shipment");
    }
  };

  const currentStep = shipment
    ? statusSteps.indexOf(shipment.status)
    : -1;

  // ✅ Auto scroll to active step
  useEffect(() => {
    if (currentStep >= 0) {
      const element = document.getElementById(`step-${currentStep}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Track Your Shipment
        </h1>

        {/* Search Section */}
        <div className="flex gap-4 mb-6">
          <input
            placeholder="Enter Job Number"
            className="flex-1 border p-3 rounded-lg"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />

          <button
            onClick={handleTrack}
            className="bg-purple-600 text-white px-6 rounded-lg hover:bg-purple-500 transition"
          >
            Track
          </button>
        </div>

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        {shipment && (
          <div>

            {/* Shipment Info */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <p><strong>Customer:</strong> {shipment.customerName}</p>
              <p><strong>Origin:</strong> {shipment.origin}</p>
              <p><strong>Destination:</strong> {shipment.destination}</p>
              <p><strong>Current Location:</strong> {shipment.currentLocation}</p>
              <p><strong>Status:</strong> {shipment.status}</p>
            </div>

            {/* Animated Timeline */}
            <div className="mt-6 relative">

              {statusSteps.map((step, index) => {

                const isActive = index <= currentStep;

                return (
                  <div
                    key={index}
                    id={`step-${index}`}
                    className="flex items-center mb-10 relative"
                  >

                    {/* Vertical Line */}
                    {index !== statusSteps.length - 1 && (
                      <div
                        className={`absolute left-3 top-6 w-1 h-12 transition-all duration-500 ${
                          isActive
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    )}

                    {/* Circle */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white transition-all duration-500 ${
                        isActive
                          ? "bg-green-500 scale-110"
                          : "bg-gray-300"
                      }`}
                    >
                      {isActive ? "✓" : ""}
                    </div>

                    {/* Step Text */}
                    <p
                      className={`ml-6 transition-all duration-500 ${
                        isActive
                          ? "text-green-600 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </p>

                  </div>
                );
              })}

            </div>

            {/* WhatsApp Support */}
            <div className="mt-10 text-center">
              <a
                href={`https://wa.me/?text=Hello UNEX, I need support for shipment ${invoice}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition"
              >
                Contact Support on WhatsApp
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
