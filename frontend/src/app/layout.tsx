import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";
import Topbar from "@/components/layout/Topbar";
import { DoctorProvider } from "@/context/DoctorContext";
import { NewsProvider } from "@/context/NewsContext";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <DoctorProvider>
            <NewsProvider>
              <AppProvider>
                <Topbar />
                <Navbar />
                <main>{children}</main>
                <Footer />
              </AppProvider>
            </NewsProvider>
          </DoctorProvider>
        </UserProvider>
      </body>
    </html>
  );
}
