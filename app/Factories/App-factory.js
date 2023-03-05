import { MainController } from "../Controller/Main-Controller.js";
import View from "../View/View.js";
import UserModel from "../Model/User-Model.js";
import NavigatorController from "../Controller/Navigator-Controller.js";
import NavigatorServices from "../Services/Navigator-Services.js";
import MenuModel from "../Model/Menu-model.js";

class AppFactoryStatic {
  #view;
  #model;
  #menu;

  constructor() {
    this.#view = new View();
    this.#model = new UserModel();
    this.#menu = new MenuModel();
  }

  initialize() {
    // gostaria de adicionar um juntador que organizasse essa parte...
    const navController = new NavigatorController({
      view: this.#view,
      model: this.#model,
      services: new NavigatorServices(),
      menu: this.#menu
    });

    const mainController = new MainController({
      view: this.#view,
      model: this.#model,
      navigator: navController,
      menu: this.#menu
    });

    mainController.init();
    navController.init();
  }
}

export const AppFactory = new AppFactoryStatic();
