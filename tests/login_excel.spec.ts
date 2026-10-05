import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage'
import { readExcelData } from '../utils/excelReader';

const testData = readExcelData('./TestData/LoginData.xlsx', 'Sheet1');

test.describe('Login Tests', () => {

    for (const data of testData) {

        // if (data.run !== 'yes') continue;

        test(`Login test for - ${data.username}`, async ({ page }) => {

            test.skip(data.run !== 'yes', 'Run Flag=NO');

            const loginPage = new LoginPage(page);
            await test.step('navigate to Login', async () => {
                await loginPage.gotoLoginPage('https://www.saucedemo.com');
                
                
            });

            await test.step('Perform Login', async () => {
                await loginPage.login(data.username, data.password);
            });

            await test.step('Validate Result', async () => {
                if (data.expected === 'success') {
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                } else {
                    await expect(loginPage.errorMessage).toBeVisible();
                }
            });
        });
    }
})