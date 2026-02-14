export default function Services() {
  return (
    <div className="px-10 py-16">

      <h1 className="text-4xl font-bold text-center mb-12">
        Our Logistics Services
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Air Freight */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Air Freight
          </h2>
          <p className="text-gray-600">
            Fast and secure international cargo transportation through global
            air networks.
          </p>
        </div>

        {/* Sea Freight */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Sea Freight
          </h2>
          <p className="text-gray-600">
            Cost-effective ocean shipping solutions for bulk and heavy goods.
          </p>
        </div>

        {/* Road Freight */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Road Freight
          </h2>
          <p className="text-gray-600">
            Reliable domestic and cross-border ground transportation services.
          </p>
        </div>

      </div>

    </div>
  );
}
