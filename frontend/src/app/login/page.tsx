"use client";
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { RootState } from "../../store";
import { login as loginThunk } from "../../features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  return (
    <div
      className="min-h-screen w-full flex"
      style={{
        fontFamily: "'Segoe UI', Arial, sans-serif",
        background: "#fff",
      }}
    >
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md px-4">
          <h2
            className="text-[2rem] font-bold text-center mb-10 mt-2 text-gray-800 tracking-tight"
            style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
          >
            Welcome To Rentproperty
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-[15px] text-gray-800 mb-1 font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#f8f9fa] text-[15px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
                style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[15px] text-gray-800 mb-1 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter Your Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#f8f9fa] text-[15px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 pr-10 transition"
                  style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-blue-500 hover:text-blue-700 p-1 bg-transparent"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  style={{ fontSize: "1.1rem" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="mr-2 accent-blue-600"
                />
                <label htmlFor="remember" className="text-[15px] text-gray-800">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline text-[14px] font-normal"
              >
                Forgot your password?
              </Link>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm text-[16px]"
              style={{
                fontFamily: "'Segoe UI', Arial, sans-serif",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              }}
              disabled={loading}
            >
              <i
                className="fa fa-sign-in mr-2"
                style={{ fontSize: "1.1rem", color: "#fff" }}
              />
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-10 text-center text-gray-700 text-[15px]">
            Don&apos;t Have An Account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Create an account
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
