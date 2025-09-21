import { expect } from '@playwright/test';
export class LoginPage{
    constructor(page){
        this.page=page;
        this.emailField=page.locator('[type="email"]');
        this.passwordField=page.locator('[type ="password"]');
        this.submitButton = this.page.getByRole('button', { name: 'Sign in' });
    }
    async goto(){
        await this.page.goto('https://ems.inggroup.com.np/admin/login');

    }  

    async verifyTitle() {
        await expect(this.page).toHaveTitle('Login - EMS');
    }
    async login(email,password){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }
    async verifyLogin(){
        await expect(this.page).toHaveTitle('Dashboard - EMS');
    } 
    async expectClr(clr){

         await expect(this.emailField).toHaveCSS('border-color',  clr)}  

}