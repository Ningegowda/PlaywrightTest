import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly backpackName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackName = page.getByText('Sauce Labs Backpack', { exact: true });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}