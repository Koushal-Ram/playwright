import { test, expect } from "@playwright/test";
import login from "../../test data/static.json";

test("login with valid credentials", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  // Using Css
  await page
    .locator("input[placeholder='Username']")
    .fill(process.env.APP_USERNAME);

  await page.locator("input[type='password']").click();

  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.APP_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("login with correct username and wrong password", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page
    .getByRole("textbox", { name: "Username" })
    .fill(process.env.APP_USERNAME);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(login.wrongpassword);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test("login with empty fields", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Required").first()).toBeVisible();
  await expect(page.getByText("Required").nth(1)).toBeVisible();
});
