import MiniHeading from "@/components/miniWidgets/MiniHeading";
import { FaRegHeart } from "react-icons/fa";

const specialties = [
  "Neurology",
  "Bones",
  "Oncology",
  "Otorhinolaryngology",
  "Ophthalmology",
  "Cardiovascular",
  "Pulmonology",
  "Renal Medicine",
  "Gastroenterology",
  "Urology",
  "Dermatology",
  "Gynaecology",
];

export default function SpecialtiesSection() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <MiniHeading heading="Our Specialties" text="Always Caring" />
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200">
            {specialties.map((name, idx) => {
              const isActive = name === "Bones";
              return (
                <div
                  key={name}
                  className={`flex flex-col items-center justify-center aspect-square min-h-[120px] border-b border-r border-gray-200 last:border-b-0 md:last:border-r-0 transition-colors duration-200 cursor-pointer bg-white text-[#159EEC] hover:bg-[#1F2B6C] hover:text-white
                  `}
                  style={{
                    borderRight: (idx + 1) % 4 === 0 ? "none" : undefined,
                    borderBottom: idx >= 8 ? "none" : undefined,
                  }}
                >
                  <FaRegHeart className={`text-3xl mb-2 transition-colors duration-200 
                 
                  `} />
                  <span className={`font-semibold text-sm md:text-base transition-colors duration-200 `}>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 