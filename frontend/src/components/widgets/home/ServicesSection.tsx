import MiniHeading from "@/components/miniWidgets/MiniHeading";
import { FaHeartbeat, FaVial, FaTint, FaNotesMedical } from "react-icons/fa";
import Image from "next/image";

const services = [
  { name: "Free Checkup", icon: <FaNotesMedical />, active: false },
  { name: "Cardiogram", icon: <FaHeartbeat />, active: true },
  { name: "Dna Testing", icon: <FaVial />, active: false },
  { name: "Blood Bank", icon: <FaTint />, active: false },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 px-4">
        {/* Left: Vertical Menu */}
        <div className="w-full md:w-60 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-0 flex flex-col h-full border">
            {services.map((s, i) => (
              <button
                key={s.name}
                className={`flex flex-col items-center gap-2 px-4 py-4 hover:bg-[#1F2B6C] hover:text-white border-b last:border-b-0 text-base font-semibold transition $
                `}
                style={{
                  borderColor: "#E5EAF2",
                  borderRadius:
                    i === 0
                      ? "12px 12px 0 0"
                      : i === services.length - 1
                      ? "0 0 12px 12px"
                      : "0",
                }}
              >
                <span className="text-2xl mb-1">{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
            <button className="mt-2 mx-4 mb-4 px-4 py-2 bg-[#1F2B6C] text-white rounded-md font-semibold">
              View All
            </button>
          </div>
        </div>
        {/* Center: Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="container mx-auto max-w-xl px-0">
            <MiniHeading heading="Our Services" text="Care You Can Believe In" />
            <div className="font-bold text-lg mb-2 text-[#1F2B6C]">A passion for putting patients first.</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mb-4">
              <span className="flex items-center gap-2 text-[#1F2B6C]"><span className="w-2 h-2 bg-[#159EEC] rounded-full inline-block" />A Passion for Healing</span>
              <span className="flex items-center gap-2 text-[#1F2B6C]"><span className="w-2 h-2 bg-[#159EEC] rounded-full inline-block" />5-Star Care</span>
              <span className="flex items-center gap-2 text-[#1F2B6C]"><span className="w-2 h-2 bg-[#159EEC] rounded-full inline-block" />All our best</span>
              <span className="flex items-center gap-2 text-[#1F2B6C]"><span className="w-2 h-2 bg-[#159EEC] rounded-full inline-block" />Believe in Us</span>
              <span className="flex items-center gap-2 text-[#1F2B6C]"><span className="w-2 h-2 bg-[#159EEC] rounded-full inline-block" />A Legacy of Excellence</span>
              <span className="flex items-center gap-2 text-[#1F2B6C]"><span className="w-2 h-2 bg-[#159EEC] rounded-full inline-block" />Always Caring</span>
            </div>
            <p className="text-gray-700 mb-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
            </p>
            <p className="text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
            </p>
          </div>
        </div>
        {/* Right: Images */}
        <div className="w-full md:w-60 flex flex-col gap-4 flex-shrink-0">
          <Image
            src="/images/home/services_01.png"
            alt="Service 1"
            width={240}
            height={120}
            className="rounded-md object-cover w-full"
          />
          <Image
            src="/images/home/services_02.png"
            alt="Service 2"
            width={240}
            height={120}
            className="rounded-md object-cover w-full"
          />
        </div>
      </div>
    </section>
  );
} 