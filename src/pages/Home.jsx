export default function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white text-center py-20">
        <h1 className="text-5xl font-bold mb-6">
          Fast & Reliable Logistics Solutions
        </h1>
        <p className="text-lg mb-8">
          We deliver your cargo safely worldwide.
        </p>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold">
          Get A Quote
        </button>
      </section>

      {/* About Section */}
      <section className="py-16 px-10 text-center">
        <h2 className="text-3xl font-bold mb-6">About UNEX</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          UNEX Logistics provides reliable air, sea, and road freight services
          across the globe. Our mission is to ensure secure and timely delivery
          for every shipment.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-10 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
            <p>Quick and secure transport worldwide.</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-bold mb-3">Secure Handling</h3>
            <p>Your goods are handled with maximum safety.</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p>We are available anytime for your assistance.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-10 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Air Freight</h3>
            <p>Fast international air cargo delivery.</p>
          </div>

          <div className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Sea Freight</h3>
            <p>Cost-effective bulk ocean transport.</p>
          </div>

          <div className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Road Freight</h3>
            <p>Reliable domestic transportation.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-16 px-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p>Email: support@unexlogistics.com</p>
        <p>Phone: +91 XXXXX XXXXX</p>
      </section>

    </div>
  );
}
