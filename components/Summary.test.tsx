import { render, screen } from "@testing-library/react";
import Summary from "./Summary";
import useReadersStore from "@/store/useReadersStore";
import { vi } from "vitest";
import { mockUseReadersStore } from "@/utils/test-utils";
import { plans } from "@/data/plans";

vi.mock("@/store/useReadersStore");

test("displays plan summary with included & extra features", () => {
  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: [plans[1]], // bookworm plan
      features: [
        {
          id: "basic-formats",
          category: "Formats",
          label: "EPUB, FB2, PDF",
          price: 0,
        },
        {
          id: "extended-formats",
          category: "Formats",
          label: "CBR, CBZ",
          price: 5,
        },
        {
          id: "webinars",
          category: "Perks",
          label: "Webinars & events",
          price: 8,
        },
        { id: "users-4", category: "Users", label: "4 users", price: 0 },
      ],
      selectedPlanId: "bookworm",
      extraFeatureIds: ["webinars"],
      total: vi.fn(() => 19),
    }),
  );

  render(<Summary />);

  expect(screen.getByText("Bookworm plan")).toBeInTheDocument();
  expect(screen.getByText("$19")).toBeInTheDocument();
  expect(screen.getByText(/EPUB, FB2, PDF, CBR, CBZ/)).toBeInTheDocument();
  expect(screen.getByText(/Webinars & events/)).toBeInTheDocument();
});
