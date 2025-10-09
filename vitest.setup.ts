import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock next/image to simple <img /> for jsdom tests
vi.mock("next/image", () => {
  return {
    __esModule: true,
    default: (props: any) => {
      return React.createElement("img", props);
    },
  };
});
