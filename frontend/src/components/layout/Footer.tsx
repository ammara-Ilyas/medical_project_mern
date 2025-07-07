import { FaLinkedinIn, FaFacebookF, FaTwitter, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F2B6C] text-white pt-10 pb-4  md:px-12">
      <div className="container mx-auto px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="text-2xl font-bold mb-2">
              <span className="text-white">MEDD</span><span className="text-[#159EEC]">ICAL</span>
            </div>
            <div className="text-sm opacity-80 mb-2">
              Leading the Way in Medical Excellence, Trusted Care.
            </div>
          </div>
          {/* Important Links */}
          <div>
            <div className="font-semibold mb-2">Important Links</div>
            <ul className="space-y-1 text-sm opacity-90 mt-3">
              <li><Link href="/appointment" className=" mt-2 hover:underline">Appointment</Link></li>
              <li><Link href="/doctors" className=" mt-2 hover:underline">Doctors</Link></li>
              <li><Link href="/services" className=" mt-2 hover:underline">Services</Link></li>
              <li><Link href="/about" className=" mt-2 hover:underline">About Us</Link></li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <div className="font-semibold mb-2">Contact Us</div>
            <div className=" mt-2 text-sm opacity-90 mb-1">Call: (237) 681-812-255</div>
            <div className=" mt-2 text-sm opacity-90 mb-1">Email: fildineesece@gmail.com</div>
            <div className=" mt-2 text-sm opacity-90 mb-1">Address: 0123 Some place</div>
            <div className=" mt-2 text-sm opacity-90">Some country</div>
          </div>
          {/* Newsletter */}
          <div>
            <div className="font-semibold mb-2">Newsletter</div>
            <form className="flex items-center bg-white rounded px-2 py-1">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent text-[#1F2B6C] placeholder-[#1F2B6C] text-sm px-2 py-1 focus:outline-none"
              />
              <button type="submit" className="text-[#1F2B6C] hover:text-[#159EEC] p-2">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
        <hr className="border-white/30 mb-2 " />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-80 py-4">
          <div>
            © 2021 Hospital's name All Rights Reserved by PNTEC-LTD | Ammara Ilyas
          </div>
          <div className="flex gap-4 text-lg">
            <a href="#" className="bg-white text-[#1F2B6C] rounded-full p-2 hover:bg-[#159EEC] hover:text-white transition"><FaLinkedinIn /></a>
            <a href="#" className="bg-white text-[#1F2B6C] rounded-full p-2 hover:bg-[#159EEC] hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="bg-white text-[#1F2B6C] rounded-full p-2 hover:bg-[#159EEC] hover:text-white transition"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
} 