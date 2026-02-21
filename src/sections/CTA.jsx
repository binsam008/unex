export default function CTA() {
  return (
    <section className="px-6 py-10">
      <div
        className="relative w-full h-[350px] md:h-[420px] bg-cover bg-center rounded-[30px] overflow-hidden"
        style={{
          backgroundImage: "url('/truck-banner.jpg')", // change to your image file
        }}
      >
        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black/60"></div> */}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 text-white max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            Tailored logistics <br />
            solutions for every <br />
            business requirement.
          </h2>

          <button className="bg-white text-black rounded-lg px-5 py-2 text-sm font-medium hover:bg-gray-100 transition">
            Ship now
          </button>
        </div>
      </div>
    </section>
  );
}
