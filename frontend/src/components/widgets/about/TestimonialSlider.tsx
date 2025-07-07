'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et..',
    avatar: '/images/about/testimonial.png',
  },
  {
    name: 'Jane Smith',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et.',
    avatar: '/images/about/testimonial.png',
  },
  {
    name: 'Ahmed R.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et.',
    avatar: '/images/about/testimonial.png',
  },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function TestimonialSlider() {
  return (
    <section
      className="w-full py-12 relative bg-blue-900"
      style={{
        backgroundImage: 'url(/images/about/testimonial.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-blue-900/80" />
      <div className="container mx-auto px-4 relative z-10">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={5000}
          showDots
          arrows={false}
        >
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center text-white min-h-[250px]">
              <FaQuoteLeft className="text-4xl mb-10 opacity-40" />
              <p className="text-lg md:text-xl mb-4 max-w-xl mx-auto">{t.text}</p>
              <hr className="w-24 border-t-2 border-white/40 my-4 mb-6 mx-auto" />
              <div className="font-semibold text-base mt-2">{t.name}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
} 