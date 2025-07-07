interface BannerSectionProps {
  section: {
    image: string;
    breadcrumb: string;
    title: string;
  };
}

export default function BannerSection({ section }: BannerSectionProps) {
  return (
    <section 
    className="w-full h-48 md:h-56 flex items-center justify-start bg-cover bg-center relative px-6 md:px-16"
    style={{
      backgroundImage: `url(${section.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      <div className="absolute inset-0 bg-white/50" />
      <div className="relative z-10 text-left pl-8 md:pl-20 bg-[#1F2B6C]/5">
        <div className="text-sm mb-1 text-[#1F2B6C] opacity-80">{section.breadcrumb}</div>
        <h1 className="text-3xl md:text-4xl text-[#1F2B6C] font-bold">{section.title}</h1>
      </div>
    </section>
  );
} 