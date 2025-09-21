// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { loginData, rememberMeData } from '../../POM/variable.js';

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

        test('Admin login with Remember Me enabled', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.verifyRememberMeCheckbox();
            await loginPage.login(loginData.admin_email, loginData.admin_password, rememberMeData.remember_me_enabled);
            await loginPage.verifyLogin();
        });

        test('Employee login with Remember Me enabled', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.verifyRememberMeCheckbox();
            await loginPage.login(loginData.emp_email, loginData.emp_password, rememberMeData.remember_me_enabled);
            await loginPage.verifyLogin();
        });
    });

    // Remember Me Functionality Tests
    test.describe('Remember Me Functionality', () => {
        test('Remember Me checkbox is visible and clickable', async ({ page }) => {
            await loginPage.verifyTitle();
            await loginPage.verifyRememberMeCheckbox();

            // Test checking the checkbox
            await loginPage.checkRememberMe();
            expect(await loginPage.isRememberMeChecked()).toBeTruthy();

            // Test unchecking the checkbox
            await loginPage.uncheckRememberMe();
            expect(await loginPage.isRememberMeChecked()).toBeFalsy();
        });

        test('Login with Remember Me checked persists session', async ({ page, context }) => {
            await loginPage.verifyTitle();
            await loginPage.login(loginData.admin_email, loginData.admin_password, true);
            await loginPage.verifyLogin();

            // Close current page and open new one to test session persistence
            await page.close();
            const newPage = await context.newPage();
            const newLoginPage = new LoginPage(newPage);

            // Navigate to dashboard - should be logged in if Remember Me worked
            await newPage.goto('https://ems.inggroup.com.np/admin');

            // Verify we're still logged in (not redirected to login page)
            await expect(newPage).toHaveTitle('Dashboard - EMS');
        });

        test('Login without Remember Me does not persist session', async ({ page, context }) => {
            await loginPage.verifyTitle();
            await loginPage.login(loginData.admin_email, loginData.admin_password, false);
            await loginPage.verifyLogin();

            // Close current page and open new one
            await page.close();
            const newPage = await context.newPage();

            // Navigate to dashboard - should be redirected to login if Remember Me is off
            await newPage.goto('https://ems.inggroup.com.np/admin');

            // Verify we're redirected to login page
            await expect(newPage).toHaveTitle('Login - EMS');
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