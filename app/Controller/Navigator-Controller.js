export default class NavigatorController {
  #services;
  #view;
  #model;
  #menu;

  constructor({ view, model, ...dependencies }) {
    const _deps = Object.freeze(dependencies);
    const _view = view ?? null;
    const _model = model ?? null;

    this.#view = _view;
    this.#model = _model;
    this.#services = _deps['services'] ?? null;
    this.#menu = _deps['menu'] ?? null;
  }

  async open() {
    this.#view.displayMessage('Abrindo navegador', { messageType: 'warning' });

    try {
      this.#services.open();
      this.#view.displayMessage('Navegador aberto', { messageType: 'success' });

    } catch (err) {
      this.#view.displayMessage(err, { messageType: 'error' });
    } finally {
      this.#navigatorMenu();
    }
  }

  async #screenShot() {
    this.#view.displayMessage('Salvando screenshot', { messageType: 'warning' });

    try {
      await this.#services.screenshot();
      this.#view.displayMessage('Screenshot salvo', { messageType: 'success' });
    } catch (err) {
      this.#view.displayMessage(this.#view.displayMessage(err, { messageType: 'error' }));
    } finally {
      this.#navigatorMenu();
    }
  }

  async #closeNavigator() {
    this.#view.displayMessage('Fechando nevegador', { messageType: 'warning' })

    try {
      await this.#services.close();
    } catch (err) {
      this.#view.displayMessage('problema => ' + err, { messageType: 'error' })
    } finally {
      this.#navigatorMenu();
    }
  }

  async #newPage() {
    // seria interessante conseguir fazer verificação se o browser está conectador antes de pedir pelo input... 
    // mas estou limitado aqui... não sei quase nada de arquitetura... 
    this.#view.displayMessage('Abrindo nova aba, informe URL abaixo', { messageType: 'warning' })
    this.#view.templateBasicLayout({ options: 'blank' });

    this.#view.getUserInput(' URL: ', async (url) => {
      try {
        await this.#services.openNewPage(url);

        this.#view.templateBasicLayout({ options: 'line' });
        this.#view.displayMessage('Nova aba aberta', { messageType: 'success' })
      } catch (err) {
        this.#view.templateBasicLayout({ options: 'line' });
        this.#view.displayMessage(err, { messageType: 'error' })
      } finally {
        this.#navigatorMenu();
      }
    })
  }

  async #restartNavigator() {
    this.#view.displayMessage('Reiniciando navegador', { messageType: 'warning' })
    try {
      await this.#services.restartNavigator();
      this.#view.templateBasicLayout({ options: 'line' });
      this.#view.displayMessage('Reiniciado com sucesso', { messageType: 'success' })
    } catch (err) {
      this.#view.templateBasicLayout({ options: 'line' });
      this.#view.displayMessage(err, { messageType: 'error' })
    } finally {
      this.#navigatorMenu();
    }
  }

  #navigatorMenu() {
    this.#view.templateUserConnected(this.#model.currentUser[0])

    const navMenu = [
      {
        name: '⛔️ Fechar Navegador',
        value: () => this.#closeNavigator(),
      },
      {
        name: '🪞  Screenshot', //seria interessante criar um novo menu que abre apenas quando o navegador é escolhido,
        value: () => this.#screenShot(),
      },
      {
        name: '📥 Abrir nova guia',
        value: () => this.#newPage(),
      },
      {
        name: '🔄 Reiniciar Navegador',
        value: () => this.#restartNavigator(),
      },
      {
        name: `↪️  Voltar para o Menu Principal`,
        value: () => this.#menu.getMenu('mainMenu'),
      },
    ]

    this.#view.templateMenu(navMenu, this.#navigatorMenu.bind(this))
  }

  init() {
    this.#menu.newMenu({ navigatorMenu: () => this.#navigatorMenu() });
  }
}