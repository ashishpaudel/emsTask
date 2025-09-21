import { expect } from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.page = page;

        this.dashboardBtn = page.getByRole('button', { name: 'Dashboard' });
        this.orgChartBtn = this.page.getByRole('button', { name: 'Organization Chart' });
        this.profileBtn = page.getByRole('button', { name: 'Profile' });
        this.departmentsBtn = page.getByRole('button', { name: 'Departments' });
        this.projectsBtn = page.getByRole('button', { name: 'Projects' });
        this.requestsBtn = page.getByRole('button', { name: 'Requests' });
        this.updatesBtn = page.getByRole('button', { name: 'Updates' });
        this.usersBtn = page.getByRole('button', { name: 'Users' });
    }

    async verifyCommonAccess() {
        await expect(this.dashboardBtn).toBeVisible();
        await expect(this.orgChartBtn).toBeVisible();
        await expect(this.profileBtn).toBeVisible();
        await expect(this.requestsBtn).toBeVisible();
        await expect(this.updatesBtn).toBeVisible();
        await expect(this.usersBtn).toBeVisible();
    }

    async verifyAdminAccess() {
        await expect(this.projectsBtn).toBeVisible();
        await expect(this.departmentsBtn).toBeVisible();
    }

    async verifyEmployeeAccess() {
        await expect(this.requestsBtn).toBeVisible();
        await expect(this.updatesBtn).toBeVisible();
    }

    async verifyNoAdminAccess() {
        await expect(this.projectsBtn).not.toBeVisible();
        await expect(this.departmentsBtn).not.toBeVisible();
    }
}

