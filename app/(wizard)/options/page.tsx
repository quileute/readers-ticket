import Step2Options from "@/components/Step2Options";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import type { Metadata } from "next";
import StepNavigation from "@/components/StepNavigation";
import Summary from "@/components/Summary";
import { steps } from "@/data/steps";
import { Step } from "@/types";

const stepSlugs = steps.map((s) => s.slug);
const currentStep = steps.find((s) => s.slug === stepSlugs[1]) as Step;
export const metadata: Metadata = {
  title: currentStep.title,
  description: currentStep.description,
};

export default async function PlansPage() {
  return (
    <div>
      <section className="mx-auto mt-12 flex min-h-[550px] max-w-6xl flex-col justify-between">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] lg:items-start">
          <Step2Options />
          <div className="summary-scroll mx-auto w-[250px] lg:mr-0 lg:max-h-[45vh] lg:overflow-y-visible">
            <Summary />
          </div>
        </div>
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
