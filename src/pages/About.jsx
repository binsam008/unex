export default function About() {
  return (
    <div className="px-8 md:px-16 py-25 font-outfit text-gray-800">

      {/* COMPANY OVERVIEW */}
      <section className="grid md:grid-cols-2 gap-10 items-start mb-20">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#0A1D45]">COMPANY </span>
            <span className="text-orange-500">OVERVIEW</span>
          </h2>

          <p className="text-justify text-xl leading-relaxed mb-5">
            UNEX is a Bangalore-based global courier, air cargo, and international
            freight forwarding company offering reliable logistics solutions.
            With a dedicated customer service team and dependable pickup staff,
            we ensure timely, secure, and cost-effective delivery of documents
            and consignments worldwide.
          </p>

          <p className="text-justify  text-xl leading-relaxed">
            We also handle export clearances and transportation at major
            international destinations, supported by strict safety measures
            and advanced shipment tracking. Combining global reach with local
            efficiency, UNEX delivers international services at competitive
            prices with a strong focus on trust and customer satisfaction.
          </p>
        </div>

        <div>
          <img
            src="/about1.png"
            alt="UNEX Logistics"
            className="rounded-xl shadow-lg w-75% object-cover"
          />
        </div>
      </section>

      {/* ===== VISION + MISSION WITH ONE IMAGE ===== */}
      <section className="grid md:grid-cols-2 gap-16 items-center">

        {/* TEXT BLOCK */}
        <div className="space-y-10">

          {/* VISION */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1D45] mb-4">
              OUR VISION
            </h2>
            <p className="text-justify text-xl leading-relaxed">
              To be a trusted logistics partner by delivering reliable international
              courier and freight services that businesses and individuals can depend on.
            </p>
          </div>

          {/* MISSION */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
              OUR MISSION
            </h2>
            <p className="text-justify text-xl leading-relaxed">
              To provide timely, safe, and cost-effective logistics solutions while
              maintaining strong service standards and clear communication at every stage.
            </p>
          </div>

        </div>

        {/* ONE SHARED IMAGE */}
        <div>
          <img
            src="/about2.png"
            alt="UNEX Vision & Mission"
            className="rounded-xl shadow-lg w-50% object-cover"
          />
        </div>

      </section>

    </div>
  );
}