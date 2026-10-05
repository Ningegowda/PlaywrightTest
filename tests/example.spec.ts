import { test, expect } from '@playwright/test';
import { request } from 'https';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading related to installation/getting started.
  await expect(page.getByRole('heading', { name: /Installation|Get started|Getting started|Introduction|Quickstart/i })).toBeVisible();
});
test('should login successfully with valid credentials', async ({ request }) => {
  const response = await request.get('https://www.saucedemo.com');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responsebody = await response.json();
  expect(responsebody).toBeDefined();
  expect(responsebody).toHaveProperty('username');
 expect(responsebody.username).toBe('standard_user');
  expect(responsebody).toHaveProperty('password');
  expect(responsebody.password).toBe('secret_sauce'); 
});

test('should return 404 for invalid endpoint', async ({ page }) => {
  await page.route('**/invalid-endpoint', async (route) => {
    await route.fulfill({
      status: 404,
      contentType: 'application/json',
      json: { error: 'Not found' },
    });
  });

  const response = await page.goto('https://example.com/invalid-endpoint');

  expect(response?.status()).toBe(404);
});
