// @ts-check
import { test } from '@playwright/test';
import { LoginPage } from '../POM/login.js';
import { DashboardPage } from '../POM/dashboard.js';
import { loginData } from '../POM/variable.js';

test.describe('Role-based Access Validation', () => {
  let loginPage, dashboard;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await loginPage.goto();
  });

  test('Admin should access admin and common features', async ({ page }) => {
    await loginPage.login(loginData.admin_email, loginData.admin_password);
    await loginPage.verifyLogin();

    await dashboard.verifyCommonAccess();
    await dashboard.verifyAdminAccess();
  });

  test('Employee should access employee and common features only', async ({ page }) => {
    await loginPage.login(loginData.emp_email, loginData.emp_password);
    await loginPage.verifyLogin();

    await dashboard.verifyCommonAccess();
    await dashboard.verifyEmployeeAccess();
    await dashboard.verifyNoAdminAccess();
  });
});