import { FiPhone, FiMapPin, FiMail, FiClock } from "react-icons/fi";

const contacts = [
  {
    icon: <FiPhone size={32} />,
    title: "EMERGENCY",
    lines: ["(237) 681-812-255", "(237) 666-331-894"],
    dark: false,
  },
  {
    icon: <FiMapPin size={32} />,
    title: "LOCATION",
    lines: ["0123 Some place", "9876 Some country"],
    dark: true,
  },
  {
    icon: <FiMail size={32} />,
    title: "EMAIL",
    lines: ["fildineesece@gmail.com", "mybestudios@gmail.com"],
    dark: false,
  },
  {
    icon: <FiClock size={32} />,
    title: "WORKING HOURS",
    lines: ["Mon-Sat 09:00-20:00", "Sunday Emergency only"],
    dark: false,
  },
];

export default function ContactSection() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="uppercase text-[#159EEC] font-semibold tracking-widest text-sm mb-1">Get in Touch</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F2B6C]">Contact</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {contacts.map((c, i) => (
            <div
              key={i}
              className={
                `flex flex-col items-center bg-[#BFD2F8] text-[#1F2B6C] hover:bg-[#1F2B6C] hover:text-white justify-center rounded-lg p-6 min-h-[180px] transition-colors
                `
              }
            >
              <div className="mb-3">{c.icon}</div>
              <div className="font-bold uppercase mb-1">{c.title}</div>
              {c.lines.map((line, idx) => (
                <div key={idx} className="text-sm">{line}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 