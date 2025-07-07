import Image from "next/image";

export default function AppointmentFormSection() {
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
          <input className="col-span-1 bg-transparent border-b border-white/30 text-white placeholder-white/70 py-2 px-2 focus:outline-none" placeholder="Date" type="date" />
          <input className="col-span-1 bg-transparent border-b border-white/30 text-white placeholder-white/70 py-2 px-2 focus:outline-none" placeholder="Time" type="time" />
          <select className="col-span-1 bg-transparent border-b border-white/30 text-white py-2 px-2 focus:outline-none">
            <option className="text-black" value="">Doctor</option>
            <option className="text-black" value="dr1">Dr. Smith</option>
            <option className="text-black" value="dr2">Dr. Jane</option>
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
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
} 