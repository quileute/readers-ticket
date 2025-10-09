"use client";
import useReadersStore from "@/store/useReadersStore";
import { Category } from "@/types";
import { specialCategories } from "@/utils";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Check,
  DollarSign,
  BookOpen,
  Cloud,
  Cpu,
  Wrench,
  Users,
  RefreshCcw,
  File,
  Volume2,
  BotMessageSquare,
  Headset,
  Crown,
} from "lucide-react";
import React from "react";

export default function PricingTable() {
  const { plans, features } = useReadersStore();

  const categories = Array.from(new Set(features.map((f) => f.category)));

  const getCategoryIcon = (category: Category) => {
    const commonClassName = "w-5 h-5 text-primary";
    switch (category) {
      case "Formats":
        return <File className={commonClassName} />;
      case "Audio":
        return <Volume2 className={commonClassName} />;
      case "Cloud":
        return <Cloud className={commonClassName} />;
      case "Sync":
        return <RefreshCcw className={commonClassName} />;
      case "UX":
        return <Cpu className={commonClassName} />;
      case "AI & extras":
        return <BotMessageSquare className={commonClassName} />;
      case "Perks":
        return <Crown className={commonClassName} />;
      case "Tools":
        return <Wrench className={commonClassName} />;
      case "Users":
        return <Users className={commonClassName} />;
      case "Support":
        return <Headset className={commonClassName} />;
      default:
        return <BookOpen className={commonClassName} />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-5xl border-collapse">
        <Tooltip.Provider delayDuration={200}>
          <thead>
            <tr>
              <th className="w-1/4 p-6 text-left"></th>
              {plans.map((plan) => (
                <th key={plan.id} className="w-1/4 p-6 text-center">
                  <div className="text-primary text-2xl font-bold">
                    {plan.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const catFeatures = features.filter((f) => f.category === cat);

              // Edge case: Formats / Users / Cloud
              if (specialCategories.includes(cat) && catFeatures.length > 0) {
                return (
                  <React.Fragment key={cat}>
                    <tr className="border-b-2 border-gray-300">
                      <td className="text-secondary p-6 text-lg font-bold">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(cat)}
                          {cat}
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <span className="bg-accent flex h-5 w-5 cursor-default items-center justify-center rounded-full text-sm text-white">
                                ?
                              </span>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              side="top"
                              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-snug font-medium text-gray-700 shadow-lg"
                              sideOffset={4}
                            >
                              {catFeatures[0].tooltip}
                              <Tooltip.Arrow className="fill-white" />
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </div>
                      </td>
                      {plans.map((plan) => {
                        const included = catFeatures.filter((cf) =>
                          plan.includedFeatureIds.includes(cf.id),
                        );

                        if (included.length === 0)
                          return <td key={plan.id}>-</td>;

                        return (
                          <td key={plan.id} className="p-6">
                            <div className="flex items-center justify-center">
                              <span className="text-center">
                                {included.map((f, i) => (
                                  <span
                                    key={f.id}
                                    className={
                                      i === included.length - 1
                                        ? "font-medium"
                                        : "text-gray-400"
                                    }
                                  >
                                    {f.label}
                                    {i < included.length - 1 && ", "}
                                  </span>
                                ))}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              }

              // Default case (with check / cross icons)
              return (
                <React.Fragment key={cat}>
                  <tr className="border-b-2 border-gray-300">
                    <td
                      colSpan={plans.length + 1}
                      className="text-secondary flex items-center gap-2 p-6 text-lg font-bold"
                    >
                      {getCategoryIcon(cat)}
                      {cat}
                    </td>
                  </tr>
                  {catFeatures.map((f) => (
                    <tr
                      key={f.id}
                      className="border-gray-200 [&:not(:last-child)]:border-b-2"
                    >
                      <td className="flex items-center gap-2 p-6 align-middle whitespace-nowrap">
                        {f.label}
                        {f.tooltip && (
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <span className="bg-accent flex h-5 w-5 flex-shrink-0 cursor-default items-center justify-center rounded-full text-sm font-bold text-white">
                                ?
                              </span>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              side="top"
                              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-snug font-medium text-gray-700 shadow-lg"
                              sideOffset={4}
                            >
                              {f.tooltip}
                              <Tooltip.Arrow className="fill-white" />
                            </Tooltip.Content>
                          </Tooltip.Root>
                        )}
                      </td>
                      {plans.map((plan) => {
                        const included = plan.includedFeatureIds.includes(f.id);
                        return (
                          <td key={plan.id}>
                            {included ? (
                              <div className="flex justify-center">
                                <Check className="text-primary h-6 w-6" />
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <DollarSign className="text-success h-5 w-5" />
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </Tooltip.Provider>
      </table>
    </div>
  );
}
