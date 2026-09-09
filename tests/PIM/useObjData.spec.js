import { test, expect } from "@playwright/test";
import { fakerEN_IN as faker } from "@faker-js/faker";

const obj = {
  employee1: {
    firstname: faker.person.firstName(),
    middlename: faker.person.middleName(),
    lastname: faker.person.lastName(),
    empid: faker.string.numeric(6),
  },
  employee2: {
    firstname: faker.person.firstName(),
    middlename: faker.person.middleName(),
    lastname: faker.person.lastName(),
    empid: faker.string.numeric(6),
  },
  employee3: {
    firstname: faker.person.firstName(),
    middlename: faker.person.middleName(),
    lastname: faker.person.lastName(),
    empid: faker.string.numeric(6),
  },
  employee4: {
    firstname: faker.person.firstName(),
    middlename: faker.person.middleName(),
    lastname: faker.person.lastName(),
    empid: faker.string.numeric(6),
  },
  employee5: {
    firstname: faker.person.firstName(),
    middlename: faker.person.middleName(),
    lastname: faker.person.lastName(),
    empid: faker.string.numeric(6),
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
