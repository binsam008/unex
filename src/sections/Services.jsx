import { useRef } from "react";

export default function Services() {
  const sliderRef = useRef(null);

  const services = [
    {
      title: "Ocean Freight",
      img: "/service1.png",
      desc: "End-to-end ocean freight services ensuring secure and timely global shipments.",
    },
    {
      title: "Air Freight",
      img: "/service2.jpg",
      desc: "Swift air freight services designed for urgent and high-value cargo worldwide.",
    },
    {
      title: "Land Transport",
      img: "/service3.jpg",
      desc: "Efficient road transport services for seamless domestic and regional deliveries.",
    },
    {
      title: "Warehouse Storage",
      img: "/service4.jpg",
      desc: "Secure warehouse facilities for long-term and short-term storage solutions.",
    },
    {
      title: "Customs Clearance",
      img: "/service5.jpg",
      desc: "Fast and reliable customs processing to ensure smooth cargo movement.",
    },
    {
      title: "International Courier",
      img: "/service6.jpg",
      desc: "Door-to-door courier services with global delivery coverage.",
    },
  ];

  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-8xl mx-auto">

        {/* TOP TITLE + ARROWS */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug font-outfit">
            GLOBAL LOGISTICS <br />
            <span className="text-orange-500">
              EXPERTISE AT YOUR SERVICE
            </span>
          </h2>

          {/* Orange Circle Arrows */}
          <div className="flex gap-4">
            {/* LEFT ARROW */}
            <button
              onClick={slideLeft}
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={slideRight}
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-scroll mt-12 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="min-w-[300px] md:min-w-[350px] snap-start rounded-[30px] shadow-md pb-6 bg-white hover:shadow-xl transition-all duration-300"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-[320px] md:h-[360px] object-cover rounded-t-[30px]"
              />

              <div className="px-4 mt-4">
                <h3 className="text-xl font-bold font-outfit">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed font-outfit">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="flex justify-center mt-10">
          <button className="border border-orange-400 text-gray-900 rounded-full px-8 py-3 font-medium hover:bg-orange-50 transition font-outfit">
            View all
          </button>
        </div>

      </div>
    </section>
  );
}
