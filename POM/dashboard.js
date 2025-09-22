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
        this.signOutBtn = page.getByRole('button', { name: 'Sign Out' });

        // Dashboard summary cards and data elements
        const statBox = page.locator('.fi-wi-stats-overview-stat');
        
        // User card
        this.userCard = page.locator('.fi-layout div').filter({ hasText: 'User' }).first();
        //department card
        this.departmentCard = page.locator('.fi-layout .grid div').filter({ hasText: 'Department' }).first();
        //project card
        this.projectCard = page.locator('.fi-layout .grid div').filter({ hasText: 'Project' }).first();
        //total updates card
        this.totalUpdatesCard = page.locator('.fi-layout .grid div').filter({ hasText: 'Update' }).first();
        //today updates card
        this.todayUpdatesCard = page.locator('.fi-layout .grid div').filter({ hasText: 'Update' }).first();
        
       
        this.tableData = page.locator('.fi-layout .grid div').filter({ hasText: 'table' }).first();



        

        // // this.usersCard = statBox.filter({ hasText: '' });
        // this.departmentsCard = statBox.filter({ hasText: 'Department' });
        // this.projectsCard = statBox.filter({ hasText: 'Project' });
        // this.totalUpdatesCard = statBox.filter({ hasText: 'Total Update' });
        // this.todayUpdatesCard = statBox.filter({ hasText: 'Today Update' });


        
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

    async verifySignOut() {
        await expect(this.signOutBtn).toBeVisible();
    }

    async clickSignOut() {
        await this.signOutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }


    async verifyUserCard() {
        await expect(this.userCard).toBeVisible();
        // Check if card contains User-related text (more flexible)
        await expect(this.userCard).toContainText('User');
        await expect(this.userCard).toContainText(/\d+/); // Any number
        await expect(this.userCard).toContainText(/Total User|Users?/i); // Case insensitive, optional plural
    }
    
    async verifyDepartmentCard() {
        await expect(this.departmentCard).toBeVisible();
        await expect(this.departmentCard).toContainText(/Departments?/i);
        await expect(this.departmentCard).toContainText(/\d+/);
        await expect(this.departmentCard).toContainText(/Total Departments?/i);
    }
    
    async verifyProjectCard() {
        await expect(this.projectCard).toBeVisible();
        await expect(this.projectCard).toContainText(/Project/i);
        await expect(this.projectCard).toContainText(/\d+/);
        await expect(this.projectCard).toContainText(/Total Projects?/i);
    }
    
    async verifyTotalUpdatesCard() {
        await expect(this.totalUpdatesCard).toBeVisible();
        await expect(this.totalUpdatesCard).toContainText(/Total Update/i);
        await expect(this.totalUpdatesCard).toContainText(/\d+/);
        await expect(this.totalUpdatesCard).toContainText(/Total Update/i);
    }
    
    async verifyTodayUpdatesCard() {
        await expect(this.todayUpdatesCard).toBeVisible();
        await expect(this.todayUpdatesCard).toContainText(/Today Update|Update/i);
        await expect(this.todayUpdatesCard).toContainText(/\d+/);
        await expect(this.todayUpdatesCard).toContainText(/Today Updates?/i);
    }

    async verifyTableData() {
        await expect(this.tableData).toBeVisible();
        await expect(this.tableData).toContainText('User Table');
        await expect(this.tableData).toContainText('Name');
        await expect(this.tableData).toContainText('Email');
        await expect(this.tableData).toContainText('Contact');
        await expect(this.tableData).toContainText('Department');
        await expect(this.tableData).toContainText('Designation');
       
    }
}

