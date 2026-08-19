 # OrangeHRM Playwright Automation

This project contains end-to-end tests for the public [OrangeHRM demo application](https://opensource-demo.orangehrmlive.com/). The tests are written with [Playwright Test](https://playwright.dev/docs/intro) and use role-based, CSS, and text locators to validate common HR application workflows.

## Test Coverage

The current suite includes the following scenarios:

### Login

- Login with valid credentials and verify that the Dashboard is displayed.
- Login with a valid username and an invalid password and verify the `Invalid credentials` message.
- Submit the login form without entering credentials and verify that both fields display validation errors.

### PIM: Add Employee

- Log in to OrangeHRM.
- Open the PIM module.
- Open the Add Employee form.
- Generate a first name, middle name, last name, and six-digit employee ID with `@faker-js/faker`.
- Submit the employee form.

### Buzz

- Log in and open the Buzz module.
- Create a Buzz post using text from the test data file.
- Verify that the new post is visible in the newsfeed.
- Add a comment to a Buzz post using text from the test data file.

## Technology Stack

- Node.js
- JavaScript
- Playwright Test `1.62.1` or compatible version
- Faker `10.6.0` or compatible version for generated employee data
- Chromium, Firefox, and WebKit browser projects

## Project Structure

```text
practice/
├── index.js
├── package.json
├── playwright.config.js
├── test data/
│   └── static.json
└── tests/
	├── Buzz/
	│   └── buzz.spec.js
	├── Login/
	│   └── login.spec.js
	└── PIM/
		└── addEmployee.spec.js
```

### Important Files

- `playwright.config.js`: Defines the test directory, browser projects, retries, workers, reporter, and diagnostic artifacts.
- `tests/Login/login.spec.js`: Contains login validation scenarios.
- `tests/PIM/addEmployee.spec.js`: Creates an employee with generated data.
- `tests/Buzz/buzz.spec.js`: Creates and comments on Buzz posts.
- `test data/static.json`: Stores reusable login and Buzz test data.
- `index.js`: A small Faker example that generates and logs a first name and last name.

## Prerequisites

Install the following before running the tests:

- Node.js 18 or later
- npm
- Internet access to reach the OrangeHRM demo website

Check your installed versions:

```bash
node --version
npm --version
```

## Installation

Clone or download this project, then open a terminal in the project directory.

Install the Node.js dependencies:

```bash
npm install
```

Install the Playwright browsers and their required operating-system dependencies where supported:

```bash
npx playwright install
```

On Linux, you may also need:

```bash
npx playwright install --with-deps
```

## Running the Tests

Run the complete test suite in all configured browser projects:

```bash
npx playwright test
```

Run the suite in Chromium only:

```bash
npx playwright test --project=chromium
```

Run the suite in Firefox only:

```bash
npx playwright test --project=firefox
```

Run the suite in WebKit only:

```bash
npx playwright test --project=webkit
```

Run one test file:

```bash
npx playwright test tests/Login/login.spec.js
```

Run a particular test by title:

```bash
npx playwright test -g "login with valid credentials"
```

Run tests with the visible browser window:

```bash
npx playwright test --headed
```

Run tests in Playwright UI mode for interactive debugging:

```bash
npx playwright test --ui
```

## Reports and Debugging Artifacts

The Playwright configuration uses the HTML reporter. After a test run, open the report with:

```bash
npx playwright show-report
```

The configuration also collects the following artifacts:

- **Trace:** Captures browser actions and page state for debugging.
- **Video:** Records the test execution.
- **Screenshot:** Captures screenshots during test execution.

These artifacts are especially useful when a test fails in a browser or environment that is difficult to reproduce locally. Playwright stores test results and report data in generated output directories. They should generally not be committed to source control.

For a failed test, you can run the specific file with a trace-friendly interactive session:

```bash
npx playwright test tests/Buzz/buzz.spec.js --project=chromium --headed --debug
```

## Test Data

Shared values are read from `test data/static.json`. The file currently provides the login credentials and text used by the Buzz tests.

Keep test data valid for the OrangeHRM demo environment. The demo application is publicly hosted and may change, become unavailable, or reset its data without notice. Do not add real personal information, production credentials, or other secrets to this repository.

## Configuration Details

The current Playwright configuration:

- Uses `tests` as the test directory.
- Runs test files fully in parallel when possible.
- Uses up to four workers locally.
- Uses one worker and two retries when the `CI` environment variable is set.
- Prevents accidental `test.only` usage in CI.
- Runs against Desktop Chrome, Desktop Firefox, and Desktop Safari/WebKit.
- Enables traces, videos, and screenshots.
- Generates an HTML report.

The mobile projects and local `webServer` configuration are present as commented examples in `playwright.config.js` and can be enabled when needed.

## Useful Playwright Commands

Show all available Playwright CLI options:

```bash
npx playwright test --help
```

List the tests without running them:

```bash
npx playwright test --list
```

Use a specific number of workers:

```bash
npx playwright test --workers=1
```

Open a saved trace:

```bash
npx playwright show-trace path/to/trace.zip
```

## Recommendations for Future Improvements

The suite can be made more maintainable by:

1. Moving the OrangeHRM base URL into `playwright.config.js` or an environment variable.
2. Moving credentials out of source-controlled JSON and into environment-specific configuration.
3. Creating reusable login and page-object helpers.
4. Adding explicit post-save assertions to the Add Employee test.
5. Giving the Add Employee test a descriptive title instead of the current generic `test` title.
6. Adding npm scripts such as `test`, `test:headed`, and `report` for shorter commands.
7. Isolating or cleaning up created demo data when tests are rerun.

## Troubleshooting

### Browsers are not installed

Run:

```bash
npx playwright install
```

### Tests cannot reach the application

Confirm that you have internet access and open the OrangeHRM demo URL in a browser. Because this is a public demo site, temporary downtime or application changes can cause failures unrelated to the test code.

### A test fails after the application UI changes

Review the locator used by the failing test and update it to match the current accessible role, label, or page text. Then rerun only the affected file before running the complete suite.

### A test passes locally but fails in CI

Run the failing test with one worker and inspect the HTML report, video, screenshot, and trace. The CI configuration already enables retries and serial worker execution when `CI` is set.

## License

This project currently uses the license value defined in `package.json` (`ISC`).
