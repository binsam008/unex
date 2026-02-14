import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Quote() {

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    shipmentType: "Sea",
    cargoType: "",
    weight: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      customer_name: formData.customerName,
      customer_email: formData.email,
      phone: formData.phone,
      origin: formData.origin,
      destination: formData.destination,
      shipment_type: formData.shipmentType,
      cargo_type: formData.cargoType,
      weight: formData.weight,
      message: formData.message,
      to_email: "unexlogistics@gmail.com" // ADMIN EMAIL
    };

    emailjs.send(
      "service_kmgfchc",        // your service ID
      "template_ct2q9y4",      // we will create this
      templateParams,
      "6mzefNX56lFODJ5ZM"        // your public key
    )
    .then(() => {
      alert("Quote Request Sent Successfully ✅");
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        origin: "",
        destination: "",
        shipmentType: "Sea",
        cargoType: "",
        weight: "",
        message: ""
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send request ❌");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Get a Shipping Quote
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          <input
            required
            placeholder="Full Name"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            className="border p-3 rounded-lg"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="border p-3 rounded-lg"
          />

          <input
            required
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="border p-3 rounded-lg"
          />

          <select
            value={formData.shipmentType}
            onChange={(e) => setFormData({...formData, shipmentType: e.target.value})}
            className="border p-3 rounded-lg"
          >
            <option>Sea</option>
            <option>Air</option>
            <option>Road</option>
          </select>

          <input
            required
            placeholder="Origin (From)"
            value={formData.origin}
            onChange={(e) => setFormData({...formData, origin: e.target.value})}
            className="border p-3 rounded-lg"
          />

          <input
            required
            placeholder="Destination (To)"
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Cargo Type"
            value={formData.cargoType}
            onChange={(e) => setFormData({...formData, cargoType: e.target.value})}
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Weight (KG)"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
            className="border p-3 rounded-lg"
          />

          <textarea
            placeholder="Additional Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg md:col-span-2 hover:bg-purple-500"
          >
            Submit Quote Request
          </button>

        </form>

      </div>
    </div>
  );
}
