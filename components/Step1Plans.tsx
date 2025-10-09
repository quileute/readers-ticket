"use client";

import {
  Crown,
  Users,
  BookOpen,
  BookHeart,
  NotebookPen,
  TentTree,
  BookImage,
  Headphones,
  Rocket,
} from "lucide-react";
import useReadersStore from "@/store/useReadersStore";
import Image from "next/image";

function getIcon(name?: string) {
  if (!name) return null;
  const commonClassName = "w-4 h-4 text-[var(--color-primary)]";
  switch (name) {
    case "book-heart":
      return <BookHeart className={commonClassName} />;
    case "notebook-pen":
      return <NotebookPen className={commonClassName} />;
    case "tent-tree":
      return <TentTree className={commonClassName} />;

    case "book-open":
      return <BookOpen className={commonClassName} />;
    case "book-image":
      return <BookImage className={commonClassName} />;
    case "headphones":
      return <Headphones className={commonClassName} />;

    case "crown":
      return <Crown className={commonClassName} />;
    case "rocket":
      return <Rocket className={commonClassName} />;
    case "users":
      return <Users className={commonClassName} />;
    default:
      return null;
  }
}

export default function Step1Plans() {
  const { plans, selectedPlanId: selected, selectPlan } = useReadersStore();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => {
        const isSelected = selected === plan.id;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => {
              selectPlan(plan.id);
            }}
            aria-pressed={isSelected}
            className={`flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-white/30 transition duration-200 hover:shadow-lg ${
              isSelected
                ? "border-[var(--color-primary)]"
                : "border-gray-300 hover:border-[var(--color-bg)]"
            }`}
          >
            <div className="h-40 bg-gray-200">
              <Image
                src={
                  plan.image ||
                  "https://source.unsplash.com/600x400/?books,library"
                }
                alt={plan.name}
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="mt-5 text-left text-gray-600">{plan.description}</p>

              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((f: any, i: number) => {
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="">{getIcon(f.icon)}</span>
                      <span className="text-left whitespace-normal">
                        {f.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6">
                <div className="text-right">
                  <sup className="ml-1 text-base font-normal text-gray-500">
                    $
                  </sup>
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-base font-normal text-gray-500">
                    /mo
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
