import { test } from "@playwright/test";
import data from "../../test data/static.json";
import { fakerEN_IN as faker } from "@faker-js/faker";

test("Verify form submission using hardcoded data", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await page.getByRole("link", { name: "Elements" }).click();
  await page.getByRole("link", { name: "Text Box" }).click();

  await page.getByRole("textbox", { name: "Full Name" }).fill("koushal");
  await page
    .getByRole("textbox", { name: "name@example.com" })
    .fill("koushal@gmail.com");
  await page.getByRole("textbox", { name: "Current Address" }).fill("Tumkur");
  await page.locator("#permanentAddress").fill("Tumkur");

  await page.getByRole("button", { name: "Submit" }).click();
});

test("Verify form submission using JSON data", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await page.getByRole("link", { name: "Elements" }).click();
  await page.getByRole("link", { name: "Text Box" }).click();

  await page.getByRole("textbox", { name: "Full Name" }).fill(data.name);
  await page
    .getByRole("textbox", { name: "name@example.com" })
    .fill(data.email);
  await page
    .getByRole("textbox", { name: "Current Address" })
    .fill(data.currentAddress);
  await page.locator("#permanentAddress").fill(data.permanentAddress);

  await page.getByRole("button", { name: "Submit" }).click();
});

test("Verify form submission using Faker.js data", async ({ page }) => {
  let name = faker.person.fullName();
  let email = faker.internet.email();
  let currentAddress = faker.location.streetAddress();
  let permanentAddress = faker.location.streetAddress();

  await page.goto("https://demoqa.com/");
  await page.getByRole("link", { name: "Elements" }).click();
  await page.getByRole("link", { name: "Text Box" }).click();

  await page.getByRole("textbox", { name: "Full Name" }).fill(name);
  await page.getByRole("textbox", { name: "name@example.com" }).fill(email);
  await page
    .getByRole("textbox", { name: "Current Address" })
    .fill(currentAddress);
  await page.locator("#permanentAddress").fill(permanentAddress);

  await page.getByRole("button", { name: "Submit" }).click();
});

test("Verify form submission using JS code", async ({ page }) => {
  let randomchars = (Math.random() + 1).toString(36).substring(7);
  let FullName = "Koushal " + randomchars;
  let Email = "testemail" + randomchars + "@gmail.com";
  let CurrentAddress = "No. " + randomchars + " Main Road, Tumkur";
  let PermanentAddress = "No. " + randomchars + " 1st Cross, Bangalore";

  await page.goto("https://demoqa.com/");
  await page.getByRole("link", { name: "Elements" }).click();
  await page.getByRole("link", { name: "Text Box" }).click();

  await page.getByRole("textbox", { name: "Full Name" }).fill(FullName);
  await page.getByRole("textbox", { name: "name@example.com" }).fill(Email);
  await page
    .getByRole("textbox", { name: "Current Address" })
    .fill(CurrentAddress);
  await page.locator("#permanentAddress").fill(PermanentAddress);

  await page.getByRole("button", { name: "Submit" }).click();
});

test("Verify form submission using .env file", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await page.getByRole("link", { name: "Elements" }).click();
  await page.getByRole("link", { name: "Text Box" }).click();

  await page
    .getByRole("textbox", { name: "Full Name" })
    .fill(process.env.APP_FULLNAME);
  await page
    .getByRole("textbox", { name: "name@example.com" })
    .fill(process.env.APP_EMAIL);
  await page
    .getByRole("textbox", { name: "Current Address" })
    .fill(process.env.APP_CURRENTADDRESS);
  await page
    .locator("#permanentAddress")
    .fill(process.env.APP_PERMANENTADDRESS);

  await page.getByRole("button", { name: "Submit" }).click();
});
