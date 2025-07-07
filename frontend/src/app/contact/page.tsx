import BannerSection from "@/components/widgets/about/BannerSection";
import ContactForm from "@/components/widgets/contact/ContactForm";
import ContactInfoGrid from "@/components/widgets/contact/ContactInfoGrid";
import ContactMap from "@/components/widgets/contact/ContactMap";

export const metadata = {
  title: "Contact Us | MEDDICAL",
  description: "Contact MEDDICAL hospital for inquiries, appointments, and support.",
};

const section = {
  image: "/images/contact/contact_hero.png",
  breadcrumb: "Home / Contact",
  title: "Contact us"
};

export default function ContactPage() {
  return (
    <>
      <BannerSection section={section} />
      <div className="container mx-auto py-12 px-4">
        <ContactMap />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-lg shadow p-8">
            <ContactForm />
          </div>
          <ContactInfoGrid />
        </div>
      </div>
    </>
  );
} 