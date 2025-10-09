"use client";

import useReadersStore from "@/store/useReadersStore";
import type { Feature } from "@/types";
import { isExclusiveUpgraded } from "@/utils";

export default function Summary() {
  const { plans, features, selectedPlanId, extraFeatureIds, total } =
    useReadersStore();
  const plan = plans.find((p) => p.id === selectedPlanId);

  if (!plan) return null;

  const includedIds = plan.includedFeatureIds.filter(
    (id) => !isExclusiveUpgraded(id, features, extraFeatureIds),
  );

  const includedFormats: Feature[] = [];
  const otherIncluded: Feature[] = [];
  includedIds.forEach((id) => {
    const feature = features.find((f) => f.id === id);
    if (!feature) {
      return;
    }
    if (feature?.category === "Formats") {
      includedFormats.push(feature);
    } else {
      otherIncluded.push(feature);
    }
  });

  const extras = extraFeatureIds
    .map((id) => features.find((f) => f.id === id))
    .filter(Boolean) as Feature[];

  const extraFormats = extras.filter((f) => f.category === "Formats");
  const otherExtras = extras.filter((f) => f.category !== "Formats");

  const extraFormatsPrice = extraFormats.reduce(
    (sum, f) => sum + (f.price ?? 0),
    0,
  );

  return (
    <div className="space-y-4 rounded-xl bg-white/30 p-6 shadow-sm">
      <h2 className="text-success text-center text-lg font-semibold">
        Summary
      </h2>

      <div className="flex justify-between">
        <p className="text-primary font-medium">{plan.name} plan</p>
        <p className="text-gray-500">${plan.price}</p>
      </div>

      {includedIds.length > 0 && (
        <div>
          <p className="text-accent mb-3 text-sm font-bold tracking-wide uppercase">
            Included
          </p>

          {includedFormats.length > 0 && (
            <p className="mt-1 text-sm text-gray-700">
              Formats: {includedFormats.map((f) => f.label).join(", ")}
            </p>
          )}

          {otherIncluded.length > 0 && (
            <ul className="mt-1 space-y-1 text-sm text-gray-700">
              {otherIncluded.map((f) => {
                return <li key={f.id}>{f.label}</li>;
              })}
            </ul>
          )}
        </div>
      )}

      {extras.length > 0 && (
        <div>
          <p className="text-accent mb-3 text-sm font-bold tracking-wide uppercase">
            Extras
          </p>
          <ul className="mt-1 space-y-1 text-sm text-gray-700">
            {extraFormats.length > 0 && (
              <li className="flex justify-between">
                Formats: {extraFormats.map((f) => f.label).join(", ")}
                <span className="text-gray-500">+${extraFormatsPrice}</span>
              </li>
            )}

            {otherExtras.map((f) => (
              <li key={f.id} className="flex justify-between">
                {f.label} <span className="text-gray-500">+${f.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t-2 border-gray-300 pt-4 text-right text-lg">
        <span className="">$</span>
        <span className="font-bold">{total()}</span>
        <span className="text-base">/mo</span>
      </div>
    </div>
  );
}
