"use client";

import { useEffect } from "react";
import useReadersStore from "@/store/useReadersStore";
import { Plan, Feature, FAQItem } from "@/types";

export default function HydrateStore({
  plans,
  features,
  faqItems,
}: {
  plans: Plan[];
  features: Feature[];
  faqItems: FAQItem[];
}) {
  const setData = useReadersStore((s) => s.setData);

  useEffect(() => {
    setData(plans, features, faqItems);
  }, [plans, features, faqItems, setData]);

  return null;
}
