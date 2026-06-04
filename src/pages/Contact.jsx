import { Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactOffices() {
  const mainBranches = [
    {
      title: "Main Branch",
      head: "Unex Logistics",
      address:
        "No-33, 1st main Road,\nSR Nagar, Near IBIS Hotel,\nBangalore-560027",
      phone: "+91 85533 60073",
      phone2: "+91 91642 84562"
    },
    {
      title: "Airport Branch - Bangalore",
      head: "Unex Logistics",
      address:
        "2nd Floor, # 368,\nAmruthahalli Main Road,\nJakkur Layout, Bengaluru,\nKarnataka, 560092",
      phone: "+91 83019 33972",
    },
    {
      title: "Kerala Branch",
      head: "Unex Logistics",
      address:
        "8/1492 C, Peringatt Building,\nCivil Station PO, Kozhikode,\nKerala - 673020",
      phone: "+91 94464 66303",
    },
  ];

  const overseasBranches = [
    {
      title: "Singapore Office",
      head: "Network International Courier Services Pte Ltd",
      address:
        "47 Kaki Bukit place\nNetwork courier building\nSingapore - 416225",
      phone: "+65 62933203",
    },
    {
      title: "Sri Lanka Office",
      head: "Shine Express & Logistics (Pvt) Ltd.",
      address: "No: 4, Sudarshana Mawatha,\nNawala, Sri Lanka",
      phone: "+94 114 75 85 95",
    },
    {
      title: "Australia Office",
      head: "Majestic courier",
      address: "14 Mayflower,\nMews Epping,\nVIC 3076, Australia",
      phone: "",
    },
    {
      title: "Dubai Office",
      head: "Bombino Express Logistics LLC",
      address:
        "Al Habtoor, Warehouse No - 27,\nIndustrial Area No 3,\nAl Qusais, Dubai, UAE",
      phone: "+971 42 631 800",
    },
  ];

  const renderCard = (b, i, isMain = true) => (
    <div
      key={i}
      className={`group relative backdrop-blur-2xl bg-white/70 border ${isMain ? 'border-orange-100/50' : 'border-indigo-100/50'
        } hover:border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 flex flex-col`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isMain ? 'from-orange-50/50 to-transparent' : 'from-indigo-50/50 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 rounded-[2rem]`}></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 shadow-sm border border-gray-100 mb-6 w-fit backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full ${isMain ? 'bg-orange-500 animate-pulse' : 'bg-indigo-500'}`}></span>
            <span className="text-xs font-bold tracking-wider text-gray-600 uppercase">{b.title}</span>
          </div>

          <h3 className="text-2xl font-bold text-[#0A1D45] leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-300">
            {b.head}
          </h3>
        </div>

        <div className="flex-1 space-y-6 text-gray-600">
          <div className="flex gap-4">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-white border ${isMain ? 'border-orange-100 text-orange-500' : 'border-indigo-100 text-indigo-500'}`}>
              <MapPin size={18} strokeWidth={2.5} />
            </div>
            <div className="pt-2">
              <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-gray-700">{b.address}</p>
            </div>
          </div>

          {b.phone && (
            <div className="flex gap-4">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-white border ${isMain ? 'border-orange-100 text-orange-500' : 'border-indigo-100 text-indigo-500'}`}>
                <Phone size={18} strokeWidth={2.5} />
              </div>
              <div className="pt-2 flex items-center">
                <p className="text-sm font-semibold text-gray-800 tracking-wide">{b.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {b.phone ? (
          <div className="mt-8 pt-6 border-t border-gray-100/50">
            <a
              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-between w-full py-3.5 px-5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-sm ${isMain
                ? 'bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-200/50 hover:border-transparent hover:shadow-orange-500/30'
                : 'bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200/50 hover:border-transparent hover:shadow-indigo-500/30'
                }`}
            >
              Contact Support
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ) : (
          <div className="mt-8 pt-6 border-t border-gray-100/50">
            <div className="w-full py-3.5 px-5 rounded-2xl bg-gray-50/80 text-gray-400 font-semibold text-sm text-center border border-gray-100">
              Contact Not Available
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen px-6 md:px-20 py-24 font-outfit bg-slate-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-[#0A1D45]">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">Global</span> Presence
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Reach out to our main operational hubs in India or connect with our specialized global associated network.
          </p>
        </div>

        {/* Main Branches */}
        <div className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-2xl font-extrabold text-[#0A1D45] shrink-0">
              Main Operations
            </h3>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-200 to-transparent rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainBranches.map((b, i) => renderCard(b, i, true))}
          </div>
        </div>

        {/* Overseas Branches */}
        <div>
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-2xl font-extrabold text-[#0A1D45] shrink-0">
              Associated Network
            </h3>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-indigo-200 to-transparent rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {overseasBranches.map((b, i) => renderCard(b, i, false))}
          </div>
        </div>
      </div>
    </div>
  );
}