import { Metadata } from "next";
import BannerSection from "@/components/widgets/about/BannerSection";
import Login from "@/components/widgets/auth/Login";

export const metadata: Metadata = {
  title: "Login | MEDDICAL",
  description: "Login to your MEDDICAL account to access appointments, records, and more.",
  keywords: ["login", "medical", "hospital", "auth", "signin"],
};

const section = {
  image: "/images/about/hero.png",
  breadcrumb: "Home / Login",
  title: "Login"
};

export default function LoginPage() {
  return (
    <>
      <BannerSection section={section} />
      <Login />
    </>
  );
} 