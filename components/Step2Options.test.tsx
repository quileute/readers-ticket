import { render, screen, fireEvent } from "@testing-library/react";
import Step2Options from "./Step2Options";
import useReadersStore from "@/store/useReadersStore";
import { vi } from "vitest";
import { mockUseReadersStore } from "@/utils/test-utils";
import { plans } from "@/data/plans";

vi.mock("@/store/useReadersStore");

test("shows redirect message when no plan selected", () => {
  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      selectedPlanId: null,
    }),
  );

  render(<Step2Options />);
  expect(screen.getByText(/redirecting to plans/i)).toBeInTheDocument();
});

test("displays options when plan is selected", () => {
  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: [plans[1]], // bookworm plan
      selectedPlanId: "bookworm",
    }),
  );

  render(<Step2Options />);

  expect(screen.getByText("Formats")).toBeInTheDocument();
  expect(screen.getByText("Users")).toBeInTheDocument();
  expect(screen.getByText("Cloud")).toBeInTheDocument();
});

test("toggles feature when checkbox is clicked", () => {
  const mockToggleFeature = vi.fn();

  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: [plans[1]], // bookworm plan
      features: [
        {
          id: "advanced-search",
          category: "UX",
          label: "Advanced search",
          price: 5,
        },
        {
          id: "basic-formats",
          category: "Formats",
          label: "EPUB, FB2, PDF",
          price: 0,
        },
      ],
      selectedPlanId: "bookworm",
      extraFeatureIds: [],
      total: vi.fn(() => 19),
      toggleFeature: mockToggleFeature,
    }),
  );

  render(<Step2Options />);

  const checkbox = screen.getByLabelText(/Advanced search/i);
  fireEvent.click(checkbox);

  expect(mockToggleFeature).toHaveBeenCalledWith("advanced-search");
});

test("does not toggle included features", () => {
  const mockToggleFeature = vi.fn();

  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: [plans[1]], // bookworm plan
      features: [
        {
          id: "advanced-search",
          category: "UX",
          label: "Advanced search",
          price: 5,
        },
        {
          id: "basic-formats",
          category: "Formats",
          label: "EPUB, FB2, PDF",
          price: 0,
        },
      ],
      selectedPlanId: "bookworm",
      extraFeatureIds: [],
      total: vi.fn(() => 19),
      toggleFeature: mockToggleFeature,
    }),
  );

  render(<Step2Options />);

  const includedCheckbox = screen.getByLabelText(/EPUB, FB2, PDF/i);
  fireEvent.click(includedCheckbox);

  expect(mockToggleFeature).not.toHaveBeenCalled();
});
