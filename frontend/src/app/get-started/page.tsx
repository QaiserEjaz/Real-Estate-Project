"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Carousel data and component (move above main export)
const benefitsData = [
  {
    img: "/assets/images/landing/1.png",
    title: "Dashboard",
    desc: "Property management refers to the administration, operation, and oversight of real estate properties on behalf of property owners.",
  },
  {
    img: "/assets/images/landing/2.png",
    title: "Property",
    desc: "Property management refers to the administration, operation, and oversight of real estate properties on behalf of property owners.",
  },
  {
    img: "/assets/images/landing/3.png",
    title: "Property Detail",
    desc: "Property management refers to the administration, operation, and oversight of real estate properties on behalf of property owners.",
  },
  {
    img: "/assets/images/landing/4.png",
    title: "Tenant",
    desc: "Property management refers to the administration, operation, and oversight of real estate properties on behalf of property owners.",
  },
  {
    img: "/assets/images/landing/5.png",
    title: "Invoice",
    desc: "Property management refers to the administration, operation, and oversight of real estate properties on behalf of property owners.",
  },
];

function BenefitsCarousel() {
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 3;
  const maxIdx = benefitsData.length - visibleCount;

  const handlePrev = () => {
    setStartIdx((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const handleNext = () => {
    setStartIdx((prev) => (prev < maxIdx ? prev + 1 : maxIdx));
  };

  return (
    <div className="relative flex items-center justify-center group">
      {/* Left Button */}
      <button
        onClick={handlePrev}
        className={`absolute left-[-32px] md:left-[-48px] z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#ff7f32] text-white shadow-lg transition-opacity duration-200 border-4 border-white focus:outline-none opacity-0 group-hover:opacity-100 hover:bg-[#ff9800] ${
          startIdx === 0 ? "pointer-events-none opacity-30" : ""
        }`}
        style={{ top: "50%", transform: "translateY(-50%)" }}
        aria-label="Previous"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      {/* Cards */}
      <div className="flex gap-8 justify-center items-stretch w-full">
        {benefitsData
          .slice(startIdx, startIdx + visibleCount)
          .map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow p-6 w-[340px] flex flex-col items-center border border-gray-100 hover:shadow-lg transition"
              style={{ minHeight: 370 }}
            >
              <div className="mb-4">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={320}
                  height={180}
                  className="img-fluid rounded"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="text-center">
                <h5 className="font-bold text-xl mb-2">{item.title}</h5>
                <p className="text-gray-600 text-center text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
      </div>
      {/* Right Button */}
      <button
        onClick={handleNext}
        className={`absolute right-[-32px] md:right-[-48px] z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#ff7f32] text-white shadow-lg transition-opacity duration-200 border-4 border-white focus:outline-none opacity-0 group-hover:opacity-100 hover:bg-[#ff9800] ${
          startIdx === maxIdx ? "pointer-events-none opacity-30" : ""
        }`}
        style={{ top: "50%", transform: "translateY(-50%)" }}
        aria-label="Next"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

export default function GetStarted() {
  return (
    <div className="min-h-screen w-full font-['Montserrat',Arial,Helvetica,sans-serif]">
      {/* Header/Navbar */}
      <header className="w-full z-20 bg-transparent absolute top-0 left-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6 md:px-12">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/assets/images/logo/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="img-fluid landing-logo"
                priority
              />
            </Link>
            <span className="font-bold text-xl text-white">Smart Tenant</span>
          </div>
          <nav className="flex gap-6 items-center">
            <a className="text-white font-medium hover:underline" href="#demos">
              Home
            </a>
            <a
              className="text-white font-medium hover:underline"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="text-white font-medium hover:underline"
              href="#features"
            >
              Features
            </a>
            <a className="text-white font-medium hover:underline" href="#faq">
              FAQs
            </a>
            <Link
              className="bg-[#2196f3] hover:bg-[#1769aa] text-white font-semibold px-4 py-2 rounded transition"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="bg-[#2196f3] hover:bg-[#1769aa] text-white font-semibold px-4 py-2 rounded transition"
              href="/register"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero Section - covers full screen */}
      <section
        id="demos"
        className="relative flex flex-col md:flex-row items-center justify-center min-h-screen h-screen px-6 md:px-20 overflow-hidden"
        style={{ background: "#0b2239" }}
      >
        <Image
          src="/assets/images/auth/auth-bg.jpg"
          alt="Hexagon BG"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 pointer-events-none"
        />
        <div className="flex-1 flex flex-col justify-center items-start z-10 max-w-xl">
          <h1
            className="text-white text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
          >
            Smart Tenant - Property Management System
          </h1>
          <p className="text-white text-lg mb-8 max-w-xl opacity-90">
            Property management refers to the administration, operation, and
            oversight of real estate properties on behalf of property owners. It
            involves various tasks such as marketing rental properties, finding
            tenants, collecting rent and ensuring legal compliance.
          </p>
          <Link
            href="#"
            className="inline-block px-6 py-2 bg-[#2196f3] text-white font-semibold rounded shadow hover:bg-[#1769aa] transition border border-[#2196f3] hover:border-[#1769aa]"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              fontSize: "1rem",
            }}
          >
            <i className="fa fa-play mr-2" style={{ color: "#fff" }} /> Get
            Started
          </Link>
        </div>
        <div className="flex-1 flex justify-end items-center z-10 mt-10 md:mt-0 max-w-xl">
          {/* <Image
            src="/assets/images/landing/1.png"
            alt="Dashboard"
            width={420}
            height={260}
            className="rounded-xl shadow-2xl border border-white/10"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
          /> */}
        </div>
      </section>
      {/* Benefits Section - Carousel */}
      <section className="py-20 bg-[#f5f7fa]" id="benefits">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2196f3] mb-2">
              Our Benefits
            </h2>
            <h1 className="text-2xl font-bold text-[#222]">
              Reason to Choose US
            </h1>
          </div>
          {/* Carousel logic */}
          <BenefitsCarousel />
        </div>
      </section>
      {/* Pricing Section */}
      <section
        className="min-h-screen flex items-center"
        id="pricing"
        style={{ background: "#0b2239" }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#2196f3] mb-2">
              Affordable Pricing Based On Your Needs
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-lg shadow-lg pt-0 pb-10 px-0 w-[500px] min-h-[400px] flex flex-col items-center overflow-hidden">
              {/* Perfect semi-ellipse BASIC header */}
              <div className="w-full">
                <div
                  className="w-full bg-[#2196f3] flex flex-col items-center justify-center"
                  style={{
                    height: "105px",
                    borderBottomLeftRadius: "250px",
                    borderBottomRightRadius: "250px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  }}
                >
                  <div className="text-white font-bold text-2xl mb-1 mt-2">
                    BASIC
                  </div>
                  <div className="text-white text-lg font-semibold">
                    $0 <span className="text-sm font-normal">/ Unlimited</span>
                  </div>
                </div>
              </div>
              <ul className="w-full flex flex-col items-center py-8 mt-4">
                <li className="flex items-center gap-2 mb-2 text-green-600 text-lg">
                  <FaCheckCircle /> 10 User Limit
                </li>
                <li className="flex items-center gap-2 mb-2 text-green-600 text-lg">
                  <FaCheckCircle /> 10 Property Limit
                </li>
                <li className="flex items-center gap-2 mb-2 text-green-600 text-lg">
                  <FaCheckCircle /> 10 Tenant Limit
                </li>
                <li className="flex items-center gap-2 mb-2 text-red-500 text-lg">
                  <FaTimesCircle /> Coupon Applicable
                </li>
                <li className="flex items-center gap-2 mb-2 text-green-600 text-lg">
                  <FaCheckCircle /> User Logged History
                </li>
              </ul>
              <button className="px-3 bg-[#2196f3] hover:bg-[#1769aa] text-white font-semibold py-2 rounded transition text-lg mt-2">
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-[#f5f7fa]" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#2196f3] mb-0">Features</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 4, 5, 7, 6].map((n, i) => (
              <div
                key={n}
                className="w-88 flex flex-col items-center transition group p-0"
              >
                <div
                  className="bg-white p-4 relative w-full flex flex-col items-center justify-center"
                  style={{ height: "200px" }}
                >
                  <Image
                    src={`/assets/images/landing/${n}.png`}
                    alt={`Feature ${n}`}
                    width={288}
                    height={200}
                    className=" p-2 img-fluid rounded-lg w-full h-full object-cover transition duration-300 group-hover:brightness-50"
                    style={{
                      objectFit: "cover",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }}
                  />
                  {/* Overlay with icons on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-lg">
                    <div className="flex gap-4">
                      <Image
                        src="/assets/images/landing/feathure/bootstrap.png"
                        alt="Bootstrap"
                        width={40}
                        height={40}
                        className="bg-white rounded shadow p-8"
                      />
                      <Image
                        src="/assets/images/landing/feathure/tailwind.png"
                        alt="Tailwind"
                        width={40}
                        height={40}
                        className="bg-white rounded shadow p-8"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end w-full py-3">
                  <h3 className="font-bold text-xl mb-0 text-center text-[#222]">
                    {
                      [
                        "Dashboard",
                        "Property",
                        "Tenant",
                        "Invoice detail",
                        "Expenses",
                        "User Roles & Permissions",
                      ][i]
                    }
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-[#08202c]" id="faq">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-[#2196f3] mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="bg-white rounded-md shadow-lg p-8 max-w-6xl mx-auto">
            <div className="text-xl font-medium m-3 mb-6 text-[#222]">
              Installation Question
            </div>
            <div className="flex flex-col gap-4 m-3">
              {[
                {
                  q: "What does LOREM mean?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipisici elit… (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.",
                },
                {
                  q: "Where can I subscribe to your newsletter?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipisici elit… (complete text) is dummy text that is not meant to mean anything.",
                },
                {
                  q: "Where can in edit my address?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipisici elit… (complete text) is dummy text that is not meant to mean anything.",
                },
                {
                  q: "Can I order a free copy of a magazine to sample?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipisici elit… (complete text) is dummy text that is not meant to mean anything.",
                },
                {
                  q: "Do you accept orders via Phone or E-mail?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipisici elit… (complete text) is dummy text that is not meant to mean anything.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-2 m-1 flex items-center justify-between shadow-sm"
                >
                  <span className="text-base text-[#222] font-medium m-2">
                    {item.q}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#222"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 bg-white  mt-0">
        <div className="max-w-7xl mx-auto text-center px-6">
          <span className="text-gray-500 font-bold text-sm">
            Copyright 2025 Real State Project By Qaiser Ejaz
          </span>
        </div>
      </footer>
    </div>
  );
}
