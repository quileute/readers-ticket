"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import useReadersStore from "@/store/useReadersStore";
import { steps } from "@/data/steps";

export default function StepNavigation() {
  const router = useRouter();
  const selected = useReadersStore((s) => s.selectedPlanId);

  const [isPending, startTransition] = useTransition();

  const requestPrint = useReadersStore((s) => s.requestPrint);

  const currentSlug = usePathname().replace(/\//, "");
  const currentIndex = steps.findIndex((s) => s.slug === currentSlug);

  const handleBack = () => {
    startTransition(() => {
      const prev = Math.max(currentIndex - 1, 0);
      router.push(`/${steps[prev].slug}`);
    });
  };

  const handleNext = () => {
    startTransition(() => {
      const next = Math.min(currentIndex + 1, steps.length - 1);
      router.push(`/${steps[next].slug}`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
      {currentIndex > 0 && (
        <button
          className="btn btn-outline w-80 sm:w-40"
          onClick={handleBack}
          disabled={isPending}
        >
          Back
        </button>
      )}

      {currentIndex < steps.length - 1 && (
        <button
          className="btn btn-primary w-80 sm:w-40"
          disabled={!selected || isPending}
          onClick={handleNext}
        >
          Next
        </button>
      )}

      {currentIndex === steps.length - 1 && (
        <button
          className="btn btn-primary w-80 sm:w-40"
          onClick={() => requestPrint()}
        >
          Print PDF
        </button>
      )}
    </div>
  );
}
