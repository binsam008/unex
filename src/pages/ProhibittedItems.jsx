import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Gem, 
  Banknote, 
  Skull, 
  Bomb, 
  Biohazard, 
  FileWarning, 
  Beer 
} from "lucide-react";

const prohibitedItems = [
  { id: 1, name: "Stamped, envelopes and parcels.", icon: <Mail size={40} /> },
  { id: 2, name: "Precious stones, gems and jewelry.", icon: <Gem size={40} /> },
  { id: 3, name: "Currency and legal tenders", icon: <Banknote size={40} /> },
  { id: 4, name: "Poison", icon: <Skull size={40} /> },
  { id: 5, name: "Firearm and explosive", icon: <Bomb size={40} /> },
  { id: 6, name: "Liquids and chemicals", icon: <Biohazard size={40} /> },
  { id: 7, name: "Pornographic materials", icon: <FileWarning size={40} /> },
  { id: 8, name: "Liquor", icon: <Beer size={40} /> },
];

export default function ProhibitedIconsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-25 px-6 font-outfit">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1D45] mb-4">
            Prohibited & Restricted Items
          </h2>
          <p className="text-gray-500">Items that cannot be shipped under any circumstances.</p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {prohibitedItems.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                backgroundColor: "#fff5f5",
                borderColor: "#fecaca" 
              }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center transition-colors duration-300"
            >
              {/* Icon Container */}
              <div className="text-red-500 mb-6 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Text Label */}
              <p className="text-xs md:text-sm font-bold text-[#0A1D45] uppercase tracking-wide leading-tight">
                {item.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-gray-400 text-xs italic"
        >
          Disclaimer: This list is subject to change based on local and international aviation laws.
        </motion.p>
      </div>
    </div>
  );
}