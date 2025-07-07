import HeroSection from "@/components/widgets/home/HeroSection";
import WelcomeCardSection from "@/components/widgets/home/WelcomeCardSection"
import DoctorsGroup from "@/components/widgets/home/DoctorsGroup";
import FeaturesSection from "@/components/widgets/home/FeaturesSection";
import DoctorsOverview from "@/components/widgets/home/DoctorsOverview";
import TestimonialsSection from "@/components/widgets/home/TestimonialsSection";
import NewsSection from "@/components/widgets/home/NewsSection";
import ServicesSection from "@/components/widgets/home/ServicesSection";
import SpecialtiesSection from "@/components/widgets/home/SpecialtiesSection";
import AppointmentFormSection from "@/components/widgets/home/AppointmentFormSection";
import DoctorsCarouselSection from "@/components/widgets/home/DoctorsCarouselSection";
import NewsCarouselSection from "@/components/widgets/home/NewsCarouselSection";
import AboutSection from "@/components/widgets/home/AboutSection";
import ContactSection from "@/components/widgets/home/ContactSection";

export const metadata = {
  title: "Home | MEDDICAL",
  description: "Welcome to MEDDICAL hospital. Expert doctors, modern services, and quality healthcare.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeCardSection />
      <DoctorsGroup />
      <ServicesSection />
      <SpecialtiesSection />
      <AppointmentFormSection />
      <DoctorsCarouselSection />
      <NewsCarouselSection />
      <ContactSection />
    </>
  );
}