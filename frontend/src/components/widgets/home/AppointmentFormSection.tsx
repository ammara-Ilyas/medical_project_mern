"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { appointmentsAPI, doctorsAPI } from "../../../services/api";

export default function AppointmentFormSection() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [days, setDays] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch doctors on mount
  useEffect(() => {
    setLoadingDoctors(true);
    doctorsAPI.getAll().then((res: any) => {
      setDoctors(res.data || []);
    }).finally(() => setLoadingDoctors(false));
  }, []);

  // Fetch available days when doctor selected
  useEffect(() => {
    if (selectedDoctor) {
      setLoadingDays(true);
      appointmentsAPI.getAvailableDays().then((res: any) => {
        setDays(res.data || []);
      }).finally(() => setLoadingDays(false));
      setSelectedDay("");
      setSlots([]);
      setSelectedSlot("");
    }
  }, [selectedDoctor]);

  // Fetch available slots when day selected
  useEffect(() => {
    if (selectedDoctor && selectedDay) {
      setLoadingSlots(true);
      appointmentsAPI.getAvailableSlots(selectedDay, selectedDoctor).then((res: any) => {
        setSlots(res.data || []);
      }).finally(() => setLoadingSlots(false));
      setSelectedSlot("");
    }
  }, [selectedDoctor, selectedDay]);

  return (
    <section
      className="w-full py-12 bg-white"
      style={{
        background: "url(/images/home/appointment.png) center left/cover no-repeat",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left: Info */}
        <div className="flex-1 max-w-md mb-8 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-[#159EEC] mb-2">Book an Appointment</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
          </p>
        </div>
        {/* Right: Form */}
        <form className="flex-1 max-w-xl w-full bg-[#1F2B6C] rounded-md shadow-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="col-span-1 bg-transparent border-b border-white/30 text-white placeholder-white/70 py-2 px-2 focus:outline-none" placeholder="Name" />
          <select className="col-span-1 bg-transparent border-b border-white/30 text-white py-2 px-2 focus:outline-none">
            <option className="text-black" value="">Gender</option>
            <option className="text-black" value="male">Male</option>
            <option className="text-black" value="female">Female</option>
          </select>
          <input className="col-span-1 bg-transparent border-b border-white/30 text-white placeholder-white/70 py-2 px-2 focus:outline-none" placeholder="Email" />
          <input className="col-span-1 bg-transparent border-b border-white/30 text-white placeholder-white/70 py-2 px-2 focus:outline-none" placeholder="Phone" />

          {/* Doctor Dropdown */}
          <select
            className="col-span-1 bg-transparent border-b border-white/30 text-white py-2 px-2 focus:outline-none"
            value={selectedDoctor}
            onChange={e => setSelectedDoctor(e.target.value)}
            disabled={loadingDoctors}
          >
            <option className="text-black" value="">Select Doctor</option>
            {doctors.map((doc: any) => (
              <option className="text-black" value={doc._id} key={doc._id}>{doc.user?.name || doc.name}</option>
            ))}
          </select>

          {/* Day Dropdown */}
          <select
            className="col-span-1 bg-transparent border-b border-white/30 text-white py-2 px-2 focus:outline-none"
            value={selectedDay}
            onChange={e => setSelectedDay(e.target.value)}
            disabled={!selectedDoctor || loadingDays}
          >
            <option className="text-black" value="">Select Day</option>
            {days.map((d: any) => (
              <option className="text-black" value={d.date} key={d.date}>{d.weekday} ({d.date})</option>
            ))}
          </select>

          {/* Slot Dropdown */}
          <select
            className="col-span-1 bg-transparent border-b border-white/30 text-white py-2 px-2 focus:outline-none"
            value={selectedSlot}
            onChange={e => setSelectedSlot(e.target.value)}
            disabled={!selectedDay || loadingSlots}
          >
            <option className="text-black" value="">Select Time Slot</option>
            {slots.map((slot: any) => (
              <option
                className="text-black"
                value={slot.time}
                key={slot.time}
                disabled={!slot.available}
                style={!slot.available ? { opacity: 0.5 } : {}}
              >
                {slot.time} {slot.available ? "" : "(Booked)"}
              </option>
            ))}
          </select>

          <select className="col-span-1 bg-transparent border-b border-white/30 text-white py-2 px-2 focus:outline-none">
            <option className="text-black" value="">Department</option>
            <option className="text-black" value="cardio">Cardiology</option>
            <option className="text-black" value="neuro">Neurology</option>
          </select>
          <textarea
            className="col-span-2 bg-transparent border-b border-white/30 text-white placeholder-white/70 py-2 px-2 focus:outline-none resize-none"
            placeholder="Message"
            rows={2}
          />
          <button
            type="submit"
            className="col-span-2 mt-4 bg-[#BFD2F8] text-[#1F2B6C] font-bold py-2 rounded transition hover:bg-[#159EEC] hover:text-white"
            disabled={!selectedDoctor || !selectedDay || !selectedSlot}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
} 