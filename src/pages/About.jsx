import { motion } from "framer-motion";

export default function About() {
  // Animation Variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } }
  };

  return (
    <div className="px-8 md:px-16 py-25 font-outfit text-gray-800 overflow-hidden">

      {/* SECTION 1: COMPANY OVERVIEW */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-10 items-center mb-20"
      >
        <motion.div variants={fadeInVariant}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[#0A1D45]">COMPANY </span>
            <span className="text-red-600">OVERVIEW</span>
          </h2>

          <p className="text-justify hyphens-auto text-lg md:text-xl leading-relaxed mb-5" lang="en" style={{ hyphens: 'auto' }}>
            UNEX is a Bangalore-based global courier, air cargo, and international
            freight forwarding company offering reliable logistics solutions.
            With a dedicated customer service team and dependable pickup staff,
            we ensure timely, secure, and cost-effective delivery of documents
            and consignments worldwide.
          </p>

          <p className="text-justify hyphens-auto text-lg md:text-xl leading-relaxed" lang="en" style={{ hyphens: 'auto' }}>
            We also handle export clearances and transportation at major
            international destinations, supported by strict safety measures
            and advanced shipment tracking.
          </p>
        </motion.div>

        <motion.div variants={imageVariant} className="flex justify-center md:justify-end">
          <img
            src="/about1.png"
            alt="UNEX Logistics"
            className="rounded-3xl shadow-2xl w-full md:w-[90%] object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>
      </motion.section>

      {/* SECTION 2: VISION + MISSION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        {/* TEXT BLOCK (Left Side) */}
        <div className="space-y-12">
          {/* VISION */}
          <motion.div variants={fadeInVariant}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1D45] mb-4">
              OUR VISION
            </h2>
            <p className="text-justify hyphens-auto text-lg md:text-xl leading-relaxed" lang="en" style={{ hyphens: 'auto' }}>
              To be a trusted logistics partner by delivering reliable international
              courier and freight services that businesses and individuals can depend on.
            </p>
          </motion.div>

          {/* MISSION */}
          <motion.div variants={fadeInVariant}>
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              OUR MISSION
            </h2>
            <p className="text-justify hyphens-auto text-lg md:text-xl leading-relaxed" lang="en" style={{ hyphens: 'auto' }}>
              To provide timely, safe, and cost-effective logistics solutions while
              maintaining strong service standards and clear communication at every stage.
            </p>
          </motion.div>
        </div>

        {/* IMAGE BLOCK (Right Side) */}
        <motion.div variants={imageVariant} className="flex justify-center md:justify-end">
          <img
            src="/about2.png"
            alt="UNEX Vision & Mission"
            className="rounded-3xl shadow-2xl w-full md:w-[90%] object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>

      </motion.section>
    </div>
  );
}