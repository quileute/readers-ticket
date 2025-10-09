import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Step1Plans from "./Step1Plans";
import useReadersStore from "@/store/useReadersStore";
import { plans as mockPlans } from "@/data/plans";

beforeEach(() => {
  useReadersStore.setState({
    plans: mockPlans,
    selectedPlanId: null,
    extraFeatureIds: [],
  });
});

test("selects a plan on click", () => {
  render(<Step1Plans />);
  const btn = screen.getByRole("button", { name: /bookworm/i });
  fireEvent.click(btn);

  expect(useReadersStore.getState().selectedPlanId).toBe(mockPlans[1].id);
  expect(btn).toHaveAttribute("aria-pressed", "true");
});
