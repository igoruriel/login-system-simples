import { createInterface } from 'node:readline';

class View {
  #rl;

  constructor() {
    this.#rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  displayMessage(messages, { options, messageType } = {}) {
    // layoutMessages: warning, success, error
    let msg = '';
    Array.isArray(messages) ? msg = messages.join('') : msg = messages

    const types = {
      success: ` 🟢 `,
      warning: ` 🟡 `,
      error: ` 🔴 `,
    }

    console.log(types[messageType] ? types[messageType] : '', msg);
  }

  getUserInput(message, callback, options = { password: false }) {

    // EU NAO ESTOU SUPORTANDO MAIS MEU DEUS, O QUE ESTÁ ERRADO AQUI MEU PAI, MOSTRE O CAMINHO PARA TEU SERVO LEAL MEU SENHOR
    // let pass = false;
    // let output = (string) => this.#rl.output.write(string);

    // this.#rl._writeToOutput = function (stringToWrite) {
    //   if (pass) {
    //     output(stringToWrite.replace(/./g, '*'));
    //   } else {
    //     output(stringToWrite)
    //   }
    // };

    // if (options.password) {
    //   pass = true;
    // } else {
    //   pass = false;
    // }

    this.#rl.question(message, function (input) {
      callback(input)
    });
  }

  templateBasicLayout({ options }) {
    const opt = options;
    const layout = {
      line: '---------------------------------------',
      blank: `                                      `
    }
    if (layout[opt]) {
      this.displayMessage(layout[opt])
    }
    this.displayMessage('');
  }

  templateOptions(options) {
    const layout = {
      header: `🪧  Escolha uma opção 🪧`,
      footer: 'Escolha uma opção e aperte ENTER: '
    }

    this.displayMessage(layout['header']);
    for (let option in options) {
      const opcaoValidaDoArray = Number(option) + 1
      this.displayMessage(`[ ${opcaoValidaDoArray} ] - ${options[option]['name']}`);
    }
    return layout['footer'];
  }

  templateMenu(menuList, callbackMainMenu) {
    this.getUserInput(this.templateOptions(menuList), (answer) => {

      const respostaEquivalente = Number(answer) - 1

      if (menuList[respostaEquivalente]) {
        this.templateBasicLayout({ options: 'line' });
        menuList[respostaEquivalente]['value']();
      } else {
        this.templateBasicLayout({ options: 'line' });
        this.displayMessage('Opção inválida. Tente novamente.', { messageType: 'error' });
        callbackMainMenu();
      }
    });
  }

  templateUserConnected(currentUser) {
    this.templateBasicLayout({ options: 'line' });
    this.displayMessage([
      this.displayMessage(`Usuário atual: ${currentUser}`, { messageType: 'success' }) &&
      this.displayMessage('nenhum', { messageType: 'error' })
    ]);
  }

  quit() {
    this.displayMessage("Saindo...", { messageType: 'warning' });
    this.#rl.close();
  }
}

export default View;
