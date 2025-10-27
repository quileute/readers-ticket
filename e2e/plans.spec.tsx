import { test, expect } from "@playwright/test";

test("complete user flow: select plan → customize → ticket", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/plans");

  await expect(page.locator('h1:has-text("Choose your plan")')).toBeVisible();

  const planButtons = await page.locator("button").count();
  expect(planButtons).toBeGreaterThan(0);

  // choose plan
  await page.click('button:has-text("Bookworm")');
  await page.getByRole("button", { name: /next/i }).first().click();

  // options page
  await expect(page).toHaveURL(/.*options/);

  // go to ticket
  await page.click('button:has-text("Next")');
  await expect(page).toHaveURL(/.*ticket/);

  // check that ticket is displayed
  await expect(page.locator('h2:has-text("Readers Ticket")')).toBeVisible();
  await expect(page.locator('button:has-text("Print PDF")')).toBeVisible();
});
