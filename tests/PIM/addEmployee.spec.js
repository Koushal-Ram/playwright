import { test, expect } from "@playwright/test";
import { fakerEN_IN as faker } from "@faker-js/faker";

const firstName = faker.person.firstName();
const middleName = faker.person.middleName();
const lastName = faker.person.lastName();
const empId = faker.string.numeric(6);

const obj = {
  employee1: {
    firstname: firstName,
    middlename: middleName,
    lastname: lastName,
    empid: empId,
  },
  employee2: {
    firstname: firstName,
    middlename: middleName,
    lastname: lastName,
    empid: empId,
  },
  employee3: {
    firstname: firstName,
    middlename: middleName,
    lastname: lastName,
    empid: empId,
  },
  employee4: {
    firstname: firstName,
    middlename: middleName,
    lastname: lastName,
    empid: empId,
  },
  employee5: {
    firstname: firstName,
    middlename: middleName,
    lastname: lastName,
    empid: empId,
  },
};

for (const loop in obj) {
  test(`Create ${loop}`, async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    await page.getByRole("textbox", { name: "Username" }).fill("Admin");

    await page.getByRole("textbox", { name: "Password" }).click();

    await page.getByRole("textbox", { name: "Password" }).fill("admin123");

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

    await page
      .getByRole("textbox", { name: "First Name" })
      .fill(obj[loop].firstname);

    await page.getByRole("textbox", { name: "Middle Name" }).click();

    await page
      .getByRole("textbox", { name: "Middle Name" })
      .fill(obj[loop].middlename);

    await page.getByRole("textbox", { name: "Last Name" }).click();

    await page
      .getByRole("textbox", { name: "Last Name" })
      .fill(obj[loop].lastname);

    await page.getByRole("textbox").nth(4).click();

    await page.getByRole("textbox").nth(4).fill(obj[loop].empid);

    await expect(page.getByRole("button", { name: "Save" })).toBeVisible();

    await page.getByRole("button", { name: "Save" }).click();
  });
}
