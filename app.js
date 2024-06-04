let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
// Denifir titulo com base na descrição doc html (l.22)
// -> let titulo = document.querySelector('h1');
// -> titulo.innerHTML = 'Jogo do número secreto';

//Define texto após paragrafo (l.23)
// -> let paragrafo = document.querySelector('p');
// -> paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//func com mesma funcionalidade dos extraídos acima

function exbirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exbirTextoNaTela('h1', 'Jogo do número secreto');
    exbirTextoNaTela('p', 'Escolha um número entre 1 e 10'); 
}

exibirMensagemInicial();

//Define chute como o valor numerico inserido no input definito na l.25 do doc html
//Verifica, e comunica ao usu. se seu chute é igual, é maior ou menor ao número secreto
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exbirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exbirTextoNaTela('p', mensagemTentativas);
        // identifica o botão (l.28) a qual se deseja remover o atributo "desabilitado" (l.28) e torna-lo abilitado
        document.getElementById('reiniciar').removeAttribute('disabled');
        
    } else {
        if (chute > numeroSecreto) {
            exbirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exbirTextoNaTela('p', 'O número secreto é maior')
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    //caso todos os numeros tenham sido sorteados, a lista reinicia e todos os elementos tem a chance de serem sorteados de novo. 
    if (quantidadeDeElementosNaLista == 10) {
        listaDeNumerosSorteados = [];
    }

    // verifica se o numero sorteado já foi gerado aleatoriamente. Se sim, o gera novamente.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // adiciona novo número a lista de numeros escolhidos
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//função para apagar o último chute errado do usuário
function limparCampo() {
    // seleciona o campo a ser alterado
    chute = document.querySelector('input');
    chute.value = '';
}

//func para reiniciar jogo quando botão habilitado for clicado
//lembre de também salvar a página html quando altera-la
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto)
    limparCampo();
    tentativas = 1;

    exibirMensagemInicial();
     // garante que, ao reiniciar o jogo, o botão de novo jogo não possa ser clicado até que o usuário acerte o número novamente
     document.getElementById('reiniciar').setAttribute('disabled', true);
}