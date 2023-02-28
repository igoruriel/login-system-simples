# Projetinho fellas - sistema de login simples

## Inicializar

```shell
npm run on
```

## Propósito

Criar um sistema simples de "login" que receba o input do usuário.
O sistema faz "login" do usuário, o propósito seria guardar os valores da input do usuário e fazer login em algum navegador ou etc...
Minha idéia é automatizar tarefas de navegador utilizando o puppeteer e controlando as ações através de um dashboard feito no terminal.

## Status

Em desenvolvimento.

Inquirer entrará em breve.

### Ideia

- Acredito que as listas de menu precisam virar uma factory.
  <!-- - dúvidas sobre como isso funcionaria... seria estranho... eu teria que importar view na factory? ou passar a view como parametro? res: como parametro -->
  <!-- class MenuListFactory {}?? -->
- 1 Model de menu para cada lista de menu.
- Decorators: quis fazer um teste... só pra entender mesmo com funciona, mas me parece que tem algo para cozinhar aqui.
- Lose jobs opportunities.
- algo que aprendi recentemente:
  - Controller faz o "de-para" do código, o Services possui a lógica, a View possui a parte gráfica/interface, o services e a view não se conversam, seria papel do controller intermediar as chamadas da view com a lógica do services... ex.: se eu digito 1 na interface do meu terminal, o comando/"sinal" retorna da view para o controller e envia para o services processar a informação
