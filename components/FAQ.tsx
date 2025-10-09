"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import useReadersStore from "@/store/useReadersStore";

export default function FAQ() {
  const { faqItems: items } = useReadersStore();
  return (
    <div>
      <h2 className="mb-2 text-center text-3xl font-bold">F.A.Q</h2>
      <p className="mb-8 text-center text-gray-600">
        Frequently Asked Questions
      </p>

      <Accordion.Root type="multiple" className="space-y-4">
        {items.map((item, i) => (
          <Accordion.Item
            key={i}
            value={`faq-${i}`}
            className="rounded-lg border border-gray-200 shadow-sm"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between p-6">
                <span className="text-left">{item.question}</span>

                <span className="relative flex h-10 w-10 items-center justify-center">
                  <span className="absolute h-10 w-10 scale-0 rounded-full bg-gray-200 opacity-0 transition-all duration-300 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-50" />

                  <ChevronDown className="text-primary relative z-10 h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden text-gray-600">
              <div className="px-8 pb-6">{item.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
