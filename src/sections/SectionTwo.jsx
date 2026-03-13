import { motion } from "framer-motion";
import { ShieldCheck, FileText, Star } from "lucide-react";

export default function SectionTwo() {
  return (
    <section className="w-8xl bg-[#f8f9fb] py-4">

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-8">

        {/* MOBILE SLIDER */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth section-two-slider py-4">

          <div className="min-w-[85%] snap-center bg-[#0b1a33] rounded-2xl p-6 text-white shadow-xl">
            <h2 className="text-lg font-bold border-l-4 border-white pl-3">
              We Manage Customs & Documentation
            </h2>

            <ul className="mt-4 text-sm space-y-2 text-white/90">
              <li>• Export documentation support</li>
              <li>• Customs clearance assistance</li>
              <li>• IEC & KYC guidance</li>
              <li>• Commercial & shipment paperwork</li>
            </ul>
          </div>

          <div className="min-w-[85%] snap-center bg-white rounded-2xl p-6 shadow-xl border">
            <h2 className="text-lg font-bold text-[#0b1a33]">
              Personal Baggage & Cargo
            </h2>

            <ul className="mt-4 text-sm space-y-2 text-gray-700">
              <li>• Student baggage shipping</li>
              <li>• Relocation cargo</li>
              <li>• Personal effects clearance</li>
              <li>• Import handling</li>
            </ul>
          </div>

        </div>


        {/* DESKTOP VERSION */}
        <div className="hidden md:flex relative overflow-hidden shadow-2xl h-[380px] rounded-xl">

          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0 z-0">
            <img src="/hero3.jpg" className="w-full h-full object-cover"/>
            
          </div>


          {/* LEFT CARD */}
          <motion.div
            initial={{opacity:0,x:-70}}
            whileInView={{opacity:1,x:0}}
            transition={{duration:1.2}}
            className="doc-left-clip relative flex-[1.2] p-12 z-20 overflow-hidden"
          >

            <div className="absolute inset-0">
              <img src="/hero2.jpg" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-[#0b1a33]/75"></div>
            </div>

            <div className="relative z-40 text-white w-[85%]">

              <h2 className="text-[32px] font-bold uppercase border-l-4 pl-4 border-white">
                We Manage Customs & Documentation
              </h2>

              <ul className="mt-6 text-[15px] space-y-2 text-white/90">
                <li>• Export documentation support</li>
                <li>• Customs clearance assistance</li>
                <li>• IEC & KYC guidance</li>
                <li>• Commercial & personal paperwork</li>
              </ul>

              <button className="mt-6 bg-[#e31e24] px-6 py-3 rounded-md text-xs font-bold uppercase">
                Ship Internationally Today
              </button>

            </div>
          </motion.div>


          {/* CENTER DIVIDER */}
          <div className="doc-center-stroke hidden md:block"></div>


          {/* RIGHT CARD */}
          <motion.div
            initial={{opacity:0,x:70}}
            whileInView={{opacity:1,x:0}}
            transition={{duration:1.2}}
            className="doc-right-clip relative flex-[1.0] bg-white/65 p-12 z-20 text-[#0b1a33]"
          >

            <div className="relative z-30 w-[85%] ml-auto">

              <h2 className="text-[32px] font-bold uppercase">
                Personal Baggage & Cargo
              </h2>

              <ul className="mt-6 text-[15px] space-y-2 text-gray-700">
                <li>• Student baggage shipping</li>
                <li>• Household relocation cargo</li>
                <li>• Personal effects clearance</li>
                <li>• Import shipments handling</li>
              </ul>

              <button className="mt-6 bg-[#e31e24] px-6 py-3 rounded-md text-xs font-bold uppercase text-white">
                Request Baggage Quote
              </button>

            </div>

          </motion.div>

        </div>


        {/* TRUST BAR */}
        <motion.div
          initial={{opacity:0,y:25}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:1}}
          className="mt-0 w-full md:w-[45%] bg-white shadow-md p-3 flex items-center justify-between border border-gray-300 rounded-lg"
        >

          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-600 w-5 h-5"/>
            <p className="font-semibold text-sm">Trusted by 1000+</p>
          </div>

          <div className="flex items-center gap-2 border-x px-4 border-gray-300">
            <FileText className="text-gray-600 w-5 h-5"/>
            <p className="font-semibold text-xs uppercase">Docs</p>
          </div>

          <div className="flex items-center gap-1">
            <Star className="text-yellow-400 w-4 h-4 fill-yellow-400"/>
            <Star className="text-yellow-400 w-4 h-4 fill-yellow-400"/>
            <Star className="text-yellow-400 w-4 h-4 fill-yellow-400"/>
            <Star className="text-yellow-400 w-4 h-4 fill-yellow-400"/>
            <Star className="text-gray-300 w-4 h-4 fill-gray-300"/>

            <span className="font-bold text-[#f39200] ml-2">
              150 Reviews
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}