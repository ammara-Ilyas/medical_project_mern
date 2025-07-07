import { Metadata } from "next";
import BannerSection from "@/components/widgets/about/BannerSection";
import Signup from "@/components/widgets/auth/Signup";

export const metadata: Metadata = {
  title: "Sign Up | MEDDICAL",
  description: "Create your MEDDICAL account to access appointments, records, and more.",
  keywords: ["signup", "register", "medical", "hospital", "auth"],
};

const section = {
  image: "/images/about/hero.png",
  breadcrumb: "Home / Sign Up",
  title: "Sign Up"
};

export default function SignupPage() {
  return (
    <>
      <BannerSection section={section} />
      <Signup />
    </>
  );
} 