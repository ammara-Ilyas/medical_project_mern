import BannerSection from "@/components/widgets/about/BannerSection";
import ServicesGridSection from "@/components/widgets/services/ServicesGridSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | MEDDICAL",
  description: "Explore our medical services, expert care, and modern facilities.",
};

const section={
  image:"/images/services/hero.png",
  breadcrumb:"Home / Services",
  title:"Services"
}
export default function ServicesPage() {
  return (
    <main>
      <BannerSection section={section} />
      <ServicesGridSection />
    </main>
  );
} 