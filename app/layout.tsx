import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import React from "react";
import HydrateStore from "@/components/HydrateStore";
import "./app.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const merri = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Readers Ticket",
    template: "%s - Readers Ticket",
  },
  description: "Your ticket to the wonderful world of reading.",
};

async function getPlans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans`, {
    cache: "no-store",
  });
  return res.json();
}
async function getFeatures() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/features`, {
    cache: "no-store",
  });
  return res.json();
}
async function getFAQItems() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faq-items`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plans, features, faqItems] = await Promise.all([
    getPlans(),
    getFeatures(),
    getFAQItems(),
  ]);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${merri.variable}`}>
        <HydrateStore plans={plans} features={features} faqItems={faqItems} />
        {children}
      </body>
    </html>
  );
}
