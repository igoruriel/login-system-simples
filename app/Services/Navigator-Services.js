import * as pup from "puppeteer";

export default class NavigatorServices {

  #page;
  #browser;

  async open() {
    this.#browser = await pup.launch({
      headless: false
    });
    this.#page = await this.#browser.newPage();
    await this.#page.goto('https://www.google.com', { waitUntil: 'load' });

    // this.#browser = browser;
    // this.#page = page;
  }

  async restartNavigator() {
    await this.close();
    await this.open();
  }

  async close() {
    await this.#browser.close();
  }

  async openNewPage(url) {
    if (!this.#browser.isConnected()) return Promise.reject('Navegador não está conectado');
    const urlRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;
    if (!urlRegex.test(url)) return Promise.reject('URL inválida tente novamente');

    this.#page = await this.#browser.newPage();
    this.#page.goto(url)
  }

  async screenshot() {
    await this.#page.screenshot({ path: 'google.png' });
  }
}