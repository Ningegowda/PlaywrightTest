import { test as base } from '@playwright/test';
import { expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/inventoryPage';

// 1. Define TypeScript types for your fixtures
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loggedInSession: InventoryPage; // This fixture will represent a logged-in session
};

// 2. Extend the base test object
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Everything before use() is the SETUP phase
    const loginPage = new LoginPage(page);
    await use(loginPage);
   
},
 inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
    loggedInSession: async ({ page, loginPage,inventoryPage }, use) => {
    // Navigate and perform login as part of setup
    await page.goto(process.env.SUAOS_BASE_URL ?? 'https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Pass the prepared resource to the test
    await use(inventoryPage);
    await expect(inventoryPage.page).toHaveURL(/inventory.html/);
    }
});