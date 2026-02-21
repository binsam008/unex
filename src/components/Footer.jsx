import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1C] text-white px-6 py-14 rounded-t-[40px]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Services Provided */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Services Provided</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Air Freight</li>
            <li>Ocean Freight</li>
            <li>International Courier</li>
            <li>Events & Project Cargo</li>
            <li>Custom Clearance</li>
            <li>Land Transportation</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li>About Us</li>
            <li>Gallery</li>
            <li>FAQ's</li>
            <li>Career</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col justify-between items-start md:items-end">
          <h3 className="font-semibold text-lg mb-4 md:mb-0">Social Media</h3>

          <div className="flex gap-5 text-gray-300">
            <Instagram size={22} className="cursor-pointer hover:text-white" />
            <Facebook size={22} className="cursor-pointer hover:text-white" />
            <Linkedin size={22} className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>
    </footer>
  );
}
