"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { Feature, Plan } from "@/types";
import useReadersStore from "@/store/useReadersStore";

type ExclusiveGroupProps = {
  title: string;
  exclusiveFeatures: Feature[];
  plan: Plan;
};

export default function ExclusiveGroup({
  title,
  exclusiveFeatures,
  plan,
}: ExclusiveGroupProps) {
  const { extraFeatureIds, toggleFeature } = useReadersStore();

  // which exclusive feature is included in plan
  const includedId = plan.includedFeatureIds.find((featureId) =>
    exclusiveFeatures.some((f) => f.id === featureId),
  );
  // visible: show only features >= included
  const visibleFeatures = exclusiveFeatures.slice(
    exclusiveFeatures.findIndex((f) => f.id === includedId),
  );
  // which exclusive feature is upgraded (extra selected)
  const extraId = extraFeatureIds.find((featureId) =>
    exclusiveFeatures.some((f) => f.id === featureId),
  );
  // activeId: upgraded (extra feature) or included
  const activeId = extraId ?? includedId ?? "";

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <RadioGroup.Root
        value={activeId}
        onValueChange={(id) =>
          toggleFeature(
            id,
            plan,
            exclusiveFeatures.map((f) => f.id),
          )
        }
        className="flex flex-wrap gap-2"
      >
        {visibleFeatures.map((f) => {
          const isIncluded = f.id === includedId;
          const showPrice = !isIncluded && f.price > 0;
          return (
            <RadioGroup.Item
              key={f.id}
              value={f.id}
              className="data-[state=checked]:bg-primary bg-muted hover:bg-accent/10 flex cursor-pointer items-center rounded-full px-3 py-1 text-sm text-gray-800 transition data-[state=checked]:text-white"
            >
              {f.label}
              {showPrice && <span className="ml-1 text-xs">+${f.price}</span>}
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
    </div>
  );
}
