"use client";
import { useEffect, useState } from "react";
import MiniHeading from "@/components/miniWidgets/MiniHeading";
import { FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import DoctorCard from "./miniWidgets/DoctorCard";
import { useDoctorContext } from "@/context/DoctorContext";

const Carousel = dynamic(() => import("react-multi-carousel").then(mod => mod.default), { ssr: false });

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

export default function DoctorsCarouselSection() {
  const { doctors, loading, error } = useDoctorContext();

  if (loading) return <div className="text-center py-8">Loading doctors...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <section className="w-full  py-12 bg-white">
      <div className="container mx-auto px-4 border-2 border-[#BFD2F8] rounded-lg">
        <div className="text-center mb-8 mt-4">
          <MiniHeading heading="Our Doctors" text="Trusted Care" />
        </div>
        {/* <div>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={5000}
          showDots
          arrows={false}
        >
            {doctors.map((doc, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow flex flex-col border">
                <DoctorCard doc={doc} />
              </div>
            ))}
                      </Carousel>
        </div> */}
      </div>
    </section>
  );
}