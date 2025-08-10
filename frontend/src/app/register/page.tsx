"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaPaperPlane } from "react-icons/fa";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div
      className="min-h-screen w-full flex"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-10 mt-2">
            Create Your Account
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter Your Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-gray-700 mb-1"
              >
                Password Confirmation
              </label>
              <div className="relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Enter Your Confirm Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-gray-700">
                I Agree Terms and conditions
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FaPaperPlane /> Register
            </button>
          </form>
          <div className="mt-10 text-center text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login in here
            </Link>
          </div>
        </div>
      </div>
      {/* Right: Image/Blue Gradient */}
      <div
        className="hidden md:flex flex-1 items-center justify-center relative"
        style={{ background: "none", overflow: "hidden" }}
      >
        <Image
          src="/assets/images/auth/auth-bg.jpg"
          alt="Background Hexagons"
          fill
          style={{ objectFit: "cover", zIndex: 0 }}
        />
        <div
          className="absolute inset-0 flex items-center justify-end z-10"
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              position: "relative",
              right: "-190px", // push image further right, so it's cut off
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/assets/images/landing/auth_page.png"
              alt="Dashboard Mockup"
              width={900}
              height={600}
              className="rounded-xl shadow-2xl"
              style={{
                maxHeight: "90%",
                width: "auto",
                objectFit: "contain",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
