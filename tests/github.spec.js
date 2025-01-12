const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const LoginPage = require('../pageObjects/loginPage');
const ProfilePage = require('../pageObjects/profilePage');
const RepositoriesPage = require('../pageObjects/repositoriesPage');

dotenv.config();

describe('Automação do GitHub', () => {
  let browser, page, loginPage, profilePage, repositoriesPage;
  const repoName = `repo-${Date.now()}`;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    repositoriesPage = new RepositoriesPage(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Fluxo completo no GitHub', async () => {
    const { EMAIL, PASSWORD, NAME } = process.env;
    if (!EMAIL || !PASSWORD || !NAME) throw new Error('Credenciais ausentes no arquivo .env');

    // Login e Validar se a autenticação foi bem sucedida e URL esperada.
    await loginPage.login(EMAIL, PASSWORD);

    // Validar o nome do usuário
    await profilePage.openUserMenu();
    await profilePage.navigateToProfileCheckName(NAME)

    //Navegar até a aba “Repositories”
    await profilePage.openUserMenu();
    await profilePage.navigateToRepositories();

    // Acessar repositório aleatório
    await repositoriesPage.openRandomRepository();

    //Navegar até a aba “Pull requests”
    await repositoriesPage.navigateToPullRequests();
    
    //Criar um Novo Repositório
    await repositoriesPage.createNewRepository(repoName);
    await profilePage.openUserMenu();
    await profilePage.navigateToRepositories();
    await repositoriesPage.openRepository(repoName)

     // Capturar screenshot da página do repositório criado
     await repositoriesPage.takeScreenshot(`${repoName}-screenshot.png`);

     await setTimeout(() => {
      profilePage.openUserMenu();
      profilePage.logout();
    }, 3000);
     
  });
});
