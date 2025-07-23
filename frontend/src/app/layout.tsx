import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";
import Topbar from "@/components/layout/Topbar";
import { DoctorProvider } from "@/context/DoctorContext";
import { NewsProvider } from "@/context/NewsContext";
import { UserProvider } from "@/context/UserContext";
import { usePathname } from 'next/navigation';
import AppShell from './AppShell';
import { AppointmentProvider } from "@/context/AppointmentContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEDDICAL - Hospital Website",
  description: "Qualified healthcare, expert doctors, and modern medical services.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <UserProvider>
          <DoctorProvider>
            <NewsProvider>
              <AppProvider>
                <AppointmentProvider>
                  <AppShell>{children}</AppShell>
                </AppointmentProvider>
              </AppProvider>
            </NewsProvider>
          </DoctorProvider>
        </UserProvider>
      </body>
    </html>
  );
}
