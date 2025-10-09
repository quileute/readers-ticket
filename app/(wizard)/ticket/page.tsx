import StepNavigation from "@/components/StepNavigation";
import TicketCard from "@/components/TicketCard";
import { Metadata } from "next";
import { steps } from "@/data/steps";
import { Step } from "@/types";

const stepSlugs = steps.map((s) => s.slug);
const currentStep = steps.find((s) => s.slug === stepSlugs[2]) as Step;
export const metadata: Metadata = {
  title: currentStep.title,
  description: currentStep.description,
};

export default function TicketPage() {
  return (
    <div>
      <section className="mx-auto mt-12 flex min-h-[550px] max-w-6xl flex-col justify-between">
        <TicketCard />
        <div className="mt-12">
          <StepNavigation />
        </div>
      </section>
    </div>
  );
}
