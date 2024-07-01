let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'UK English Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Secret Number game');
    exibirTextoNaTela('p', 'Guess a number from 1 to 10');
}

exibirMensagemInicial();

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'You got it!');
        let palavraTentativa = tentativas > 1 ? 'attempts' : 'attempt';
        let mensagemTentativas = `You discovered the secret number with ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', `${mensagemTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'The secret number is smaller');
        } else {
            exibirTextoNaTela('p', 'The secret number is bigger');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = []
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   }else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
   }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
