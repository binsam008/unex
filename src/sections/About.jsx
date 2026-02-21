export default function About() {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-8xl mx-auto">

        {/* TOP SECTION */}
        <h2 className="text-orange-500 font-bold text-3xl px-20 mb-10">
          ABOUT US
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <img
              src="/about.png"
              alt="About Logistics"
              className="rounded-4xl  h-auto object-cover py-2.5 px-2.5"
            />
          </div>

          {/* RIGHT TEXT */}
          <div>
<p className="text-gray-700 leading-relaxed text-[20px] py-0.5 text-justify container px-10">
  We Deliver, Track & Ship is a comprehensive logistics and
  transportation provider dedicated to delivering seamless, 
  reliable solutions for businesses and individuals. From initial 
  order placement to final delivery, we manage every stage of the 
  supply chain with precision, powered by advanced tracking 
  technology and customer first approach.
</p>

          </div>

        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">

          <div>
            <h3 className="text-4xl font-bold">10 Yr+</h3>
            <p className="text-gray-500 text-sm">of shipping expertise</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">120 +</h3>
            <p className="text-gray-500 text-sm">cargo handled worldwide</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">12 K+</h3>
            <p className="text-gray-500 text-sm">customer satisfied</p>
          </div>

        </div>

      </div>
    </section>
  );
}
