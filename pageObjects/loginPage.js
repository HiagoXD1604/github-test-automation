class LoginPage {
    constructor(page) {
      this.page = page;
      this.loginField = '#login_field';
      this.passwordField = '#password';
      this.submitButton = 'input[type="submit"]';
    }
  
    async login(email, password) {
      await this.page.goto('https://github.com/login');
      await this.page.type(this.loginField, email);
      await this.page.type(this.passwordField, password);
      await this.page.click(this.submitButton);
      await this.page.waitForNavigation();
      await this.page.url('https://github.com')
    }
  }
  
  module.exports = LoginPage;
  