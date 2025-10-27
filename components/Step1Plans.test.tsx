import { render, screen, fireEvent } from "@testing-library/react";
import Step1Plans from "./Step1Plans";
import useReadersStore from "@/store/useReadersStore";
import { plans as mockPlans } from "@/data/plans";
import { vi } from "vitest";
import { mockUseReadersStore } from "@/utils/test-utils";

vi.mock("@/store/useReadersStore");

test("displays all plans with prices", () => {
  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: mockPlans,
      selectedPlanId: null,
    }),
  );

  render(<Step1Plans />);
  expect(screen.getByRole("heading", { name: "Reader" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Bookworm" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Bibliophile" }),
  ).toBeInTheDocument();
});

test("selects a plan on click", () => {
  const mockSelectPlan = vi.fn();

  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: mockPlans,
      selectedPlanId: null,
      selectPlan: mockSelectPlan,
    }),
  );

  render(<Step1Plans />);
  const bookwormBtn = screen.getByRole("button", { name: /bookworm/i });
  fireEvent.click(bookwormBtn);

  expect(mockSelectPlan).toHaveBeenCalledWith("bookworm");
});
