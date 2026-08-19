import { test, expect } from "@playwright/test";
import buzz from "../../test data/static.json";

test("create a Buzz post", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page
    .getByRole("textbox", { name: "Username" })
    .fill(process.env.APP_USERNAME);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.APP_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "Buzz" })).toBeVisible();
  await page.getByRole("link", { name: "Buzz" }).click();

  await expect(page.getByText("Buzz Newsfeed")).toBeVisible();

  const postText = buzz.post;

  await page
    .getByRole("textbox", { name: "What's on your mind?" })
    .fill(postText);

  await page.getByRole("button", { name: "Post", exact: true }).click();

  await expect(page.getByText(postText).first()).toBeVisible();
});

test("comment to a buzz post", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  await page
    .getByRole("textbox", { name: "Username" })
    .fill(process.env.APP_USERNAME);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.APP_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("link", { name: "Buzz" })).toBeVisible();
  await page.getByRole("link", { name: "Buzz" }).click();
  await expect(page.getByText("Buzz Newsfeed")).toBeVisible();
  await expect(
    page
      .locator(
        "div:nth-child(2) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > button",
      )
      .first(),
  ).toBeVisible();
  await page
    .locator(
      "div:nth-child(2) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > button",
    )
    .first()
    .click();
  await page
    .getByRole("textbox", { name: "Write your comment..." })
    .fill(buzz.comment);
  await page
    .getByRole("textbox", { name: "Write your comment..." })
    .press("Enter");
});
