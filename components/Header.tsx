"use client";

import { usePathname } from "next/navigation";
import ProgressBar from "./ProgressBar";
import { steps } from "@/data/steps";

export default function Header() {
  const currentSlug = usePathname().replace(/\//, "");
  const currentStep = steps.find((s) => s.slug === currentSlug);
  return (
    <header className="mt-16 text-center">
      <h1 className="text-4xl font-bold">
        {currentStep?.title || "Readers Ticket"}
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        {currentStep?.description ||
          "Your ticket to the wonderful world of reading."}
      </p>
      <div className="mt-12 mb-10">
        <ProgressBar />
      </div>
    </header>
  );
}
