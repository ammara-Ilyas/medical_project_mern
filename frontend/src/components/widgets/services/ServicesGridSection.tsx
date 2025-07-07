"use client";
import { useEffect, useState } from "react";
import ServiceCard from "./miniWidgets/ServiceCard";
import { FiActivity } from "react-icons/fi";

type Service = {
  title: string;
  description: string;
  image: string;
  icon?: string;
};

const iconMap = {
  FiActivity: <FiActivity size={28} />,
  // Add more icons if needed
};

export default function ServicesGridSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              id={"id" in service ? (service as any).id : idx}
              {...service}
              icon={iconMap[service.icon as keyof typeof iconMap]}
              hovered={hoveredIdx === idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 