import {test, expect,Page,Locator} from '@playwright/test';

    export class InventoryPage {
      readonly page: Page;
      readonly inventoryContainer: Locator;

      constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = this.page.getByText('Sauce Labs Backpack');
      }
    }