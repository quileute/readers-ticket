import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

vi.mock("next/image", () => {
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) => {
      return React.createElement("img", { ...props });
    },
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));
