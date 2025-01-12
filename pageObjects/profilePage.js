class ProfilePage {
    constructor(page) {
        this.page = page;
        this.userMenuButton = 'button[aria-label="Open user navigation menu"]';
        this.yourRepositoriesSpan = 'span';
      }
    
      async openUserMenu() {
        await this.page.waitForSelector(this.userMenuButton, { visible: true });
        await this.page.click(this.userMenuButton);
      }
    
      async navigateToRepositories() {
        await this.page.evaluate(() => {
          const element = Array.from(document.querySelectorAll('span')).find(
            el => el.textContent.trim() === 'Your repositories'
          );
          if (element) {
            element.click();
          } else {
            throw new Error('Elemento com texto "Your repositories" não encontrado.');
          }
        });
        await this.page.waitForNavigation();
      }
      async navigateToProfileCheckName(name) {
        await this.page.evaluate(() => {
          const element = Array.from(document.querySelectorAll('span')).find(
            el => el.textContent.trim() === 'Your profile'
          );
          if (element) {
            element.click();
          } else {
            throw new Error('Elemento com texto "Your repositories" não encontrado.');
          }
        });
        await this.page.waitForNavigation();
        // Esperar pelo elemento na página
        const elementHandle = await this.page.waitForSelector('span.p-nickname.vcard-username.d-block[itemprop="additionalName"]', { visible: true });

        // Extrair o texto do elemento
        const elementText = await this.page.evaluate(element => element.textContent.trim(), elementHandle);

        // Validar o valor do elemento com Jest
        expect(elementText).toBe(name);
      }
      async logout() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
        await this.page.evaluate(() => {
            const element = Array.from(document.querySelectorAll('span')).find(
              el => el.textContent.trim() === 'Sign out'
            );
            if (element) {
              element.click();
            } else {
              throw new Error('Elemento com texto "Sign out" não encontrado.');
            }
          });
          await this.page.waitForNavigation();

        await this.page.url().includes('/logout');

        console.log('Logout bem-sucedido');
    }
  }
  
  module.exports = ProfilePage;
  