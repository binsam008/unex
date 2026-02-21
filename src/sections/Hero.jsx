export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[100vh] w-full"
      style={{
        backgroundImage: "url('/hero.png')",
      }}
    >
      {/* TEXT CONTENT */}
      <div className="container mx-auto h-full px-8 flex items-start pt-32"> 
        <div className="grid md:grid-cols-2 w-full">

          {/* LEFT SIDE TEXT */}
          <div className="text-white font-outfit">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              FREIGHT SOLUTIONS <br />
              WITH ON-TIME <br />
              DELIVERIES
            </h1>
          </div>

          {/* RIGHT SIDE SMALL TEXT */}
          <div className="flex items-start justify-end mt-10">
            <p className="text-white font-outfit text-xl md:text-2xl font-semibold leading-snug max-w-[320px] text-right py-25">
              DEPENDABLE SHIPPING <br />
              SOLUTIONS YOU CAN <br />
              TRUST
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
