import { test, expect } from "@playwright/test";
import credentials from "../../test data/static.json";
import { fakerEN_IN as faker } from "@faker-js/faker";

const username = process.env.APP_USERNAME || credentials.username;
const password = process.env.APP_PASSWORD || credentials.password;

test("Create multiple employees", async ({ page }) => {
  // Create 5 employees
  const employees = Array.from({ length: 5 }, () => ({
    firstname: faker.person.firstName(),
    middlename: faker.person.middleName(),
    lastname: faker.person.lastName(),
    empid: faker.string.numeric(6),
  }));

  for (const employee of employees) {
    // Login
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    await page.getByRole("textbox", { name: "Username" }).fill(username);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("**/dashboard/index");

    // Navigate to PIM
    await expect(page.getByRole("link", { name: "PIM" })).toBeVisible();
    await page.getByRole("link", { name: "PIM" }).click();

    // Click Add
    await expect(page.getByRole("button", { name: " Add" })).toBeVisible();

    await page.getByRole("button", { name: " Add" }).click();

    await expect(
      page.getByRole("heading", { name: "Add Employee" }),
    ).toBeVisible();

    // Fill employee details
    await page
      .getByRole("textbox", { name: "First Name" })
      .fill(employee.firstname);

    await page
      .getByRole("textbox", { name: "Middle Name" })
      .fill(employee.middlename);

    await page
      .getByRole("textbox", { name: "Last Name" })
      .fill(employee.lastname);

    // Employee ID
    await page.getByRole("textbox").nth(4).fill(employee.empid);

    // Save
    await expect(page.getByRole("button", { name: "Save" })).toBeVisible();

    await page.getByRole("button", { name: "Save" }).click();

    // Wait for employee details page to load
    await expect(
      page.getByRole("heading", { name: /Personal Details/i }),
    ).toBeVisible();

    console.log(
      `Created employee: ${employee.firstname} ${employee.middlename} ${employee.lastname} - ${employee.empid}`,
    );
  }
});
