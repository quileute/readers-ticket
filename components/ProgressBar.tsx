"use client";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { steps } from "@/data/steps";

export default function ProgressBar() {
  const pathname = usePathname();

  const currentIndex = steps.findIndex((s) =>
    pathname.startsWith(`/${s.slug}`),
  );
  const step = currentIndex === -1 ? 0 : currentIndex;
  const totalSteps = steps.length;
  const progress = (step / (totalSteps - 1)) * 100;

  let iconOffset;
  if (progress === 0) {
    iconOffset = 2;
  } else if (progress === 100) {
    iconOffset = 30;
  } else {
    iconOffset = 16;
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="bg-muted h-2 rounded-full" />
      <div
        className="bg-primary absolute top-0 left-0 h-2 rounded-full transition-all duration-700 ease-in-out"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute -top-[10px] transition-all duration-700 ease-in-out"
        style={{ left: `calc(${progress}% - ${iconOffset}px)` }}
      >
        <BookOpen className="text-primary h-8 w-8 fill-[#f9f8f6]" />
      </div>
    </div>
  );
}
