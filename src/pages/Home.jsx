import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import WhyChooseUs from "../sections/WhyChooseUs";
import ClientReviews from "../sections/ClientReviews";
import CTA from "../sections/CTA";
// import Feedback from "../sections/Feedback";
// import Footer from "../sections/Footer";

export default function Home() {
  return (
    <div className="font-outfit overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <ClientReviews/>
      <CTA/>
      {/* <Feedback /> */}
      {/* <Footer /> */}
    </div>
  );
}
