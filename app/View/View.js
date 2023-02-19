import { createInterface } from 'node:readline';

class View {
  #rl;
  constructor() {
    this.#rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  displayMessage(...messages) {
    console.log(...messages);
  }

  getUserInput(message, callback) {
    this.#rl.question(message, (input) => {
      callback(input);
    });
  }

  quit() {
    this.displayMessage("Saindo...");
    this.#rl.close();
  }
}

export default View;
