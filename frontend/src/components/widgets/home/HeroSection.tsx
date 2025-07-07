import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="w-full min-h-[480px]  relative flex flex-col justify-end"
      style={{ backgroundImage: 'url(/images/home/hero.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-white/70" />
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-12 pb-0 min-h-[400px]">
        {/* Left: Text Content */}
        <div className="flex-1 text-left mb-8 md:mb-0">
          <span className="text-[#159EEC] font-semibold tracking-widest text-xs md:text-sm uppercase block mb-2">Caring for Life</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1F2B6C] mb-4 leading-tight">
            Leading the Way<br />in Medical Excellence
          </h1>
          <button className="bg-[#EAF6FF] text-[#1F2B6C] px-6 py-2 rounded-full font-semibold hover:bg-[#159EEC] hover:text-white transition shadow mb-4">
            Our Services
          </button>
        </div>
        {/* Right: Doctor Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image src="/images/home/hero.png" alt="Doctor" width={350} height={400} className="w-72 md:w-96 h-auto object-contain" />
        </div>
      </div>
      {/* Appointment Cards Row */}
      <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-center gap-4 px-4 md:px-0 -mt-10 md:-mt-8">
        {/* Card 1 */}
        <div className="bg-[#1F2B6C] text-white rounded-lg flex-1 flex flex-row items-center justify-between p-6 min-w-[200px] max-w-xs h-24 shadow-md">
          <span className="font-semibold text-base">Book an Appointment</span>
          <Image src="/images/home/appointment.png" alt="Appointment" width={40} height={40} className="w-10 h-10" />
        </div>
        {/* Card 2 */}
        <div className="bg-[#EAF6FF] text-[#1F2B6C] rounded-lg flex-1 flex flex-row items-center justify-between p-6 min-w-[200px] max-w-xs h-24 shadow-md border border-[#159EEC]">
          <span className="font-semibold text-base">Book an Appointment</span>
          <Image src="/images/home/doctor-group.png" alt="Doctor Group" width={40} height={40} className="w-10 h-10" />
        </div>
        {/* Card 3 */}
        <div className="bg-[#159EEC] text-white rounded-lg flex-1 flex flex-row items-center justify-between p-6 min-w-[200px] max-w-xs h-24 shadow-md">
          <span className="font-semibold text-base">Book an Appointment</span>
          <Image src="/images/home/doctor_02.png" alt="Card" width={40} height={40} className="w-10 h-10" />
        </div>
      </div>
    </section>
  );
} 