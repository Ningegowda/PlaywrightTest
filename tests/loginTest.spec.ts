import {expect, test} from '@playwright/test'
import { LoginPage } from '../Pages/LoginPage'
import loginData from '../TestData/loginTestData.json'

test('valid login test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage('/');
    await loginPage.login(
        loginData.valid_user.username,
        loginData.valid_user.password
    );

    await expect(page).toHaveURL('/inventory.html');
});

test('invalid login test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage('/');
    // await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.login(
        loginData.invalid_user.username,
        loginData.invalid_user.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    page.on('request', request => {
        console.log(`Request: ${request.method()} ${request.url()}`);
    });
});
