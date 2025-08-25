"use client";
// import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
