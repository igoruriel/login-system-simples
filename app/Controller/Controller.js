import View from '../View/View.js';
import Model from '../Model/Model.js';
import fetch from 'node-fetch';

export default class Controller {
  #view;
  #model;

  constructor() {
    this.#view = new View();
    this.#model = new Model();
  }


  login() {
    this.#view.getUserInput('Digite o nome do usuário: ', (username) => {
      this.#view.getUserInput('Digite a senha do usuário: ', (password) => {
        // aqui dentro entra a função do puppeteer?? 
        // acho que não... daqui eu mando texto das variáveis globais e pelas variáveis globais 
        // eu vou manadndo o texto de cada função do puppeteer, acho que é isso, né?
        this.#model.users[username] = password;
        this.#model.currentUser = Object.keys(this.#model.users)[0];

        this.#view.displayMessage(`Usuário ${username} logado com sucesso!`);
        this.#view.displayMessage('Users =>', this.#model.users);

        this.#mainMenu();
      });
    });
  }

  async #fazerRequisicao(url) {
    try {
      const response = await fetch(url);
      const data = await response.json()

      this.#view.displayMessage(data);

      this.#mainMenu();
    } catch (error) {
      console.error(error);
    }
  }

  #checkUsersLoggedIn() {
    if (!this.#model.currentUser) {
      this.#view.displayMessage("Algo de errado está errado, estamos sem user e estamos logado??")
      this.#mainMenu();
    }

    this.#view.displayMessage("Há um usuário logado, veja: ", this.#model.currentUser);
    this.#view.displayMessage("Esta é a lista de users", this.#model.users);
    this.#mainMenu();
  }


  #mainMenu() {
    this.#view.displayMessage(`Usuário atual: ${this.#model.currentUser || 'nenhum'}`);
    const menu = {
      1: () => this.#fazerRequisicao('https://jsonplaceholder.typicode.com/posts/1'), // essa opção sai e entra as funções do puppeteer
      2: () => this.#checkUsersLoggedIn(),
      3: () => this.#view.quit()
    }

    this.#view.getUserInput('Escolha uma opção:\n1 - Fazer requisição\n2 - Checa usuários logados\n3 - Sair\n', (answer) => {
      if (menu[answer]) {
        menu[answer]();
      } else {
        this.#view.displayMessage('Opção inválida. Tente novamente.');
        this.#mainMenu();
      }
    });
  }
}