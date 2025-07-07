import BannerSection from "@/components/widgets/about/BannerSection";
import Doctors from "@/components/widgets/doctors/Doctors";


export const metadata = {
  title: "Our Doctors | MEDDICAL",
  description: "Meet our expert medical team at MEDDICAL hospital.",
};
const section={
  image:"/images/about/hero.png",
  breadcrumb:"Home / Doctors",
  title:"Doctors"
}

export default function DoctorsPage() {

  return (
    <>
      <BannerSection section={section} />
     <Doctors/>
    </>
  );
} 