"use client";
import { useState } from "react";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Documents() {
  const docs = [
    { name: "Annexure C1 for EOU", file: "/pdfs/Annexure-C1-for-EOU.pdf" },
    { name: "Annexure D for DEPB", file: "/pdfs/Annexure-D-for-DEPB.pdf" },
    { name: "Annexure I for Drawback", file: "/pdfs/Annexure-I-for-Drawback.pdf" },
    { name: "Annexure II for Drawback", file: "/pdfs/Annexure-II-for-Drawback.pdf" },
    { name: "Appendix II for DEEC", file: "/pdfs/Appendix-II-for-DEEC.pdf" },
    { name: "Appendix III for Drawback", file: "/pdfs/Appendix-III-for-Drawback.pdf" },
    { name: "Appendix IV for Drawback", file: "/pdfs/Appendix-IV-for-Drawback.pdf" },
    { name: "Commercial Invoice", file: "/pdfs/Commercial-Invoice.pdf" },
    { name: "GR Waiver Form (Free Trade Sample)", file: "/pdfs/GR-Waiver-Form-(for-Free-Trade-Sample).pdf" },
    { name: "GR Waiver Form (Repair & Return)", file: "/pdfs/GR-Waiver-Form-(for-Repair-&-Return).pdf" },
    { name: "MSDS", file: "/pdfs/MSDS.pdf" },
    { name: "Multiple Country Declaration", file: "/pdfs/Multiple-Country-Declaration.pdf" },
    { name: "Negative Declaration", file: "/pdfs/Negative-Declaration.pdf" },
    { name: "Non-DG Declaration", file: "/pdfs/Non-DG-Declaration.pdf" },
    { name: "Packing List", file: "/pdfs/Packing-List.pdf" },
    { name: "Quota Charge Statement", file: "/pdfs/Quota-Charge-Statement.pdf" },
    { name: "SDF Form", file: "/pdfs/SDF-Form.pdf" },
    { name: "Shippers Letter of Instructions", file: "/pdfs/Shippers-Letter-of-Instructions.pdf" },
    { name: "Single Country Declaration", file: "/pdfs/Single-Country-Declaration.pdf" },
    { name: "TSCA Certificate", file: "/pdfs/TSCA-Certificate.pdf" },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(docs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocs = docs.slice(startIndex, startIndex + itemsPerPage);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        
        {/* Header Section */}
        <div className="pt-10 pb-6">
          {/* <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-3 block">
            Resources & Compliance
          </span> */}
          <h1 className="text-3xl md:text-3xl font-black text-gray-900 leading-tight uppercase font-outfit ">
            Required <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Import & Export Documents
            </span>
          </h1>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          {/* List Container with AnimatePresence for page transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="p-4 md:p-8"
            >
              <div className="space-y-2">
                {currentDocs.map((doc, index) => (
                  <motion.div
                    key={doc.name}
                    variants={itemVariants}
                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300 border border-transparent hover:border-orange-100"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-gray-400 font-bold font-outfit w-6 text-sm">
                        {startIndex + index + 1}
                      </span>
                      <p className="text-gray-800 font-semibold md:text-lg group-hover:text-orange-600 transition-colors">
                        {doc.name}
                      </p>
                    </div>

                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all active:scale-95"
                    >
                      <span className="hidden md:inline">Download</span>
                      <FileText size={18} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Upgraded Pagination */}
          <div className="bg-gray-50 px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider disabled:opacity-30 hover:text-orange-600 transition-colors"
            >
              <ChevronLeft size={20} /> Previous
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === i + 1
                      ? "bg-gray-900 text-white scale-110 shadow-lg"
                      : "bg-white text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider disabled:opacity-30 hover:text-orange-600 transition-colors"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}