import { expect } from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.page = page;

        this.dashboardBtn = page.getByRole('link', { name: 'Dashboard' });
        this.orgChartBtn = this.page.getByRole('link', { name: 'Organization Chart' });
        this.profileBtn = page.getByRole('link', { name: 'Profile' });
        this.departmentsBtn = page.getByRole('link', { name: 'Departments' });
        this.projectsBtn = page.getByRole('link', { name: 'Projects' });
        this.requestsBtn = page.getByRole('link', { name: 'Requests' });
        this.updatesBtn = page.getByRole('link', { name: 'Updates' });
        this.usersBtn = page.getByRole('link', { name: 'Users' });
    }

    async verifyNavAccess() {
        await expect(this.dashboardBtn).toBeVisible();
        await expect(this.orgChartBtn).toBeVisible();
        await expect(this.profileBtn).toBeVisible();
        await expect(this.requestsBtn).toBeVisible();
        await expect(this.updatesBtn).toBeVisible();
        await expect(this.usersBtn).toBeVisible();
        await expect(this.departmentsBtn).toBeVisible();
        await expect(this.projectsBtn).toBeVisible();
    }
}

