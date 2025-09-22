// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/login.js';
import { DashboardPage } from '../POM/dashboard.js';
import { loginData } from '../POM/variable.js';

test.describe('Navbar Items Validation', () => {
  let loginPage, dashboard;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await loginPage.goto();
  });

  test('Admin should access Navbar Items after login', async ({ page }) => {
    await loginPage.login(loginData.admin_email, loginData.admin_password);
    await loginPage.verifyLogin();

    await dashboard.verifyNavAccess();
  });

  test('Employee should access employee and common features only', async ({ page }) => {
    await loginPage.login(loginData.emp_email, loginData.emp_password);
    await loginPage.verifyLogin();

    await dashboard.verifyNavAccess();
  });
});

test.describe('Sign Out Button Validation', () => {
  let loginPage, dashboard;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await loginPage.goto();
  });

  test('Admin should sign out FROM their Dashboard', async ({ page }) => {
    await loginPage.login(loginData.admin_email, loginData.admin_password);
    await loginPage.verifyLogin();

    await dashboard.verifySignOut();
    await dashboard.clickSignOut();
    //expect sign in page
    await loginPage.verifyTitle();
  });

  test('Employee should sign out FROM their Dashboard', async ({ page }) => {
    await loginPage.login(loginData.emp_email, loginData.emp_password);
    await loginPage.verifyLogin();
    await dashboard.verifySignOut();
    await dashboard.clickSignOut();
    //expect sign in page
    await loginPage.verifyTitle();
  });
});

test.describe('Dashboard Data Accuracy Verification', () => {
  let loginPage, dashboard;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await loginPage.goto();
  });

  test('any valid users can access dashboard complete dashboard data', async ({ page }) => {
    await loginPage.login(loginData.admin_email, loginData.admin_password);
    await loginPage.verifyLogin();
    await dashboard.verifyUserCard();
    await dashboard.verifyDepartmentCard();
    await dashboard.verifyProjectCard();
    await dashboard.verifyTotalUpdatesCard();
    await dashboard.verifyTodayUpdatesCard();
   
  });

  test.describe('Dashboard table data verification', () => {
    let loginPage, dashboard;
  
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      dashboard = new DashboardPage(page);
      await loginPage.goto();
    });
  
    test('any valid users can access table data', async ({ page }) => {
      await loginPage.login(loginData.admin_email, loginData.admin_password);
      await loginPage.verifyLogin();
      await dashboard.verifyTableData();
    })
     
    });
});
