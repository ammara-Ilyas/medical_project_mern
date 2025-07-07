import React from "react";
import { FiPhoneCall } from "react-icons/fi";

export default function ScheduleHours() {
  return (
    <div className="bg-[#1F2B6C] text-white rounded-lg shadow p-8 w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Shedule hours</h2>
      <div className="mb-8">
        {[
          ["Monday", "09:00 AM - 07:00 PM"],
          ["Tuesday", "09:00 AM - 07:00 PM"],
          ["Wednesday", "09:00 AM - 07:00 PM"],
          ["Thursday", "09:00 AM - 07:00 PM"],
          ["Friday", "09:00 AM - 07:00 PM"],
          ["Saturday", "09:00 AM - 07:00 PM"],
          ["Sunday", "Closed"],
        ].map(([day, hours], idx) => (
          <div key={day} className="flex items-center justify-between py-1 border-b border-white/10 last:border-b-0">
            <span>{day}</span>
            <span className="mx-2">—</span>
            <span className={hours === "Closed" ? "text-[#BFD2F8]" : ""}>{hours}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 justify-center border-t border-white/20 pt-4 mt-4">
        <FiPhoneCall className="text-[#BFD2F8] text-lg" />
        <span className="text-lg">Emergency<br /><span className="text-base">(237) 681-812-255</span></span>
      </div>
    </div>
  );
} 