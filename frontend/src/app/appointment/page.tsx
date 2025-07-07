import BannerSection from "@/components/widgets/about/BannerSection";
import AppointmentForm from "@/components/widgets/appointment/AppointmentForm";
import ScheduleHours from "@/components/widgets/appointment/ScheduleHours";

export const metadata = {
  title: "Book Appointment | MEDDICAL",
  description: "Book your appointment with expert doctors at MEDDICAL hospital.",
};
const section = {
  image: "/images/contact/appointment_hero.png",
  breadcrumb: "Home / Appointment",
  title: "Appointment",
};

export default function AppointmentPage() {
  return (
    <>
      <BannerSection section={section} />
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <AppointmentForm />
          <ScheduleHours />
        </div>
      </div>
    </>
  );
} 