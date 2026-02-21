export default function ClientReviews() {
  const reviews = [
    {
      name: "Emma",
      text: "Outstanding customer service and timely updates. UNEX is trustworthy!"
    },
    {
      name: "James",
      text: "Their international courier services are efficient, secure, and affordable."
    },
    {
      name: "Peter",
      text: "UNEX provides reliable international courier service with clear communication and on-time delivery."
    },
    {
      name: "Sophia",
      text: "Exceptional logistics support! Fast delivery and professional handling of all shipments."
    },
    {
      name: "Michael",
      text: "Highly satisfied with their tracking accuracy and seamless transportation service."
    },
  ];

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#0A2A63] mb-10">
          CLIENT REVIEWS
        </h2>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">

          {/* Track */}
          <div className="flex gap-8 animate-marquee whitespace-nowrap">

            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="bg-[#FFF4EB] inline-block w-[330px] rounded-2xl p-6 shadow-sm border border-[#FFE6D3] whitespace-normal"
              >
                {/* Quote Icon */}
                <div className="text-5xl text-[#F4A37A] leading-none mb-4">
                  “
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {review.text}
                </p>

                {/* Client Name */}
                <p className="text-gray-600 font-semibold text-sm">
                  {review.name}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
