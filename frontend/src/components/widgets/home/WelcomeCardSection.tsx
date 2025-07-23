import { FiArrowRight } from "react-icons/fi";

export default function WelcomeCardSection() {
  return (
    <section className="w-full flex justify-center py-8">
      <div className="border border-[#159EEC] bg-white rounded-md max-w-xl w-full px-6 py-6 text-center shadow-sm">
        <div className="uppercase text-[#159EEC] font-semibold mb-2 tracking-widest text-sm">Welcome to Meddical</div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2B6C] mb-3">A Great Place to Receive Care</h2>
        <p className="text-gray-700 mb-4 text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
        </p>
        <button className="mt-2  px-5 py-2 bg-transparent border border-[#159EEC] text-[#159EEC] rounded-full font-semibold flex items-center gap-2 mx-auto hover:bg-[#159EEC] hover:text-white transition">
          Learn More <FiArrowRight />
        </button>
      </div>
    </section>
  );
}
