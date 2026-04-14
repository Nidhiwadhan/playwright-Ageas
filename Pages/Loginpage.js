export class LoginPage {
  constructor(page) {
    this.page = page;

    this.username = '#user-name';
    this.password = '#password';
    this.loginBtn = '#login-button';
    this.error = '[data-test="error"]';
  }

  async open() {
    await this.page.goto('/');
  }

  async login(user, pass) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginBtn);
  }

  async getError() {
    return this.page.locator(this.error);
  }
}