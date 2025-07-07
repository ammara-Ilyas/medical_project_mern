import BannerSection from "@/components/widgets/about/BannerSection";
import AboutMainSection from "@/components/widgets/about/AboutMainSection";
import TestimonialSlider from "@/components/widgets/about/TestimonialSlider";

export const metadata = {
  title: "About Us | MEDDICAL",
  description: "Learn more about MEDDICAL hospital, our values, and our commitment to your health.",
};
const section={
  image:"/images/about/hero.png",
  breadcrumb:"Home / About us",
  title:"About us"
}

export default function AboutPage() {
  return (
    <>
      <BannerSection section={section} />
      <AboutMainSection />
      <TestimonialSlider />
    </>
  );
} 