import { Mail, Phone, MapPin, User, MessageCircle } from "lucide-react";

export default function ContactOffices() {
  const branches = [
    {
      title: "Head Office – Mumbai",
      head: "Branch Head: Arun Prakash",
      address:
        "21/44, Skyline Tower,\nAndheri East, Mumbai,\nMaharashtra – 400069",
      email: "mumbai.office@unex.com",
      phone: "+91 99887 66554",
    },
    {
      title: "Chennai Branch",
      head: "Branch Head: Divya Ramesh",
      address:
        "78, Lakeview Road,\nAnna Nagar, Chennai,\nTamil Nadu – 600040",
      email: "chennai.office@unex.com",
      phone: "+91 90901 11223",
    },
    {
      title: "Bangalore Branch",
      head: "Branch Head: Rahul Menon",
      address:
        "54, Tech Park Phase 2,\nWhitefield, Bengaluru,\nKarnataka – 560066",
      email: "bangalore.office@unex.com",
      phone: "+91 98111 44221",
    },
    {
      title: "Dubai – Overseas Office",
      head: "Branch Head: Aisha Khan",
      address:
        "Office 105, Trade Center,\nSheikh Zayed Road,\nDubai, UAE",
      email: "dubai.office@unex.com",
      phone: "+971 55 398 4412",
    },
  ];

  return (
    <div className="px-6 md:px-20 py-25 font-outfit">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#0A1D45]">
        Contact <span className="text-orange-500">Our Offices</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {branches.map((b, i) => (
          <div
            key={i}
            className="border border-purple-300 rounded-3xl shadow-md overflow-hidden bg-white"
          >
            {/* TOP CURVED SECTION — EXACT LIKE UI */}
            <div className="bg-[#4337c9] text-white px-6 py-4 rounded-b-[50px] relative flex justify-between items-center">

              <h3 className="font-semibold text-lg tracking-wide">
                {b.title}
              </h3>

              {/* WhatsApp Icon — Exact Size & Position */}
              <a
                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                className="bg-white text-green-600 p-2 rounded-full shadow-lg border border-green-300 hover:scale-105 transition"
              >
                <MessageCircle size={22} />
              </a>
            </div>

            {/* CONTENT AREA */}
            <div className="p-6 space-y-6 text-[15px] text-gray-700 leading-relaxed">

              {/* Head */}
              <div className="flex items-start gap-3">
                <User className="text-purple-600" size={20} />
                <p className="font-semibold">{b.head}</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="text-pink-600 mt-1" size={20} />
                <p className="whitespace-pre-line">{b.address}</p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="text-blue-600 mt-1" size={20} />
                <p>{b.email}</p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="text-green-600 mt-1" size={20} />
                <p>{b.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}