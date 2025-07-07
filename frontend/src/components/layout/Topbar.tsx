import React from "react";
import { FiPhoneCall, FiClock, FiMapPin } from "react-icons/fi";

const Topbar = () => (
  <div className="w-full bg-white px-16 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
    <div className="container mx-auto px-4 py-2 text-xs md:text-sm">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row items-center justify-between">
        <div className="flex items-center mb-0">
          <span className="text-xl font-bold text-blue-900 dark:text-white tracking-wide">
            <span className="text-blue-900 dark:text-white">MEDD</span><span className="text-blue-500">ICAL</span>
          </span>
        </div>
        <div className="flex flex-row md:space-x-10 items-center w-full md:w-auto justify-center md:justify-end">
          {/* Emergency */}
          <div className="flex items-center space-x-2">
            <FiPhoneCall className="text-[#159EEC] text-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2B6C]">EMERGENCY</span>
              <span className="text-[#159EEC] font-semibold">(237) 681-812-255</span>
            </div>
          </div>
          {/* Work Hour */}
          <div className="flex items-center space-x-2">
            <FiClock className="text-[#159EEC] text-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2B6C]">WORK HOUR</span>
              <span className="text-[#159EEC] font-semibold">08:00 - 20:00 <span className='text-[#159EEC]'>Everyday</span></span>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-[#159EEC] text-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2B6C]">LOCATION</span>
              <a href="#" className="text-[#159EEC] underline font-semibold">0123 Some Place</a>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-1">
        <div className="flex flex-row justify-between w-full">
          {/* Emergency */}
          <div className="flex items-center space-x-2">
            <FiPhoneCall className="text-[#159EEC] text-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2B6C]">EMERGENCY</span>
              <span className="text-[#159EEC] font-semibold">(237) 681-812-255</span>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-[#159EEC] text-lg" />
            <div className="flex flex-col items-end">
              <span className="font-bold text-[#1F2B6C]">LOCATION</span>
              <a href="#" className="text-[#159EEC] underline font-semibold">0123 Some Place</a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          {/* Work Hour */}
          <div className="flex items-center space-x-2">
            <FiClock className="text-[#159EEC] text-lg" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1F2B6C]">WORK HOUR</span>
              <span className="text-[#159EEC] font-semibold">08:00 - 20:00 <span className='text-[#159EEC]'>Everyday</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Topbar; 