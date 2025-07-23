import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="w-full relative flex flex-col justify-end"
      style={{ backgroundImage: 'url(/images/home/hero.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-white/70" />
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 pb-0 min-h-[400px]">
        {/* Left: Text Content */}
        <div className="flex-1 text-left mb-8 md:mb-0 w-full md:w-1/2">
          <span className="text-[#1F2B6C] font-semibold animate-pulse hover:animate-none tracking-widest text-xs sm:text-sm md:text-base uppercase block mb-2">Caring for Life</span>
          <h1 className="text-2xl sm:text-3xl leading-none md:text-5xl font-bold text-[#1F2B6C] mb-4 leading-tight">
            Leading the Way<br className=""/>in Medical Excellence
          </h1>
          <button className="bg-[#EAF6FF] animate-bounce mt-5 hover:animate-none duration-100 text-[#1F2B6C] px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-[#159EEC] hover:text-white transition shadow mb-4 text-sm sm:text-base">
            Our Services
          </button>
        </div>
        {/* Right: Doctor Image */}
        {/* <div className="relative h-40 sm:h-56 md:h-[300px] mt-6 md:mt-10 w-full md:w-1/2 flex items-start justify-center">
          <Image 
            src="/images/home/hero.png" 
            alt="Doctor" 
            fill
            className="object-contain object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div> */}
      </div>
      {/* Appointment Cards Row */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-2 sm:px-4 md:px-0 mt-6 md:mt-10 max-w-5xl mx-auto">
        {/* Card 1 */}
        <Link href="/appointment" className="w-full sm:w-auto max-w-xs flex-1">
          <div className="bg-[#1F2B6C] text-white rounded-lg flex flex-row items-center justify-between p-4 sm:p-6 min-w-0 h-20 sm:h-24 shadow-lg cursor-pointer">
            <span className="font-semibold text-sm sm:text-base">Book an Appointment</span>
          </div>
        </Link>
        {/* Card 2 */}
        <Link href="/appointment" className="w-full sm:w-auto max-w-xs flex-1">
          <div className="bg-[#EAF6FF] text-[#1F2B6C] rounded-lg flex flex-row items-center justify-between p-4 sm:p-6 min-w-0 h-20 sm:h-24 shadow-lg border border-[#159EEC] cursor-pointer">
            <span className="font-semibold text-sm sm:text-base">Book an Appointment</span>
          </div>
        </Link>
        {/* Card 3 */}
        <Link href="/appointment" className="w-full sm:w-auto max-w-xs flex-1">
          <div className="bg-[#159EEC] text-white rounded-lg flex flex-row items-center justify-between p-4 sm:p-6 min-w-0 h-20 sm:h-24 shadow-lg cursor-pointer">
            <span className="font-semibold text-sm sm:text-base">Book an Appointment</span>
          </div>
        </Link>
      </div>
    </section>
  );
} 