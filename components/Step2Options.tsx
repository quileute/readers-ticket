"use client";

import useReadersStore from "@/store/useReadersStore";
import OptionsGroup from "./OptionsGroup";
import ExclusiveGroup from "./ExclusiveGroup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { specialCategories } from "@/utils";

export default function Step2Options() {
  const { plans, features, selectedPlanId } = useReadersStore();
  const plan = plans.find((p) => p.id === selectedPlanId);
  const router = useRouter();

  useEffect(() => {
    if (!plan) {
      const t = setTimeout(() => router.push("/plans"), 1000);
      return () => clearTimeout(t);
    }
  });

  const formats = features.filter((f) => f.category === "Formats");
  const users = features.filter((f) => f.category === "Users");
  const cloud = features.filter((f) => f.category === "Cloud");
  const others = features.filter(
    (f) => !specialCategories.includes(f.category),
  );

  return plan ? (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white/30 p-6 shadow-sm">
        <OptionsGroup title="Formats" features={formats} plan={plan} />
        <ExclusiveGroup title="Users" exclusiveFeatures={users} plan={plan} />
        <ExclusiveGroup title="Cloud" exclusiveFeatures={cloud} plan={plan} />
      </div>

      <div className="space-y-6 rounded-xl border border-gray-200 bg-white/30 p-6 shadow-sm">
        <OptionsGroup title="Other extras" features={others} plan={plan} />
      </div>
    </div>
  ) : (
    <div className="mt-20 ml-auto text-center">
      <p className="text-lg font-semibold text-gray-700">
        No plan selected. Redirecting to Plans...
      </p>
    </div>
  );
}
