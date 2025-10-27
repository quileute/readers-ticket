import { create } from "zustand";
import { plans } from "@/data/plans";
import { features } from "@/data/features";
import type { FAQItem, Feature, Plan } from "@/types";
import { exclusiveCategories } from "@/utils";

export type State = {
  plans: Plan[];
  features: Feature[];
  faqItems: FAQItem[];
  selectedPlanId: string | null;
  extraFeatureIds: string[];
  printRequestId: number;

  setData: (plans: Plan[], features: Feature[], faq: FAQItem[]) => void;
  selectPlan: (id: string | null) => void;
  toggleFeature: (id: string) => void;
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

  toggleFeature: (featureId: string) =>
    set((state) => {
      if (!state.selectedPlanId) return state;

      // find current plan and feature
      const plan = state.plans.find((p) => p.id === state.selectedPlanId);
      const feature = state.features.find((f) => f.id === featureId);

      if (!plan || !feature) return state;

      // check if feature is from exclusive category
      const isExclusive = exclusiveCategories.includes(feature.category);

      if (isExclusive) {
        // find all features from category
        const categoryFeatures = state.features
          .filter((f) => f.category === feature.category)
          .sort((a, b) => a.price - b.price); // Сортируем по цене
        const categoryFeatureIds = categoryFeatures.map((f) => f.id);

        // remove all category features from extras
        const newExtraWithoutCategory = state.extraFeatureIds.filter(
          (id) => !categoryFeatureIds.includes(id),
        );

        // if clicked on included feature
        if (plan.includedFeatureIds.includes(featureId)) {
          return { extraFeatureIds: newExtraWithoutCategory };
        }
        // if clicked on extra feature
        else {
          // check if selected feature is above included
          const includedFeatureInCategory = categoryFeatures.find((f) =>
            plan.includedFeatureIds.includes(f.id),
          );

          if (includedFeatureInCategory) {
            const includedIndex = categoryFeatures.indexOf(
              includedFeatureInCategory,
            );
            const clickedIndex = categoryFeatures.findIndex(
              (f) => f.id === featureId,
            );

            if (clickedIndex < includedIndex) {
              return state;
            }
          }

          const wasOn = state.extraFeatureIds.includes(featureId);
          if (wasOn) {
            return { extraFeatureIds: newExtraWithoutCategory };
          } else {
            return {
              extraFeatureIds: [...newExtraWithoutCategory, featureId],
            };
          }
        }
      }
      // not exclusive feature
      else {
        // feature is already is included in plan
        if (plan.includedFeatureIds.includes(featureId)) {
          return state;
        }

        // toggle ordinary feature
        const isFeatureOn = state.extraFeatureIds.includes(featureId);
        if (isFeatureOn) {
          return {
            extraFeatureIds: state.extraFeatureIds.filter(
              (id) => id !== featureId,
            ),
          };
        } else {
          return {
            extraFeatureIds: [...state.extraFeatureIds, featureId],
          };
        }
      }
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
