import { Phone, MapPin, User, MessageCircle } from "lucide-react";

export default function ContactOffices() {
  const branches = [
    {
      title: "Bangalore Office (Head)",
      head: "Contact Person: Krishna",
      address:
        "No-33, 1st Main Road, SR Nagar, Near IBIS Hotel, Bangalore - 560027\nAirport office address: Please collect from Krishna",
      phone: "+91 99887 66554",
    },
    {
      title: "Singapore Office",
      head: "Network International Courier Services Pte Ltd",
      address:
        "47 Kaki Bukit Place\nNetwork Courier Building\nSingapore 416225",
      phone: "62933203",
    },
    {
      title: "Australia Office",
      head: "Majestic Courier",
      address:
        "14 Mayflower Mews\nEpping VIC 3076\nAustralia",
      phone: "042631800",
    },
    {
      title: "Sri Lanka Office",
      head: "Shine Express & Logistics (Pvt) Ltd",
      address:
        "No: 4, Sudarshana Mawatha,\nNawala,\nSri Lanka",
      phone: "+94 114 75 85 95",
    },
    {
      title: "Dubai Office",
      head: "Bombino Express Logistics LLC",
      address:
        "Al Habtoor Warehouse No – 27,\nIndustrial Area No 3,\nAl Qusais, Dubai, UAE",
      phone: "+971 55 398 4412",
    },
  ];

  return (
    <div className="px-6 md:px-20 py-24 font-outfit bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#0A1D45] text-center">
        Contact <span className="text-orange-500">Our Offices</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {branches.map((b, i) => (
          <div
            key={i}
            className="rounded-3xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4337c9] to-[#6a5cff] text-white px-6 py-5 rounded-b-[50px] flex justify-between items-center">
              <h3 className="font-semibold text-lg">{b.title}</h3>

              <a
                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-green-600 p-2 rounded-full shadow hover:scale-110 transition"
              >
                <MessageCircle size={22} />
              </a>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 text-gray-700 text-sm leading-relaxed">

              <div className="flex items-start gap-3">
                <User className="text-purple-600" size={18} />
                <p className="font-semibold">{b.head}</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-pink-600 mt-1" size={18} />
                <p className="whitespace-pre-line">{b.address}</p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-green-600 mt-1" size={18} />
                <p>{b.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}