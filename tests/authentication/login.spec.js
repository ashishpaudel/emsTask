// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { loginData } from '../../POM/variable.js';

test.describe('Login Functionality - Essential Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // Valid Login Tests
    test.describe('Valid Login', () => {
        test('Admin login with valid credentials', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.login(loginData.admin_email, loginData.admin_password);
            await loginPage.verifyLogin();
        });

        test('Employee login with valid credentials', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.login(loginData.emp_email, loginData.emp_password);
            await loginPage.verifyLogin();
        });
    });

    // Invalid Login Tests
    test.describe('Invalid Login', () => {
        test('Login with invalid email format', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.login(loginData.invalid_email, loginData.admin_password);
            await expect(page.getByText('These credentials do not match our records')).toBeVisible();
            await expect(page).toHaveTitle('Login - EMS');
        });

        test('Login with invalid password', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.login(loginData.admin_email, loginData.invalid_password);
            await expect(page.getByText('These credentials do not match our records')).toBeVisible();
            await expect(page).toHaveTitle('Login - EMS');
        });
    });

    // Empty Fields Tests
    test.describe('Login with empty fields', () => {
        test('Login with empty email', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.login('', loginData.admin_password);
            await expect(page.locator('[type="email"]')).toHaveCSS('border-color', 'rgb(37, 99, 235)');
            await expect(page).toHaveTitle('Login - EMS');
        });

        test('Login with empty password', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.login(loginData.admin_email, '');
            await expect(page.locator('[type="password"]')).toHaveCSS('border-color', 'rgb(37, 99, 235)');
            await expect(page).toHaveTitle('Login - EMS');
        });

        test('Login with empty email and password', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.login('', '');
            await expect(page.locator('[type="email"]')).toHaveCSS('border-color', 'rgb(37, 99, 235)');
            await expect(page.locator('[type="password"]')).toHaveCSS('border-color', 'rgb(113, 113, 122)');
            await expect(page).toHaveTitle('Login - EMS');
        });
    });
});
