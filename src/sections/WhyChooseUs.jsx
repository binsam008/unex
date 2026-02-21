import {
  Globe,
  Truck,
  Shield,
  SatelliteDish,
  DollarSign
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section
      className="relative bg-cover bg-center py-20 px-6"
      style={{
        backgroundImage: "url('/why-bg.png')",
      }}
    >
      {/* Orange Overlay */}
      <div className="absolute inset-0 bg-orange-600/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 text-white">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            WHY CHOOSE US?
          </h2>

          <p className="text-xl leading-relaxed font-light max-w-md">
            Tailored logistics solutions for every business requirement.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* 1. Global Reach */}
          <div className="flex items-start gap-4">
            <Globe size={32} className="text-white" />
            <div>
              <h3 className="font-bold text-lg">Global Reach</h3>
              <p className="text-sm opacity-90">
                We handle international courier, air cargo, and freight forwarding  
                with strong coordination across major destinations.
              </p>
            </div>
          </div>

          {/* 2. Reliable Delivery */}
          <div className="flex items-start gap-4">
            <Truck size={32} className="text-white" />
            <div>
              <h3 className="font-bold text-lg">Reliable Delivery</h3>
              <p className="text-sm opacity-90">
                We ensure timely and secure movement of documents and shipments.
              </p>
            </div>
          </div>

          {/* 3. Safe Handling */}
          <div className="flex items-start gap-4">
            <Shield size={32} className="text-white" />
            <div>
              <h3 className="font-bold text-lg">Safe Handling</h3>
              <p className="text-sm opacity-90">
                Strict safety measures minimize risks of loss, damage, or pilferage.
              </p>
            </div>
          </div>

          {/* 4. Clear Tracking */}
          <div className="flex items-start gap-4">
            <SatelliteDish size={32} className="text-white" />
            <div>
              <h3 className="font-bold text-lg">Clear Tracking</h3>
              <p className="text-sm opacity-90">
                Real-time tracking keeps you informed from pickup to delivery.
              </p>
            </div>
          </div>

          {/* 5. Fair Pricing */}
          <div className="flex items-start gap-4">
            <DollarSign size={32} className="text-white" />
            <div>
              <h3 className="font-bold text-lg">Fair Pricing</h3>
              <p className="text-sm opacity-90">
                Transparent and competitive rates without hidden charges.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
