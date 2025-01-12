class RepositoriesPage {
    constructor(page) {
      this.buttonSelector = 'body > div.logged-in.env-production.page-responsive > div.application-main > main > react-app > div > form > div.Box-sc-g0xbh4-0.dlBivO > button';
      this.page = page;
      this.randomRepo = '.repo-list-item a';
      this.pullRequestsTab = 'a[href*="pulls"]';
      this.newRepositoryButton = '//a[contains(text(), "New")]'; // XPath
      this.repoListSelector = '#user-repositories-list > ul > li';
      this.repoNameInput = '[data-testid="repository-name-input"]';
      this.createRepoButtonSpan = 'span';
      this.createRepoButton = 'button[type="submit"][aria-describedby=":r1g:-loading-announcement"]';
    }
  
    async openRandomRepository() {
        await this.page.waitForSelector(this.repoListSelector, { visible: true });
        const repositoriesList = await this.page.$$(this.repoListSelector);
    
        if (repositoriesList.length === 0) throw new Error('Nenhum repositório encontrado.');
    
        const randomIndex = Math.floor(Math.random() * repositoriesList.length);
        await repositoriesList[randomIndex].click();
    }

    async openRepository(repositoryName) {
      await this.page.waitForSelector(this.repoListSelector, { visible: true });
      await this.page.evaluate((repositoryName) => {
        const element = Array.from(document.querySelectorAll('a')).find(
          el => el.textContent.trim() === `${repositoryName}`
        );
        if (element) {
          element.click();
        } else {
          throw new Error(`Elemento com texto ${repositoryName} não encontrado.`);
        }
      }, repositoryName);
      await this.page.waitForNavigation();
  }
  
    async navigateToPullRequests() {
        await this.page.evaluate(() => {
            const element = Array.from(document.querySelectorAll('span')).find(
              el => el.textContent.trim() === 'Pull requests'
            );
            if (element) {
              element.click();
            } else {
              throw new Error('Elemento com texto "Pull requests" não encontrado.');
            }
          });
          await this.page.waitForNavigation();
    }
  
    async createNewRepository(repoName) {
    await this.page.waitForSelector('#global-create-menu-anchor', { visible: true });
        // Clicar no botão "Criar algo novo"
    await this.page.click('#global-create-menu-anchor');

    await this.page.evaluate(() => {
        const element = Array.from(document.querySelectorAll('span')).find(
          el => el.textContent.trim() === 'New repository'
        );
        if (element) {
          element.click();
        } else {
          throw new Error('Elemento com texto "New repository" não encontrado.');
        }
      });
      await this.page.waitForNavigation();  
          await this.page.waitForSelector('[data-testid="repository-name-input"]', { visible: true });
          await this.page.click('[data-testid="repository-name-input"]')
          await this.page.type('[data-testid="repository-name-input"]', repoName);
          await setTimeout(() => {
             this.page.click('[data-testid="repository-name-input"]')
             this.page.keyboard.press('Enter');
          }, 3000);
          await this.page.waitForNavigation();
 
         console.log(`Repositório "${repoName}" criado com sucesso!`);
    }
  
    async takeScreenshot(filePath) {
        // Certifique-se de que a pasta "img" exista
        const fs = require('fs');
        const path = require('path');
        const dir = path.resolve('./img');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        // Captura e salva o print na pasta "img"
        await this.page.screenshot({ path: path.resolve(dir, filePath) });
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

    async close() {
        await this.browser.close();
    }
  }
  
  module.exports = RepositoriesPage;
  