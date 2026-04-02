import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Navigation, 
  Box, 
  PhoneCall,
  CheckCircle2
} from "lucide-react";

export default function DashboardQuote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "", email: "", phone: "",
    origin: "", destination: "",
    shipmentType: "Sea", cargoType: "", weight: "",
    message: "",
  });

  const nextStep = () => setStep(s => s + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send("service_kmgfchc", "template_ct2q9y4", formData, "6mzefNX56lFODJ5ZM")
      .then(() => setStep(4));
  };

  return (
    <div className="min-h-screen  bg-white flex flex-col md:flex-row font-outfit">
      
      {/* LEFT PANEL: Brand & Trust (Fixed on Desktop) */}
      <div className="w-full md:w-[40%] bg-[#0A1D45] p-15 md:p-20 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="relative py-15">
          <div className="bg-orange-500 w-12 h-12 rounded-xl mb-5 flex items-center justify-center ">
            <Globe className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Global Logistics <br /> 
            <span className="text-orange-500 font-light italic text-3xl md:text-4xl">Made Simple.</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-sm mb-12">
            Get a guaranteed shipping quote in minutes. Our global network ensures your cargo arrives safely and on time.
          </p>

          <div className="space-y-6">
            <TrustItem icon={<ShieldCheck size={20}/>} text="Fully Insured Shipments" />
            <TrustItem icon={<Clock size={20}/>} text="24/7 Real-time Tracking" />
            <TrustItem icon={<PhoneCall size={20}/>} text="Dedicated Account Manager" />
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      {/* RIGHT PANEL: The Form */}
      <div className="w-full md:w-[60%] p-8 md:p-24 flex items-center justify-center bg-[#F8FAFC]">
        <div className="max-w-2xl w-full">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <FormSection 
                key="1"
                title="Route Information"
                subtitle="Where is the origin and destination of your cargo?"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <FloatingInput label="From (Origin)" icon={<Navigation size={18}/>} value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} />
                  <FloatingInput label="To (Destination)" icon={<Navigation size={18} className="rotate-90"/>} value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
                </div>
                <button onClick={nextStep} className="mt-10 w-full md:w-auto bg-[#0A1D45] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-orange-500 transition-all">
                  Next Step <ArrowRight size={20}/>
                </button>
              </FormSection>
            )}

            {step === 2 && (
              <FormSection 
                key="2"
                title="Cargo Specifics"
                subtitle="Provide details about the weight and type of goods."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <FloatingInput label="Cargo Type" icon={<Box size={18}/>} value={formData.cargoType} onChange={(e) => setFormData({...formData, cargoType: e.target.value})} />
                  <FloatingInput label="Weight (KG)" type="number" icon={<Box size={18}/>} value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-10">
                   <button onClick={() => setStep(1)} className="px-10 py-4 rounded-full font-bold text-gray-400 hover:text-black transition-all">Back</button>
                   <button onClick={nextStep} className="w-full md:w-auto bg-[#0A1D45] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-orange-500 transition-all">
                    Final Step <ArrowRight size={20}/>
                  </button>
                </div>
              </FormSection>
            )}

            {step === 3 && (
              <FormSection 
                key="3"
                title="Contact Details"
                subtitle="Last step! How can we reach you?"
              >
                <div className="space-y-6 mt-8">
                  <FloatingInput label="Full Name" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <FloatingInput label="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-10">
                   <button onClick={() => setStep(2)} className="px-10 py-4 rounded-full font-bold text-gray-400 hover:text-black transition-all">Back</button>
                   <button onClick={handleSubmit} className="w-full md:w-auto bg-orange-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-orange-200 transition-all">
                    Get My Quote Now
                  </button>
                </div>
              </FormSection>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 className="text-green-600" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Confirmed</h2>
                <p className="text-gray-500 text-lg">We have sent your details to our logistics team. Expect a response at <b>{formData.email}</b> shortly.</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

/* Helper Components */
const TrustItem = ({ icon, text }) => (
  <div className="flex items-center gap-4 text-blue-100/80">
    <div className="bg-white/10 p-2 rounded-lg">{icon}</div>
    <span className="font-medium">{text}</span>
  </div>
);

const FormSection = ({ title, subtitle, children }) => (
  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
    <h3 className="text-4xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-lg">{subtitle}</p>
    {children}
  </motion.div>
);

const FloatingInput = ({ label, icon, ...props }) => (
  <div className="relative group">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors">{icon}</div>}
      <input 
        {...props}
        className={`w-full bg-white border-b-2 border-gray-100 py-4 ${icon ? 'pl-12' : 'pl-4'} pr-4 outline-none focus:border-orange-500 transition-all text-lg`}
      />
    </div>
  </div>
);