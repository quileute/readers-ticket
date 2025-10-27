import { render, screen } from "@testing-library/react";
import TicketCard from "./TicketCard";
import useReadersStore from "@/store/useReadersStore";
import { vi } from "vitest";
import { mockUseReadersStore } from "@/utils/test-utils";
import { plans } from "@/data/plans";

vi.mock("@/store/useReadersStore");

test("shows redirect when no plan selected", () => {
  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      selectedPlanId: null,
    }),
  );

  render(<TicketCard />);
  expect(screen.getByText(/redirecting to plans/i)).toBeInTheDocument();
});

test("displays ticket form when plan selected", () => {
  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: [plans[1]],
      features: [
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
      printRequestId: 0,
    }),
  );

  render(<TicketCard />);

  expect(screen.getByText("Readers Ticket")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/walter scott/i)).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText(/walter scott/i);
  expect(nameInput).toHaveValue("");
});

test("displays format tags and feature tags correctly", () => {
  vi.mocked(useReadersStore).mockImplementation(
    mockUseReadersStore({
      plans: [plans[0]], // reader plan
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
          id: "users-2",
          category: "Users",
          label: "2 users",
          price: 0,
        },
        {
          id: "users-4",
          category: "Users",
          label: "4 users",
          price: 0,
        },
        {
          id: "cloud-1gb",
          category: "Cloud",
          label: "1 GB storage",
          price: 0,
        },
      ],
      selectedPlanId: "reader",
      extraFeatureIds: ["extended-formats", "users-4"],
      total: vi.fn(() => 19), // 9 + 5 + 5
      printRequestId: 0,
    }),
  );

  render(<TicketCard />);

  expect(screen.getByText("EPUB")).toBeInTheDocument();
  expect(screen.getByText("FB2")).toBeInTheDocument();
  expect(screen.getByText("PDF")).toBeInTheDocument();

  expect(screen.getByText("CBR")).toBeInTheDocument();
  expect(screen.getByText("CBZ")).toBeInTheDocument();

  expect(screen.queryByText("2 users")).not.toBeInTheDocument();
  expect(screen.getByText("4 users")).toBeInTheDocument();
  expect(screen.getByText("1 GB storage")).toBeInTheDocument();

  expect(screen.getByText("$19")).toBeInTheDocument();
});
