import View from '../View/View.js';
import Model from '../Model/Model.js';
import NavigatorController from './Navigator-Controller.js';

export class MainController {
  #view;
  #model;
  #navController

  constructor() {
    this.#view = new View();
    this.#model = new Model();
    this.#navController = new NavigatorController(this.#view, this.#model, this._mainMenu.bind(this))
  }

  login() {
    this.#view.getUserInput(`🪪  Digite o nome do usuário: `, (username) => {
      this.#view.getUserInput(`🔏 Digite a senha do usuário: `, (password) => {

        this.#model.users[username] = password;
        this.#model.currentUser = Object.entries(this.#model.users).flat();

        this.#view.templateBasicLayout({ options: 'line' });
        this.#view.displayMessage(`Usuário ${username} logado com sucesso!`, { messageType: 'success' });

        this.#mainMenu();
      }, { password: true });
    });
  }

  #checkUsersLoggedIn() {
    if (!this.#model.currentUser) {
      this.#view.displayMessage("Algo de errado está errado, estamos sem user e estamos logado??", { messageType: 'error' })
      this.#mainMenu();
    }

    this.#view.displayMessage(`Há um usuário logado, veja: ${this.#model.currentUser[0]}`, { messageType: 'success' });
    this.#mainMenu();
  }

  // devo criar um Form Controller? r: não, mas preciso de alguns métodos que preencha formulários;
  // 
  #registerPath() {
    // função para registrar o comaninho de uma pasta
  }

  #registerSender() {
    // função para registrar o nome de um remetente
  }

  _mainMenu() {
    this.#mainMenu();
  }

  #mainMenu() {
    this.#view.templateUserConnected(this.#model.currentUser[0])

    const menu = {
      1: {
        name: '👥 Checar usuários logados',
        value: () => this.#checkUsersLoggedIn(),
      },
      2: {
        name: '🌐 Abrir navegador',
        value: () => this.#navController.open(),
      },
      // opção para conectar em algum DB... ler os dados de algum DB, 
      // os dados do DB devem ser lidos e mostrados no terminal para serem selecionados e adicionados a uma variável?
      // na verdade estou pensando isso de uma forma muito objetiva e específica,
      // mas seria interessante pensar em algum layout para mostrar os dados de forma que eu possa selecionar opcoes
      // e guardar em uma variável ou etc
      3: {
        name: '🛑 Quit',
        value: () => this.#view.quit(),
      }
    }

    this.#view.templateMenu(menu, this.#mainMenu.bind(this));
  }
}