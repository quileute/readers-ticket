import { create } from "zustand";
import { plans } from "@/data/plans";
import { features } from "@/data/features";
import type { FAQItem, Feature, Plan } from "@/types";

type State = {
  plans: Plan[];
  features: Feature[];
  faqItems: FAQItem[];
  selectedPlanId: string | null;
  extraFeatureIds: string[];
  printRequestId: number;

  setData: (plans: Plan[], features: Feature[], faq: FAQItem[]) => void;
  selectPlan: (id: string | null) => void;
  setExtraFeatureIds: (ids: string[]) => void;
  toggleFeature: (
    id: string,
    plan: Plan,
    exclusiveFeatureIds?: string[],
  ) => void;
  reset: () => void;
  total: () => number;
  requestPrint: () => void;
};

const useReadersStore = create<State>((set, get) => ({
  plans: [],
  features: [],
  faqItems: [],
  selectedPlanId: null,
  extraFeatureIds: [],
  printRequestId: 0,

  setData: (plans, features, faq) => set({ plans, features, faqItems: faq }),

  selectPlan: (id) =>
    set({
      selectedPlanId: id,
      extraFeatureIds: [],
      printRequestId: 0,
    }),

  setExtraFeatureIds: (ids) => set({ extraFeatureIds: ids }),

  toggleFeature: (featureId, plan, exclusiveFeatureIds) =>
    set((state) => {
      const extraWithoutExclusiveAndMe = exclusiveFeatureIds
        ? state.extraFeatureIds.filter(
            (id) => !exclusiveFeatureIds.includes(id),
          )
        : state.extraFeatureIds.filter((id) => id !== featureId);
      // included feature is selected: remove all exclusive extras
      if (plan.includedFeatureIds.includes(featureId)) {
        return {
          extraFeatureIds: extraWithoutExclusiveAndMe,
        };
      }
      const isFeatureOn = state.extraFeatureIds.includes(featureId);
      return {
        extraFeatureIds: isFeatureOn
          ? extraWithoutExclusiveAndMe
          : [...extraWithoutExclusiveAndMe, featureId],
      };
    }),

  reset: () =>
    set({
      selectedPlanId: null,
      extraFeatureIds: [],
      printRequestId: 0,
    }),

  // total reads prices from plans + features data
  total: () => {
    const { selectedPlanId, extraFeatureIds } = get();
    const planPrice = plans.find((p) => p.id === selectedPlanId)?.price ?? 0;

    // sum prices from features dataset for selected extras
    const extrasSum = extraFeatureIds.reduce((sum, id) => {
      const f: Feature | undefined = features.find((x) => x.id === id);
      return sum + (f?.price ?? 0);
    }, 0);

    return planPrice + extrasSum;
  },

  requestPrint: () => set((s) => ({ printRequestId: s.printRequestId + 1 })),
}));

export default useReadersStore;
