Overview

This project provides an end-to-end automation framework using:
Playwright (JavaScript) → Modern UI automation 
The framework is designed for scalability, reliability, and CI integration, with strong reporting and failure diagnostics.

Setup & Run Instructions

Prerequisites

•	Node.js 

•	Git 

Install dependencies

Playwright

npm install
npx playwright install

Run tests locally

Playwright (all tests)

npx playwright test


Playwright HTML report

npx playwright show-report

CI Pipeline (GitHub Actions)

name: Automation Tests

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      # Node setup for Playwright
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Playwright deps
        run: |
          npm ci
          npx playwright install --with-deps

      # Run Playwright smoke tests
      - name: Run Playwright Smoke Tests
        run: npx playwright test --grep @smoke

      # Upload Playwright report
      - name: Upload Playwright Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

Design Decisions Architecture

/playwright

  /tests
  
  /pages
  
  /utils
  

 Patterns Used
 
Page Object Model (POM)

•	Encapsulates locators and actions 

•	Promotes reusability and maintainability 


Decision	Trade-off

POM	More structure vs initial setup effort

Playwright + Selenium	Flexibility vs maintenance overhead


Reliability Approach

await Strategy

•	Use Playwright auto-waiting 

•	Avoid static waits (sleep) 

•	Explicit waits where needed: 

await expect(locator).toBeVisible();

 
Locator Strategy

Priority:

1.	getByRole()
2.	getByTestId()
3.	getByText() / getByLabel() 
4.	CSS selectors 
 
Flake Control

•	Retry failed tests: 

retries: 1

How to Add New Tests
/ Features

Add Playwright test

/tests/new-feature.spec.js

test('example', async ({ page }) => {

  // test logic
  
});

 
Add new Page Object

/pages/NewPage.js

export class NewPage {

  constructor(page) {
    this.page = page;
  }
}
 
Extend functionality

•	Add new locators 

•	Add reusable methods 

•	Keep test logic separate from page logic 

 
Evidence Artifacts

Automatically captured on failure:

•	Screenshots 

•	Videos 

•	Traces 

Config example:

use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure'
}

Selenium

Captured via framework setup:

Screenshots on failure 


Reports

Playwright

•	HTML report → /playwright-report 

•	Trace viewer: 

npx playwright show-trace trace.zip
 



