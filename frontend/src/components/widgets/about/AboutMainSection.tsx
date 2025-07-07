import { FaStar, FaHeart, FaCheckCircle, FaAward } from 'react-icons/fa';
import Image from "next/image";

export default function AboutMainSection() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <Image src="/images/about/best_care.png" alt="About Hospital" width={400} height={400} className="rounded-lg shadow w-full max-w-md" />
        </div>
        {/* Content */}
        <div className="flex-1">
          <div className="text-blue-600 font-semibold tracking-widest text-xs md:text-sm uppercase mb-2">Welcome to Hospital Name</div>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Best Care for Your Good Health</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-2 text-blue-900"><FaHeart className="text-blue-600" />A Passion for Healing</div>
            <div className="flex items-center gap-2 text-blue-900"><FaStar className="text-blue-600" />5-Star Care</div>
            <div className="flex items-center gap-2 text-blue-900"><FaCheckCircle className="text-blue-600" />All our best</div>
            <div className="flex items-center gap-2 text-blue-900"><FaCheckCircle className="text-blue-600" />Believe in Us</div>
            <div className="flex items-center gap-2 text-blue-900"><FaAward className="text-blue-600" />Always Caring</div>
            <div className="flex items-center gap-2 text-blue-900"><FaAward className="text-blue-600" />Legacy of Excellence</div>
          </div>
          <p className="text-gray-700 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare.</p>
          <p className="text-gray-700">Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare.</p>
        </div>
      </div>
    </section>
  );
} 