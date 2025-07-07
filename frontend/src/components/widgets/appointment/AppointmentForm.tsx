"use client";
import React, { useState } from "react";

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    doctor: "",
    department: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment Form Data:", form);
    setForm({
      name: "",
      gender: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      doctor: "",
      department: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#1F2B6C] rounded-lg p-6 md:p-8 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Book an Appointment</h2>
      <p className="text-white mb-6 text-sm md:text-base max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Name" className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 md:border-b-0 md:border-r border-r-white/20 focus:outline-none" />
        <select name="gender" value={form.gender} onChange={handleChange} className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 focus:outline-none">
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 md:border-b-0 md:border-r border-r-white/20 focus:outline-none" />
        <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="Phone" className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 focus:outline-none" />
        <input name="date" value={form.date} onChange={handleChange} type="date" placeholder="Date" className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 md:border-b-0 md:border-r border-r-white/20 focus:outline-none" />
        <input name="time" value={form.time} onChange={handleChange} type="time" placeholder="Time" className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 focus:outline-none" />
        <select name="doctor" value={form.doctor} onChange={handleChange} className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 md:border-b-0 md:border-r border-r-white/20 focus:outline-none">
          <option value="">Doctor</option>
          <option>Dr. John Smith</option>
          <option>Dr. Jane Doe</option>
        </select>
        <select name="department" value={form.department} onChange={handleChange} className="bg-[#1F2B6C] text-white px-4 py-2 border-b border-white/20 focus:outline-none">
          <option value="">Department</option>
          <option>Cardiology</option>
          <option>Neurology</option>
        </select>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="bg-[#1F2B6C] text-white px-4 py-2 md:col-span-2 h-24 resize-none border-b border-white/20 focus:outline-none" />
        <button type="submit" className="bg-[#BFD2F8] text-[#1F2B6C] font-semibold py-2 md:col-span-2 w-full">SUBMIT</button>
      </form>
    </div>
  );
} 