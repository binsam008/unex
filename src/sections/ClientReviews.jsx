export default function ClientReviews() {
  const reviews = [
    {
      name: "Emma",
      country: "Singapore",
      text: "I was really nervous about shipping fragile items overseas, but UNEX kept me updated at every step. Excellent service and zero hassle!"
    },
    {
      name: "James",
      country: "Australia",
      text: "We've been using their courier service for our business shipments, and they haven't missed a deadline yet. Affordable and incredibly reliable."
    },
    {
      name: "Peter",
      country: "Sri Lanka",
      text: "Awesome communication! The tracking was spot on, and the package arrived a day earlier than expected. Definitely using them again."
    },
    {
      name: "Sophia",
      country: "UAE",
      text: "The customer support team went above and beyond to help with my customs paperwork. Fast, professional, and very helpful."
    },
    {
      name: "Michael",
      country: "India",
      text: "Highly accurate tracking and friendly delivery staff. They make international shipping feel like local delivery."
    },
  ];

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-red-300 mb-10">
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
                <div className="text-5xl text-[#ff7632] leading-none mb-4">
                  “
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {review.text}
                </p>

                {/* Client Name & Country */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-semibold text-sm">
                    {review.name}
                  </p>
                  <span className="text-xs text-gray-500 font-bold">
                    {review.country}
                  </span>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
