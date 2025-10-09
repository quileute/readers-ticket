import Step1Plans from "@/components/Step1Plans";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import type { Metadata } from "next";
import StepNavigation from "@/components/StepNavigation";
import { steps } from "@/data/steps";
import { Step } from "@/types";

const stepSlugs = steps.map((s) => s.slug);
const currentStep = steps.find((s) => s.slug === stepSlugs[0]) as Step;
export const metadata: Metadata = {
  title: currentStep.title,
  description: currentStep.description,
};

export default async function PlansPage() {
  return (
    <div>
      <section className="mx-auto mt-12 flex min-h-[550px] max-w-6xl flex-col justify-between">
        <Step1Plans />
        <div className="mt-12">
          <StepNavigation />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl lg:mt-30">
        <PricingTable />
      </section>
      <section className="mx-auto mt-20 max-w-3xl">
        <FAQ />
      </section>
    </div>
  );
}
