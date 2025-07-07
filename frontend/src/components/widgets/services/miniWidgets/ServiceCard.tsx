import { FiActivity, FiBriefcase } from "react-icons/fi";
import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";

type ServiceCardProps = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  icon?: ReactNode;
  hovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function ServiceCard({
  id,
  title,
  description,
  image,
  icon,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: ServiceCardProps) {
  return (
    <div
      className="rounded-lg shadow bg-white overflow-hidden transition-all duration-200 border relative group cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-full h-40">
        <Image src={image} alt={title} fill className="object-cover" />
        {hovered && (
          <div className="absolute inset-0 bg-[#1F2B6C] opacity-80 z-10 transition-all duration-200 pointer-events-none" />
        )}
        <div
          className={`absolute bottom-0 right-0 m-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
            hovered
              ? "bg-white text-[#1F2B6C] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 m-0 absolute"
              : "bg-[#1F2B6C] text-white"
          }`}
          style={hovered ? { position: "absolute" } : {}}
        >
          {icon || <FiActivity size={28} />}
        </div>
      </div>
      <div className="p-4 text-[#1F2B6C]">
        <div className="font-bold text-lg mb-2">{title}</div>
        <div className="text-sm mb-4">{description}</div>
        <Link
          href={`/services/${id}`}
          className="text-xs font-semibold underline transition-colors text-[#159EEC] flex items-center gap-1"
        >
          Learn More <FiBriefcase className="inline-block" /> &rarr;
        </Link>
      </div>
    </div>
  );
} 