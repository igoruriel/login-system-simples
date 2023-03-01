export default class UserModel {
  #user = {};
  #currentUser = null;
  constructor() {
    if (UserModel.instance) {
      return UserModel.instance
    }
  }

  get currentUser() {
    return this.#currentUser;
  }

  #setCurrentUser(user) {
    this.#currentUser = Object.entries(user).flat() ?? null;
  }

  loginUser(user, password) {
    this.#user[user] = password;
    this.#setCurrentUser(this.#user);
  }

  // cadastrar número de processos? 
  // acho que não vai ter como fugir do DB;
  // claro que o DB é opcional, eu tenho preferência por fugir do DB

  // opção para conectar em algum DB... ler os dados de algum DB,
  // os dados do DB devem ser lidos e mostrados no terminal para serem selecionados e adicionados a uma variável?
  // na verdade estou pensando isso de uma forma muito objetiva e específica,
  // mas seria interessante pensar em algum layout para mostrar os dados de forma que eu possa selecionar opcoes
  // e guardar em uma variável ou etc


  /* navigator services */
  // service ou model que adiciona vários textos em um array. 
  // os textos desse array vão iterar em uma função do puppet 
  // que vai abrir uma nova aba que contém aquele texto.
  // {name: string, url: string, value: string, process: string}??

}