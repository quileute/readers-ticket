"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useReadersStore from "@/store/useReadersStore";
import type { Feature } from "@/types";
import { isExclusiveUpgraded } from "@/utils";

const TAG_BG_COLORS = ["#fff7e6", "#eeeeff", "#e7f7ef", "#feedff"];

export default function TicketCard() {
  const {
    plans,
    features,
    selectedPlanId,
    extraFeatureIds,
    total,
    printRequestId,
  } = useReadersStore();
  const plan = plans.find((p) => p.id === selectedPlanId);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const ref = useRef<HTMLDivElement | null>(null);

  const validateForm = useCallback(() => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email]);

  useEffect(() => {
    if (!plan) {
      const t = setTimeout(() => router.push("/plans"), 1000);
      return () => clearTimeout(t);
    }
  });

  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: "Readers Ticket",
    onBeforePrint: () => {
      if (!validateForm()) {
        return Promise.reject(new Error("Form invalid"));
      }
      return Promise.resolve();
    },
  });

  useEffect(() => {
    if (printRequestId > 0) {
      handlePrint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printRequestId]);

  const isIncludedHidden = useCallback(isExclusiveUpgraded, [
    features,
    extraFeatureIds,
  ]);

  const includedFiltered = plan
    ? plan.includedFeatureIds.filter(
        (id) => !isIncludedHidden(id, features, extraFeatureIds),
      )
    : [];

  const includedFeatures: Feature[] = includedFiltered
    .map((id) => features.find((f) => f.id === id))
    .filter(Boolean) as Feature[];

  const extraFeatures: Feature[] = extraFeatureIds
    .map((id) => features.find((f) => f.id === id))
    .filter(Boolean) as Feature[];

  // split formats into atomic tokens (for tags)
  const formatTags = useMemo(() => {
    const tags: string[] = [];
    const all = [...includedFeatures, ...extraFeatures];
    all
      .filter((f) => f.category === "Formats")
      .forEach((f) => {
        f.label
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((t) => tags.push(t));
      });
    // unique
    return Array.from(new Set(tags));
  }, [includedFeatures, extraFeatures]);

  // other feature tags (non-formats)
  const otherTags = useMemo(() => {
    const arr = [...includedFeatures, ...extraFeatures].filter(
      (f) => f.category !== "Formats",
    );
    // keep unique by id
    const seen = new Set<string>();
    return arr.filter((f) => {
      if (seen.has(f.id)) return false;
      seen.add(f.id);
      return true;
    });
  }, [includedFeatures, extraFeatures]);

  return plan ? (
    <div
      ref={ref}
      className="print:bg-bg print:flex print:h-screen print:items-center print:justify-center"
    >
      <div className="mx-auto rounded-xl border border-gray-300 bg-white/50 bg-[url('/images/paper-tile2.jpg')] bg-repeat p-7 pt-8 bg-blend-soft-light md:w-[450px] print:w-[450px]">
        <h2 className="text-primary mb-2 text-center text-2xl font-bold">
          Readers Ticket
        </h2>

        <hr className="my-4 border-t-2 border-dashed border-gray-300" />

        <div className="mt-6 space-y-2">
          <label className="flex flex-col">
            <div className="flex items-baseline gap-3">
              <span className="text-secondary font-semibold">Name:</span>
              <input
                type="text"
                className="focus:border-primary min-w-0 flex-1 border-b border-dotted border-gray-400 bg-transparent px-1 py-1 font-semibold text-gray-600 placeholder-gray-400 focus:outline-none print:placeholder-transparent"
                placeholder="Walter Scott"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <p className="text-error mt-0 min-h-[1.25rem] text-sm">
              <span className="print:hidden">{errors.name ?? ""}</span>
            </p>
          </label>

          <label className="flex flex-col">
            <div className="flex items-baseline gap-3">
              <span className="text-secondary font-semibold">Email:</span>
              <input
                type="email"
                className="focus:border-primary min-w-0 flex-1 border-b border-dotted border-gray-400 bg-transparent px-1 py-1 font-semibold text-gray-600 placeholder-gray-400 focus:outline-none print:placeholder-transparent"
                placeholder="walter.scott@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="text-error mt-0 min-h-[1.25rem] text-sm">
              <span className="print:hidden">{errors.email ?? ""}</span>
            </p>
          </label>
        </div>

        <div className="mt-2 mb-5">
          <p className="text-success text-lg font-semibold tracking-wide">
            {plan?.name} Plan
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {formatTags.map((t, i) => (
            <span
              key={`fmt-${t}`}
              className="border-accent/10 rounded-md border-1 px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: TAG_BG_COLORS[i % TAG_BG_COLORS.length],
              }}
            >
              {t}
            </span>
          ))}

          {otherTags.map((f, i) => (
            <span
              key={f.id}
              className="border-accent/10 rounded-md border-1 px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor:
                  TAG_BG_COLORS[(formatTags.length + i) % TAG_BG_COLORS.length],
              }}
            >
              {f.label}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Monthly fee:</div>
            <div className="text-primary mt-1 text-3xl font-bold">
              ${total()}
            </div>
          </div>

          <div className="flex-shrink-0">
            {/* <img
              src="/images/books1_small.png"
              alt="Bookstack"
              width={140}
              height={97}
              className=""
            /> */}
            <Image
              src="/images/books1_small.png"
              alt="Bookstack"
              width={140}
              height={97}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="mx-auto mt-20 text-center">
      <p className="text-lg font-semibold text-gray-700">
        No plan selected. Redirecting to Plans...
      </p>
    </div>
  );
}
