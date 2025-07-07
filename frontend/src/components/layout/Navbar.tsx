"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Doctors", href: "/doctors" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const { user, isAuthenticated, logout } = useUser();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fixed dark navbar always at top */}
      <nav className="w-full px-0 bg-blue-900 text-white fixed top-0 left-0 z-50" style={{height: '56px'}}>
        <div className="md:container mx-auto flex items-center justify-between px-4 py-3 md:px-16">
          {/* Mobile: Logo left, icons group right */}
          <div className="flex md:hidden items-center w-full">
            <span className="text-xl font-bold text-white tracking-wide mr-auto">
              <span className="text-white">MEDD</span><span className="text-blue-300">ICAL</span>
            </span>
            <div className="flex items-center gap-x-2">
              <button className="p-2 rounded-full hover:bg-blue-800 focus:outline-none">
                <FiSearch size={18} />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-800 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 flex-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-blue-300 transition-colors">
                {link.name}
              </Link>
            ))}
            {/* Admin Link for Desktop */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link href="/admin" className="hover:text-blue-300 transition-colors text-yellow-300 font-semibold">
                Admin
              </Link>
            )}
          </div>
          {/* Search, Appointment Button, and Mobile Menu */}
          <div className="hidden md:flex items-center space-x-3 md:space-x-0">
            <button className="p-2 rounded-full hover:bg-blue-800 focus:outline-none">
              <FiSearch size={18} />
            </button>
            {/* Desktop Appointment Button */}
            <Link href="/appointment" className="hidden md:inline-block ml-4">
              <button className="bg-white text-blue-900 font-semibold px-4 py-1 rounded-full shadow hover:bg-blue-100 transition-colors">
                Appointment
              </button>
            </Link>
            {/* Desktop Auth Button */}
            {!isAuthenticated ? (
              <Link href="/auth/login" className="hidden md:flex ml-4">
                <button className="text-blue-200 hover:text-white text-sm transition-colors">
                  Login
                </button>
              </Link>
            ) : (
              <button 
                onClick={handleLogout}
                className="hidden md:flex ml-4 text-blue-200 hover:text-white text-sm transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Menu: open panel below navbar */}
      {menuOpen && (
        <div className="md:hidden border-2 border-red-900 fixed left-0 right-0 top-14 bg-[#EAF6FF] z-40 flex flex-col justify-start items-center px-4 pt-4 " style={{paddingTop: '1.5rem'}}>
          {/* Links */}
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`w-full text-center py-2 text-lg ${pathname === link.href ? "font-bold text-[#1F2B6C]" : "text-[#1F2B6C] font-normal"}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Admin Link for Mobile */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                href="/admin"
                className="w-full text-center py-2 text-lg font-bold text-yellow-600"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>
          {/* Auth Button Section */}
          <div className="w-full mb-4">
            {!isAuthenticated ? (
              <Link 
                href="/auth/login" 
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                <button className="w-full text-sm text-[#1F2B6C] hover:text-blue-600 transition-colors">
                  Login
                </button>
              </Link>
            ) : (
              <button 
                onClick={handleLogout}
                className="w-full text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
          {/* Appointment Button */}
          <Link href="/appointment" className="w-full mb-6">
            <button className="w-full bg-[#1F2B6C] text-white font-semibold px-4 py-2 rounded-full">
              Appointment
            </button>
          </Link>
        </div>
      )}
      {/* Spacer for fixed navbar */}
      <div className="md:hidden" style={{height: '56px'}}></div>
    </>
  );
};

export default Navbar; 