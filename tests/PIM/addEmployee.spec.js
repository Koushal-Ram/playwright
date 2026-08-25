import { test, expect } from "@playwright/test";
import credentials from "../../test data/static.json";
import { fakerEN_IN as faker } from "@faker-js/faker";

const username = process.env.APP_USERNAME || credentials.username;
const password = process.env.APP_PASSWORD || credentials.password;

test("test", async ({ page }) => {
  let firstName = faker.person.firstName();
  let middleName = faker.person.middleName();
  let lastName = faker.person.lastName();
  let empId = faker.string.numeric(6);

  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  await page.getByRole("textbox", { name: "Username" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("**/dashboard/index");
  await expect(page.getByRole("link", { name: "PIM" })).toBeVisible();
  await page.getByRole("link", { name: "PIM" }).click();
  await expect(page.getByRole("button", { name: " Add" })).toBeVisible();
  await page.getByRole("button", { name: " Add" }).click();
  await expect(
    page.getByRole("heading", { name: "Add Employee" }),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "First Name" }).click();
  await page.getByRole("textbox", { name: "First Name" }).fill(firstName);
  await page.getByRole("textbox", { name: "Middle Name" }).click();
  await page.getByRole("textbox", { name: "Middle Name" }).fill(middleName);
  await page.getByRole("textbox", { name: "Last Name" }).click();
  await page.getByRole("textbox", { name: "Last Name" }).fill(lastName);
  await page.getByRole("textbox").nth(4).click();
  await page.getByRole("textbox").nth(4).fill(empId);
  await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
  await page.getByRole("button", { name: "Save" }).click();
});
