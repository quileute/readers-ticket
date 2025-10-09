"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import useReadersStore from "@/store/useReadersStore";
import type { Plan, Feature } from "@/types";

type OptionsGroupProps = {
  title: string;
  plan: Plan;
  features: Feature[];
};

export default function OptionsGroup({
  title,
  plan,
  features,
}: OptionsGroupProps) {
  const extraFeatureIds = useReadersStore((s) => s.extraFeatureIds);
  const toggleFeature = useReadersStore((s) => s.toggleFeature);

  return (
    <>
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <ul className="space-y-3">
        {features.map((f) => {
          const isIncluded = plan?.includedFeatureIds.includes(f.id);
          const checked = extraFeatureIds.includes(f.id);
          return (
            <li key={f.id} className="flex items-start gap-3">
              <label className="flex items-center gap-3">
                <Checkbox.Root
                  checked={isIncluded || checked}
                  disabled={isIncluded}
                  onCheckedChange={() => toggleFeature(f.id, plan)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-400 data-[disabled]:!border-gray-500 data-[disabled]:!bg-gray-500"
                >
                  <Checkbox.Indicator>
                    <Check className="h-4 w-4 text-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-gray-700">{f.label}</span>
              </label>
              {!isIncluded && f.price > 0 && (
                <span className="ml-auto text-sm text-gray-500">
                  ${f.price}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
