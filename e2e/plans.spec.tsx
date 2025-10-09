import { test, expect } from "@playwright/test";

test("step1 → step2 navigation", async ({ page }) => {
  await page.goto("http://localhost:3000/plans");
  await page.getByRole("button", { name: /bookworm/i }).click();

  await page.getByRole("button", { name: /next/i }).first().click();

  await expect(page).toHaveURL("/options");
});
