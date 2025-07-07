import { FiPhoneCall, FiMapPin, FiMail, FiClock } from "react-icons/fi";

export default function ContactInfoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Emergency */}
      <div className="bg-[#BFD2F8] rounded-lg p-6 flex flex-col items-start justify-center min-h-[120px]">
        <div className="flex items-center gap-2 mb-2 text-[#1F2B6C] font-bold"><FiPhoneCall />EMERGENCY</div>
        <div className="text-[#1F2B6C] text-sm">(237) 681-812-255<br/>(237) 666-331-894</div>
      </div>
      {/* Location */}
      <div className="bg-[#1F2B6C] rounded-lg p-6 flex flex-col items-start justify-center min-h-[120px] text-white">
        <div className="flex items-center gap-2 mb-2 font-bold"><FiMapPin />LOCATION</div>
        <div className="text-sm">0123 Some place<br/>9876 Some country</div>
      </div>
      {/* Email */}
      <div className="bg-[#BFD2F8] rounded-lg p-6 flex flex-col items-start justify-center min-h-[120px]">
        <div className="flex items-center gap-2 mb-2 text-[#1F2B6C] font-bold"><FiMail />EMAIL</div>
        <div className="text-[#1F2B6C] text-sm">fildineesece@gmail.com<br/>mybestudios@gmail.com</div>
      </div>
      {/* Working Hours */}
      <div className="bg-[#BFD2F8] rounded-lg p-6 flex flex-col items-start justify-center min-h-[120px]">
        <div className="flex items-center gap-2 mb-2 text-[#1F2B6C] font-bold"><FiClock />WORKING HOURS</div>
        <div className="text-[#1F2B6C] text-sm">Mon-Sat: 09:00-20:00<br/>Sunday: Emergency only</div>
      </div>
    </div>
  );
} 