'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "./Auth";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"}`;

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    // Get email from localStorage
    const signupEmail = localStorage.getItem('signupEmail');
    if (!signupEmail) {
      router.push('/auth/signup');
      return;
    }
    setEmail(signupEmail);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await res.json();
      console.log("OTP verification response:", data);
      
      if (!res.ok) {
        throw new Error(data.message || "Invalid OTP");
      }
      
      setMessage("Email verified successfully! Redirecting to login...");
      
      // Clear signup email from localStorage
      localStorage.removeItem('signupEmail');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      const res = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }
      
      setMessage("OTP resent successfully! Check your email.");
      
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <Auth>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Loading...</h2>
          </div>
        </div>
      </Auth>
    );
  }

  return (
    <Auth>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Verify OTP</h2>
        <p className="text-sm text-gray-600 mb-4">
          We've sent a verification code to <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none text-center text-lg tracking-widest"
            maxLength={6}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {message && <div className="text-green-600 text-sm">{message}</div>}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button 
            type="button" 
            onClick={handleResend} 
            className="text-blue-700 hover:underline" 
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-blue-50 flex items-center justify-center">
        <img src="/images/about/hero.png" alt="Medical" className="w-80 h-80 object-contain" />
      </div>
    </Auth>
  );
} 