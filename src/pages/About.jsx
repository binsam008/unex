export default function About() {
  return (
    <div className="px-10 py-16">

      <h1 className="text-4xl font-bold text-center mb-10">
        About UNEX Logistics
      </h1>

      <div className="max-w-4xl mx-auto text-gray-600 text-lg leading-8">
        <p className="mb-6">
          UNEX Logistics is a global freight forwarding company providing
          reliable and secure transportation solutions. We specialize in air,
          sea, and road freight services.
        </p>

        <p className="mb-6">
          Our mission is to deliver shipments safely and on time while
          maintaining the highest industry standards.
        </p>

        <p>
          With advanced tracking systems and dedicated customer support,
          UNEX ensures complete transparency for every shipment.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-10 mt-16">
        <div className="bg-gray-100 p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p>
            To become a trusted global logistics partner by delivering
            innovative and reliable freight solutions.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            To provide efficient logistics services while ensuring safety,
            speed, and customer satisfaction.
          </p>
        </div>
      </div>

    </div>
  );
}
