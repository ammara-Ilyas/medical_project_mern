import { FiActivity, FiHeart, FiDroplet, FiUserCheck } from "react-icons/fi";
import { FaHeartbeat, FaDna, FaHandHoldingMedical, FaUserMd } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

type Service = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  icon?: string;
};

type SingleServiceSectionProps = {
  service: Service;
};

const bullets = [
  "A Passion for Healing",
  "All our best",
  "A Legacy of Excellence",
  "5-Star Care",
  "Believe in Us",
  "Always Caring",
];

const serviceMenu = [
  { name: "Free Checkup", icon: <FaHandHoldingMedical className="text-2xl text-[#159EEC]" /> },
  { name: "Cardiogram", icon: <FaHeartbeat className="text-2xl text-[#159EEC]" /> },
  { name: "Dna Testing", icon: <FaDna className="text-2xl text-[#159EEC]" /> },
  { name: "Blood Bank", icon: <FiDroplet className="text-2xl text-[#159EEC]" /> },
  { name: "Dermatology", icon: <FiUserCheck className="text-2xl text-[#159EEC]" /> },
  { name: "Orthopedic", icon: <FaUserMd className="text-2xl text-[#159EEC]" /> },
];

export default function SingleServiceSection({ service }: SingleServiceSectionProps) {
  return (
    <section className="w-[80%] mx-auto py-12 bg-white ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left: Vertical Menu (static for demo, you can make it dynamic) */}
        <div className="flex flex-col gap-2 w-full md:w-56">
          {serviceMenu.map(({ name, icon }) => (
            <Link
              key={name}
              href="#"
              className={`flex items-center  hover:bg-[] gap-3 px-4 py-3 rounded-md border text-[#1F2B6C] font-semibold transition no-underline bg-white border-gray-200 hover:bg-[#1F2B6C] hover:text-white
               
              `}
            >
              {icon}
              {name}
            </Link>
          ))}
        </div>
        {/* Center: Image and Content */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full  border-[#159EEC] rounded mb-6 overflow-hidden">
            <Image src="/images/services/single_service.png" alt="service" width={600} height={320} className="w-full h-64 object-cover" />
          </div>
          <div className="w-full">
            <div className="font-bold text-xl md:text-2xl text-[#1F2B6C] mb-2">A passion for putting patients first</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mb-4">
              {bullets.map((b, i) => (
                <span key={b} className="flex items-center gap-2 text-[#1F2B6C] text-sm">
                  <span className="w-2 h-2 bg-[#159EEC] rounded-full inline-block" />
                  {b}
                </span>
              ))}
            </div>
            <div className="text-gray-700 text-sm mb-2">{service.description}</div>
            <div className="text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 