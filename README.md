# Desafio Port Louis

## Descrição

Este projeto é um teste automatizado utilizando Jest controlar um fluxo de criação repositorios e valições variadas no site do Github.

## Requisitos

- [Node.js](https://nodejs.org) (Recomendado: versão 14 ou superior)
- NPM (geralmente instalado junto com o Node.js)

### Instalando Node.js e NPM

1. **Baixe o instalador do Node.js** no [site oficial](https://nodejs.org/).
2. **Execute o instalador** e siga as instruções na tela.
3. **Verifique se a instalação foi bem-sucedida** executando os seguintes comandos no terminal:

   ```bash
   node -v
   npm -v
Isso deve exibir a versão do Node.js e do NPM instalados.

### Instalação do Projeto
1. **Clone o repositório:**
```
git clone https://github.com/HiagoXD1604/github-test-automation.git
```
2.**Navegue até o diretório do projeto:**
```
cd NOME_DO_REPOSITORIO
```
3.**Instale as dependências:**
```
npm install
```
### Execução dos Testes
1.**Executar os testes pelo Jest:**
Crie o documento .env no ambiente de execução com suas informações de Email, Senha e Usuário tal como:
```
EMAIL="SEU EMAIL"
PASSWORD="SUA SENHA"
NAME="NOME USUÁRIO DO GITHUB"
```
2.**Executar os testes pelo Jest:**
```
npx jest
```
