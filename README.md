# Playwright Test Automation

End-to-end browser tests written in TypeScript with Playwright Test. The suite primarily covers login and inventory flows on [SauceDemo](https://www.saucedemo.com); the example spec also checks Playwright's documentation site.

## Requirements

- Node.js (LTS recommended)
- npm

## Setup

```powershell
npm install
npx playwright install chromium
```

## Run Tests

Run the complete suite:

```powershell
npm test
```

Run a specific spec or filter tests by title:

```powershell
npx playwright test tests/loginTest.spec.ts
npx playwright test --grep "valid login"
```

Useful options:

```powershell
npx playwright test --headed
npx playwright test --ui
npx playwright show-report
```

The configured browser project is Chromium. Test results are written to `test-results/`, and the HTML report is written to `playwright-report/`.

## Project Layout

- `tests/` - Playwright specs for login, fixtures, Excel-driven login, and the Playwright documentation example.
- `Pages/` - Page objects for the login and inventory pages.
- `Fixture/fixture.ts` - Shared page-object and authenticated-session fixtures.
- `TestData/loginTestData.json` - JSON credentials used by the login tests.
- `utils/excelReader.ts` - Helper for loading test data from an Excel workbook.
- `playwright.config.ts` - Test discovery, SauceDemo base URL, Chromium project, and reporting settings.

## Excel-Driven Login Tests

`tests/login_excel.spec.ts` expects `TestData/LoginData.xlsx`, with a worksheet named `Sheet1` and columns `username`, `password`, `expected`, and `run`. The workbook is not currently included in this repository. Add the workbook before running that spec; rows with `run` set to `yes` are exercised, and other rows are skipped.

## Configuration

The configured `baseURL` is `https://www.saucedemo.com`. The authenticated-session fixture also reads the optional `SUAOS_BASE_URL` environment variable, falling back to SauceDemo when it is unset.

On the first retry, Playwright records a trace. Screenshots and videos are retained for failed tests.
