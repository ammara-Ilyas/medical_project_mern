import React from "react";

export default function ContactForm() {
  return (
    <div>
      <div className="text-[#159EEC] font-semibold tracking-widest text-xs md:text-sm uppercase mb-2">GET IN TOUCH</div>
      <h1 className="text-3xl font-bold text-[#1F2B6C] mb-8">Contact</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#1F2B6C] rounded-lg overflow-hidden">
        <input type="text" placeholder="Name" className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 md:border-b-0 md:border-r border-r-white/20 focus:outline-none" />
        <input type="email" placeholder="Email" className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 focus:outline-none" />
        <input type="text" placeholder="Subject" className="bg-[#1F2B6C] text-white px-4 py-2 md:col-span-2 border-b border-white/20 focus:outline-none" />
        <textarea placeholder="Message" className="bg-[#1F2B6C] text-white px-4 py-2 md:col-span-2 h-32 resize-none border-b border-white/20 focus:outline-none" />
        <button type="submit" className="bg-[#BFD2F8] text-[#1F2B6C] font-semibold py-2 md:col-span-2 w-full">SUBMIT</button>
      </form>
    </div>
  );
} 