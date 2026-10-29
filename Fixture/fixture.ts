import { test as base } from '@playwright/test';
import { expect, type Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/inventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import loginData from '../TestData/loginTestData.json';

type AuthenticatedSession = {
  page: Page;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedSession: AuthenticatedSession;
  loggedInSession: InventoryPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  authenticatedSession: async ({ browser }, use, testInfo) => {
    const baseURL = testInfo.project.use.baseURL;
    if (typeof baseURL !== 'string') {
      throw new Error('A baseURL must be configured to create an authenticated session.');
    }

    const storageStatePath = testInfo.outputPath('saucedemo-auth.json');
    const setupContext = await browser.newContext();
    try {
      const setupPage = await setupContext.newPage();
      const loginPage = new LoginPage(setupPage);
      await loginPage.gotoLoginPage(baseURL);
      await loginPage.login(loginData.valid_user.username, loginData.valid_user.password);
      await expect(setupPage).toHaveURL(/inventory.html/);
      await setupContext.storageState({ path: storageStatePath });
    } finally {
      await setupContext.close();
    }

    const context = await browser.newContext({ storageState: storageStatePath });
    try {
      const page = await context.newPage();
      await page.goto(new URL('/inventory.html', baseURL).toString());
      await expect(page).toHaveURL(/inventory.html/);
      await use({
        page,
        inventoryPage: new InventoryPage(page),
        cartPage: new CartPage(page),
        checkoutPage: new CheckoutPage(page),
      });
    } finally {
      await context.close();
    }
  },
  loggedInSession: async ({ authenticatedSession }, use) => {
    await use(authenticatedSession.inventoryPage);
  },
});