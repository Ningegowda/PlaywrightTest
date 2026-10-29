import { expect } from '@playwright/test';
import { test } from '../Fixture/fixture';
import loginData from '../TestData/loginTestData.json';
import checkoutData from '../TestData/checkoutTestData.json';

test.describe('SauceDemo checkout', () => {
  test('complete a purchase @smoke', async ({ authenticatedSession }) => {
    const { inventoryPage, cartPage, checkoutPage } = authenticatedSession;
    await expect(authenticatedSession.page).toHaveURL(/inventory.html/);
    await test.step('Add the Backpack and verify the cart', async () => {
      await inventoryPage.addBackpackToCart();
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await inventoryPage.openCart();
      await expect(cartPage.page).toHaveURL(/cart.html/);
      await expect(cartPage.backpackName).toHaveText('Sauce Labs Backpack');
    });

    await test.step('Enter checkout information and verify the order', async () => {
      await cartPage.proceedToCheckout();
      await expect(checkoutPage.page).toHaveURL(/checkout-step-one.html/);
      await checkoutPage.fillCustomerInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
      );
      await checkoutPage.continueToOverview();
      await expect(checkoutPage.page).toHaveURL(/checkout-step-two.html/);
      await expect(checkoutPage.backpackName).toHaveText('Sauce Labs Backpack');
    });

    await test.step('Complete the purchase', async () => {
      await checkoutPage.finishOrder();
      await expect(checkoutPage.page).toHaveURL(/checkout-complete.html/);
      await expect(checkoutPage.confirmationHeading).toBeVisible();
    });
  });
});

test.describe('SauceDemo checkout validation', () => {
  test.beforeEach(async ({ authenticatedSession }) => {
    await test.step('Navigate to checkout information', async () => {
      await authenticatedSession.inventoryPage.addBackpackToCart();
      await authenticatedSession.inventoryPage.openCart();
      await authenticatedSession.cartPage.proceedToCheckout();
    });
  });

  test('accepts one-character checkout values @boundary', async ({ authenticatedSession }) => {
    const { checkoutPage } = authenticatedSession;
    await checkoutPage.fillCustomerInformation(
      'A',
      'B',
      '1'
    );
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.page).toHaveURL(/checkout-step-two.html/);
  });

  test('requires a first name @negative', async ({ authenticatedSession }) => {
    const { checkoutPage } = authenticatedSession;
    await checkoutPage.lastName.fill(checkoutData.lastName);
    await checkoutPage.postalCode.fill(checkoutData.postalCode);
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('requires a last name @negative', async ({ authenticatedSession }) => {
    const { checkoutPage } = authenticatedSession;
    await checkoutPage.firstName.fill(checkoutData.firstName);
    await checkoutPage.postalCode.fill(checkoutData.postalCode);
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
  });

  test('requires a postal code @negative', async ({ authenticatedSession }) => {
    const { checkoutPage } = authenticatedSession;
    await checkoutPage.firstName.fill(checkoutData.firstName);
    await checkoutPage.lastName.fill(checkoutData.lastName);
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
  });
});

test.describe('SauceDemo authentication', () => {
  test('rejects a locked-out user @negative', async ({ loginPage }) => {
    await loginPage.gotoLoginPage('/');
    await loginPage.login(loginData.invalid_user.username, loginData.invalid_user.password);

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
