import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Track() {

  const [invoice, setInvoice] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  const statusSteps = [
    "DOCUMENT RECEIVED",
    "DOCUMENT PROCESSING",
    "APPROVALS PENDING",
    "UNDER CLEARANCE",
    "CLEARANCE COMPLETED",
    "DELIVERED AT PLACE"
  ];

  const handleTrack = async () => {
    try {
      const docRef = doc(db, "shipments", invoice);
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

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Track Your Shipment
        </h1>

        <div className="flex gap-4 mb-6">
          <input
            placeholder="Enter Job Number"
            className="flex-1 border p-3 rounded-lg"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />

          <button
            onClick={handleTrack}
            className="bg-purple-600 text-white px-6 rounded-lg"
          >
            Track
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {shipment && (
          <div>

            <div className="mb-6">
              <p><strong>Customer:</strong> {shipment.customerName}</p>
              <p><strong>Origin:</strong> {shipment.origin}</p>
              <p><strong>Destination:</strong> {shipment.destination}</p>
              <p><strong>Current Location:</strong> {shipment.currentLocation}</p>
            </div>

            {/* Timeline */}
            <div className="mt-6">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex items-center mb-4">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      index <= currentStep
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <p className="ml-4">{step}</p>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <div className="mt-8 text-center">
              <a
                href={`https://wa.me/?text=Hello UNEX, I need support for shipment ${invoice}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
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
