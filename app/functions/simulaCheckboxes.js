import { createInterface } from 'readline';
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});
const opcoes = [
  { nome: 'Opção 1', valor: 'opcao1', selecionado: false },
  { nome: 'Opção 2', valor: 'opcao2', selecionado: false },
  { nome: 'Opção 3', valor: 'opcao3', selecionado: false },
  // adicione quantas opções quiser
];
function exibirOpcoes() {
  console.log('Selecione uma ou mais opções:\n');
  for (let i = 0; i < opcoes.length; i++) {
    console.log(`${i + 1}. [${opcoes[i].selecionado ? 'X' : ' '}] ${opcoes[i].nome}`);
  }
  console.log('');
}
function processarEntrada(entrada) {
  const opcaoSelecionada = Number(entrada) - 1;
  if (opcaoSelecionada >= 0 && opcaoSelecionada < opcoes.length) {
    opcoes[opcaoSelecionada].selecionado = !opcoes[opcaoSelecionada].selecionado;
    exibirOpcoes();
    rl.question('Pressione ENTER para confirmar ou digite outra opção: ', processarEntrada);
  } else {
    console.log('Opção inválida!');
    rl.question('Digite uma opção válida: ', processarEntrada);
  }
}
exibirOpcoes();
rl.question('Digite as opções que deseja selecionar (separadas por vírgula): ', (entrada) => {
  const opcoesSelecionadas = entrada.split(',').map(opcao => Number(opcao.trim()) - 1);
  opcoesSelecionadas.forEach(opcao => {
    if (opcao >= 0 && opcao < opcoes.length) {
      opcoes[opcao].selecionado = true;
    }
  });
  exibirOpcoes();
  rl.question('Pressione ENTER para confirmar ou digite outra opção: ', processarEntrada);
});
