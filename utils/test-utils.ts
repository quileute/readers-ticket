import { vi } from "vitest";
import { State } from "@/store/useReadersStore";

export const createStoreMock = (overrides: Partial<State> = {}): State => {
  const baseMock = {
    plans: [],
    features: [],
    selectedPlanId: null,
    extraFeatureIds: [],
    faqItems: [],
    total: vi.fn(() => 0),
    printRequestId: 0,
    selectPlan: vi.fn(),
    toggleFeature: vi.fn(),
    reset: vi.fn(),
    requestPrint: vi.fn(),
    setData: vi.fn(),
    setExtraFeatureIds: vi.fn(),
    ...overrides,
  };

  return baseMock as unknown as State;
};

export const mockUseReadersStore = (overrides: Partial<State> = {}) => {
  const state = createStoreMock(overrides);
  return vi.fn((selector?: (state: State) => unknown) => {
    return selector ? selector(state) : state;
  });
};
