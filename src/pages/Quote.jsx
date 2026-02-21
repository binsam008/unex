import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Package, Weight, Ship } from "lucide-react";

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
    message: "",
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
      to_email: "unexlogistics@gmail.com",
    };

    emailjs
      .send(
        "service_kmgfchc",
        "template_ct2q9y4",
        templateParams,
        "6mzefNX56lFODJ5ZM"
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
          message: "",
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send request ❌");
      });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-20 px-6 font-outfit">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-[#0A1D45]">
          Request a Shipping Quote
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Fill in the details below and our team will contact you shortly.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">

          <InputField
            label="Full Name"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
          />

          <InputField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <InputField
            label="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          {/* SHIPMENT TYPE */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 font-archivo">
              Shipment Type
            </label>
            <select
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              value={formData.shipmentType}
              onChange={(e) =>
                setFormData({ ...formData, shipmentType: e.target.value })
              }
            >
              <option>Sea</option>
              <option>Air</option>
              <option>Road</option>
            </select>
          </div>

          <InputField
            label="Origin (From)"
            value={formData.origin}
            onChange={(e) =>
              setFormData({ ...formData, origin: e.target.value })
            }
          />

          <InputField
            label="Destination (To)"
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
          />

          <InputField
            label="Cargo Type"
            value={formData.cargoType}
            onChange={(e) =>
              setFormData({ ...formData, cargoType: e.target.value })
            }
          />

          <InputField
            label="Weight (KG)"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />

          {/* MESSAGE */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 font-archivo">
              Additional Message
            </label>
            <textarea
              rows={4}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 bg-orange-500 hover:bg-orange-400 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}

/* REUSABLE INPUT FIELD */
function InputField({ label, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1 font-archivo">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
      />
    </div>
  );
}