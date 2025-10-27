import { isExclusiveUpgraded } from "./";
import { Feature } from "@/types";

describe("isExclusiveUpgraded", () => {
  const mockFeatures: Feature[] = [
    { id: "audiobooks", category: "Audio", label: "Audiobooks", price: 7 },
    { id: "users-2", category: "Users", label: "2 users", price: 0 },
    { id: "users-4", category: "Users", label: "4 users", price: 5 },
    { id: "users-8", category: "Users", label: "8 users", price: 10 },
  ];

  test("returns false for non-existent feature", () => {
    const result = isExclusiveUpgraded("non-existent", mockFeatures, []);
    expect(result).toBe(false);
  });

  test("returns false if included feature not from exclusive category", () => {
    const result = isExclusiveUpgraded("audiobooks", mockFeatures, []);
    expect(result).toBe(false);
  });

  test("returns false when no upgrade", () => {
    const result = isExclusiveUpgraded("users-4", mockFeatures, []);
    expect(result).toBe(false);
  });

  test("detects when exclusive feature is upgraded", () => {
    const result = isExclusiveUpgraded("users-2", mockFeatures, ["users-4"]);
    expect(result).toBe(true);
  });
});
