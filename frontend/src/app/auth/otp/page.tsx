import { Metadata } from "next";
import BannerSection from "@/components/widgets/about/BannerSection";
import Otp from "@/components/widgets/auth/Otp";

export const metadata: Metadata = {
  title: "Verify OTP | MEDDICAL",
  description: "Enter your OTP to verify your MEDDICAL account and continue.",
  keywords: ["otp", "verify", "medical", "hospital", "auth"],
};

const section = {
  image: "/images/about/hero.png",
  breadcrumb: "Home / OTP",
  title: "Verify OTP"
};

export default function OtpPage() {
  return (
    <>
      <BannerSection section={section} />
      <div className="mt-8 md:mt-12">
        <Otp />
      </div>
    </>
  );
} 