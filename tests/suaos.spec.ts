import { test, expect } from '../Fixture/fixture';

    const baseURL = 'https://www.saucedemo.com';

    test.skip(!baseURL, 'Set SUAOS_BASE_URL environment variable to run SUAOS demo test');
    test('Should successfully log in with valid credentials', async ({ loginPage, inventoryPage }) => {
  await loginPage.gotoLoginPage(baseURL);
      await loginPage.login('standard_user', 'secret_sauce');
  await expect(inventoryPage.page).toHaveURL(/inventory.html/);
});

test('Should load directly into dashboard when using authenticated session', async ({ loggedInSession }) => {
  
  // The page is already logged in and ready to go!
  await expect(loggedInSession.page).toHaveURL(/inventory.html/);
  await expect(loggedInSession.inventoryContainer).toHaveText('Sauce Labs Backpack');
});
test('login test', async({loginPage,inventoryPage})=>{
  await loginPage.gotoLoginPage(baseURL);
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(inventoryPage.page).toHaveURL(/inventory.html/);
})

