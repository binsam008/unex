"use client";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Star, ClipboardCheck, Luggage, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ added

export default function SectionTwo() {
  const navigate = useNavigate(); // ✅ added

  return (
    <section className="w-full bg-[#f8f9fb] py-4">
      <div className="w-full px-4 md:px-8">
        
        {/* MOBILE DESIGN */}
        <div className="md:hidden flex flex-col gap-6 py-6">
          
          {/* Mobile Card 1 */}
          <div className="relative overflow-hidden rounded-[24px] p-7 text-white shadow-xl shadow-blue-900/20">
            <div className="absolute inset-0 z-0">
              <img src="/hero2.png" className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-[#0b1a33]/90 backdrop-blur-[2px]"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg border border-white/20">
                  <ClipboardCheck size={20} />
                </div>
                <h2 className="text-lg font-bold leading-tight">
                  Customs & Documentation
                </h2>
              </div>
              
              <ul className="space-y-3 text-sm text-white/80 border-l border-white/20 pl-4 ml-2">
                <li>• Export documentation support</li>
                <li>• Customs clearance assistance</li>
                <li>• IEC & KYC guidance</li>
                <li>• Commercial & shipment paperwork</li>
              </ul>
              
              <button
                onClick={() => navigate("/quote")} // ✅ added
                className="mt-6 w-full bg-[#e31e24] py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Ship Today <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Mobile Card 2 */}
          <div className="bg-white rounded-[24px] p-7 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#0b1a33]/5 rounded-lg border border-[#0b1a33]/10">
                <Luggage size={20} className="text-[#0b1a33]" />
              </div>
              <h2 className="text-lg font-bold text-[#0b1a33] leading-tight">
                Personal Baggage & Cargo
              </h2>
            </div>
            
            <ul className="space-y-3 text-sm text-gray-600 border-l border-gray-200 pl-4 ml-2">
              <li>• Student baggage shipping</li>
              <li>• Relocation cargo</li>
              <li>• Personal effects clearance</li>
              <li>• Import handling</li>
            </ul>
            
            <button
              onClick={() => navigate("/quote")} // ✅ added
              className="mt-6 w-full border-2 border-[#0b1a33] text-[#0b1a33] py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Request Quote <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden md:flex relative overflow-hidden shadow-2xl h-[380px] rounded-xl">
          <div className="absolute inset-0 z-0">
            <img src="/hero3.jpg" className="w-full h-full object-cover"/>
          </div>

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
              <button
                onClick={() => navigate("/quote")} // ✅ added
                className="mt-6 bg-[#e31e24] px-6 py-3 rounded-md text-xs font-bold uppercase"
              >
                Ship Internationally Today
              </button>
            </div>
          </motion.div>

          <div className="doc-center-stroke hidden md:block"></div>

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
              <button
                onClick={() => navigate("/quote")} // ✅ added
                className="mt-6 bg-[#e31e24] px-6 py-3 rounded-md text-xs font-bold uppercase text-white"
              >
                Request Baggage Quote
              </button>
            </div>
          </motion.div>
        </div>

        {/* TRUST BAR (unchanged) */}
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

          <div className="hidden md:flex items-center gap-2 border-x px-4 border-gray-300">
            <FileText className="text-gray-600 w-5 h-5"/>
            <p className="font-semibold text-xs uppercase">Docs</p>
          </div>

          <div className="flex items-center gap-1">
            {[1,2,3,4].map((i) => (
              <Star key={i} className="text-yellow-400 w-3 h-3 md:w-4 md:h-4 fill-yellow-400"/>
            ))}
            <Star className="text-gray-300 w-3 h-3 md:w-4 md:h-4 fill-gray-300"/>
            <span className="font-bold text-[#e31e24] ml-2 text-xs md:text-sm">
              150 Reviews
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}