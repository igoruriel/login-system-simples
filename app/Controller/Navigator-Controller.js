import NavigatorServices from '../Services/Navigator-Services.js';

export default class NavigatorController {
  #navigatorServices;
  #view;
  #model;
  #cbMenu;

  constructor(view, model, cbMenu) {
    this.#view = view;
    this.#model = model;
    this.#cbMenu = cbMenu;
    this.#navigatorServices = new NavigatorServices();
  }

  async open() {
    this.#view.displayMessage('Abrindo navegador', { messageType: 'warning' });

    try {
      this.#navigatorServices.open(this.#model.currentUser[0], this.#model.currentUser[1]);
      this.#view.displayMessage('Navegador aberto', { messageType: 'success' });

    } catch (err) {
      this.#view.displayMessage(err, { messageType: 'error' });
      // this.#navigatorMenu();
    } finally {
      this.#navigatorMenu();
    }
  }

  async #screenShot() {
    this.#view.displayMessage('Salvando screenshot', { messageType: 'warning' });

    try {
      await this.#navigatorServices.screenshot();
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
      await this.#navigatorServices.close();
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
        await this.#navigatorServices.openNewPage(url);

        this.#view.templateBasicLayout({ options: 'line' });
        this.#view.displayMessage('Nova aba aberta', { messageType: 'success' })
        // this.#navigatorMenu();
      } catch (err) {
        this.#view.templateBasicLayout({ options: 'line' });
        this.#view.displayMessage(err, { messageType: 'error' })
        // this.#navigatorMenu();
      } finally {
        this.#navigatorMenu();
      }
    })
  }

  async #restartNavigator() {
    this.#view.displayMessage('Reiniciando navegador', { messageType: 'warning' })
    try {
      await this.#navigatorServices.restartNavigator();
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

    const navMenu = {
      1: {
        name: '⛔️ Fechar Navegador',
        value: () => this.#closeNavigator(),
      },
      2: {
        name: '🪞  Screenshot', //seria interessante criar um novo menu que abre apenas quando o navegador é escolhido,
        value: () => this.#screenShot(),
      },
      3: {
        name: '📥 Nova aba',
        value: () => this.#newPage(),
      },
      4: {
        name: '🔄 Reiniciar Navegador',
        value: () => this.#restartNavigator(),
      },
      5: {
        name: `↪️  Voltar para o Menu Principal`,
        value: () => this.#cbMenu(),
      },
    }

    this.#view.templateMenu(navMenu, this.#navigatorMenu.bind(this))
  }
}