export class MainController {
  #view;
  #model;
  #navigator;
  #menu;

  constructor({ view, model, ...dependencies }) {
    const _deps = Object.freeze(dependencies);

    const _view = view ?? null;
    const _model = model ?? null;
    const _navigator = _deps['navigator'] ?? null;

    this.#view = _view;
    this.#model = _model;
    this.#navigator = _navigator;
    this.#menu = _deps['menu'] ?? null
    // this.#deps = _deps;
  }

  #login() {
    this.#view.getUserInput(`🪪  Digite o nome do usuário: `, (username) => {
      this.#view.getUserInput(`🔏 Digite a senha do usuário: `, (password) => {

        this.#model.loginUser(username, password);

        this.#view.templateBasicLayout({ options: 'line' });
        this.#view.displayMessage(`Usuário ${username} logado com sucesso!`, { messageType: 'success' });

        this.#mainMenu();
      }, { password: true });
    });
  }

  #checkUsersLoggedIn() {
    if (!this.#model.currentUser || /\s/.test(this.#model.currentUser[0])) {
      this.#view.displayMessage("Algo de errado está errado, estamos sem user e estamos logado??", { messageType: 'error' })
    } else {
      this.#view.displayMessage(`Há um usuário logado, veja: ${this.#model.currentUser[0]}`, { messageType: 'success' });
    }
    this.#mainMenu();
  }

  // devo criar um Form Controller? r: não, mas preciso de alguns métodos que preencha formulários;
  // // 
  // #registerPath() {
  //   // função para registrar o comaninho de uma pasta
  // }

  // #registerSender() {
  //   // função para registrar o nome de um remetente
  // }

  #mainMenu() {
    this.#view.templateUserConnected(this.#model.currentUser[0])

    const menu = [
      {
        name: '👥 Checar usuários logados',
        value: () => this.#checkUsersLoggedIn(),
      },
      {
        name: '🌐 Abrir navegador',
        value: () => this.#navigator.open(),
      },
      {
        name: '🛑 Quit',
        value: () => this.#view.quit(),
      }
    ]

    this.#view.templateMenu(menu, this.#mainMenu.bind(this));
  }

  init() {
    this.#menu.newMenu({ mainMenu: () => this.#mainMenu() });
    this.#login();
  }
}

// __decorate([measureTime()], MainController.prototype, "login", null);
// __decorate([measureTime()], MainController.prototype, "_mainMenu", null)