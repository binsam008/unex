import { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Track() {
  const [invoice, setInvoice] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

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
    "DELIVERED AT PLACE",
  ];

  const handleTrack = async () => {
    if (!invoice) return;

    try {
      const ref = doc(db, "shipments", invoice.trim());
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setShipment(snap.data());
        setError("");
      } else {
        setShipment(null);
        setError("Shipment not found. Please check the tracking number.");
      }
    } catch (err) {
      setError("Error fetching shipment");
    }
  };

  const currentStep = shipment ? statusSteps.indexOf(shipment.status) : -1;

  // Auto-scroll to the van's position when shipment is loaded
  useEffect(() => {
    if (currentStep !== -1 && scrollRef.current) {
      const container = scrollRef.current;
      const scrollWidth = container.scrollWidth;
      const progress = currentStep / (statusSteps.length - 1);
      
      container.scrollTo({
        left: (scrollWidth * progress) - (container.offsetWidth / 2),
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 md:px-8 font-outfit">
      <div className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1D45]">
            Track Your Shipment
          </h1>

          <div className="w-full max-w-xl mx-auto flex flex-col md:flex-row gap-4 mt-6">
            <input
              placeholder="Enter Job Number"
              className="flex-1 border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <button
              onClick={handleTrack}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-orange-600 transition-transform active:scale-95"
            >
              Track
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-center mb-6 text-lg font-medium animate-pulse">{error}</p>
        )}

        {shipment && (
          <>
            {/* SHIPMENT DETAILS CARD */}
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-200 mb-12">
              <h2 className="text-xl font-bold text-[#0A1D45] mb-4 border-b pb-2">
                Shipment Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[15px]">
                <div><p className="text-gray-500">Customer</p><p className="font-bold">{shipment.customerName}</p></div>
                <div><p className="text-gray-500">Origin</p><p className="font-bold">{shipment.origin}</p></div>
                <div><p className="text-gray-500">Destination</p><p className="font-bold">{shipment.destination}</p></div>
                <div><p className="text-gray-500">Current Location</p><p className="font-bold text-orange-600">{shipment.currentLocation}</p></div>
                <div><p className="text-gray-500">Status</p><p className="font-bold uppercase">{shipment.status}</p></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#0A1D45] mb-6 px-2">Shipment Progress</h2>

            {/* TIMELINE CONTAINER */}
            <div 
              ref={scrollRef}
              className="relative w-full overflow-x-auto pb-16 pt-24 no-scrollbar border-y border-gray-50"
            >
              <div className="relative flex items-center min-w-[1500px] px-20">
                
                {/* STATIC BACKGROUND TRACK */}
                <div className="absolute top-[14px] left-20 right-20 h-1.5 bg-gray-200 rounded-full z-0" />

                {/* DYNAMIC PROGRESS LINE */}
                <div 
                  className="absolute top-[14px] left-20 h-1.5 bg-orange-500 rounded-full transition-all duration-1000 ease-in-out z-0"
                  style={{
                    width: `calc(${(currentStep / (statusSteps.length - 1)) * 100}% - 0px)`
                  }}
                />

                {/* TRAVELING VAN */}
                {currentStep >= 0 && (
                  <div
                    className="absolute transition-all duration-1000 ease-in-out z-30 flex flex-col items-center"
                    style={{
                      top: "-55px", 
                      left: `calc(80px + ${(currentStep / (statusSteps.length - 1)) * (1500 - 160)}px - 50px)`,
                    }}
                  >
                    <div className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded mb-1 shadow-sm whitespace-nowrap border border-orange-200">
                      VAN IS HERE
                    </div>
                    <img
                      src="/truck-unex.png"
                      alt="Van"
                      className="w-24 h-24 object-contain drop-shadow-lg"
                    />
                  </div>
                )}

                {/* STATUS DOTS */}
                <div className="flex justify-between w-full relative z-10">
                  {statusSteps.map((step, index) => {
                    const isActive = index <= currentStep;
                    const isCurrent = index === currentStep;

                    return (
                      <div key={index} className="flex flex-col items-center w-[120px] text-center">
                        <div
                          className={`
                            w-8 h-8 rounded-full border-4 flex items-center justify-center
                            transition-all duration-500 z-10 bg-white
                            ${isActive ? "border-orange-500" : "border-gray-300"}
                            ${isCurrent ? "scale-125 shadow-xl" : "scale-100"}
                          `}
                        >
                          {isActive && (
                            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                          )}
                        </div>

                        <p className={`
                          mt-4 text-[10px] font-bold uppercase tracking-tighter leading-tight h-10
                          ${isActive ? "text-orange-600" : "text-gray-400"}
                        `}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="mt-12 text-center">
              <a
                href={`https://wa.me/?text=Hello UNEX, I need support for shipment ${invoice}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-lg px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-[#128C7E] transition-all hover:-translate-y-1"
              >
                Need Help? WhatsApp Us
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}