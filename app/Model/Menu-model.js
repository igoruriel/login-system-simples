export default class MenuModel {
  #menus = {};

  constructor() {
    if (MenuModel.instance) {
      return MenuModel.instance;
    }
    MenuModel.instance = this;
  }

  newMenu(menus) {
    const entries = Object.entries(menus);

    entries.forEach(entrie => {
      Reflect.set(this.#menus, entrie['0'], entrie['1'])
    })
  }

  getMenu(nameMenu) {
    this.#menus[nameMenu]();
  }
}