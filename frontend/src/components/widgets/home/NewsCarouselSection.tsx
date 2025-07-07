"use client";
import MiniHeading from "@/components/miniWidgets/MiniHeading";
import dynamic from "next/dynamic";
import NewCard from "./miniWidgets/NewCard";
import { useNewsContext } from "@/context/NewsContext";

const Carousel = dynamic(() => import("react-multi-carousel").then(mod => mod.default), { ssr: false });

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 1 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

export default function NewsCarouselSection() {
  const { news } = useNewsContext();
 console.log("news",news);
 
  return (
    <section className="w-full py-12 bg-[#F8FBFF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <MiniHeading heading="News" text="Better Information, Better Health" />
        </div>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={5000}
          showDots
          arrows={false}
        >
          {news.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4">
              <NewCard item={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
} 