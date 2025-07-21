// Função para escrever no documento
function escrever(texto){
    document.writeln(texto);
}

function consumoNecessario(distanciaPercorrida, consumoMedio){
    // Calcula o consumo necessário
    return distanciaPercorrida / consumoMedio;
}

function mediaValoresCombustiveis(somaTotal, quantidadePostosPesquisados){
    return somaTotal / quantidadePostosPesquisados;
}

function gastoDiario(consumoNecessarioLitros, precoCombustivel){
    return 2 * (consumoNecessarioLitros * precoCombustivel);
}

// Função principal para ser chamada pelo front
function calcularResultados() {
    let min = Number.POSITIVE_INFINITY;
    let max = 0;
    let somaTotalPrecos = 0;

    // Normaliza vírgula para ponto e remove espaços
    let distanciaValor = document.getElementById("distancia").value.trim().replace(',', '.');
    let consumoValor = document.getElementById("consumo").value.trim().replace(',', '.');
    let quantidadeValor = document.getElementById("quantidade").value.trim();

    let distanciaPercorrida = parseFloat(distanciaValor);
    let consumoMedio = parseFloat(consumoValor);
    let quantidadePostosPesquisados = Number(quantidadeValor);

    // Validação dos campos principais
    if (
        isNaN(distanciaPercorrida) || distanciaPercorrida <= 0 || distanciaPercorrida > 999999999999999999999999 ||
        isNaN(consumoMedio) || consumoMedio <= 0 || consumoMedio > 999999999999999999999999 ||
        isNaN(quantidadePostosPesquisados) || quantidadePostosPesquisados <= 0 || quantidadePostosPesquisados > 999 ||
        !/^\d+([.,]?\d+)?$/.test(distanciaValor) ||
        !/^\d+([.,]?\d+)?$/.test(consumoValor) ||
        !/^\d+$/.test(quantidadeValor)
    ) {

        if (isNaN(distanciaPercorrida) || distanciaPercorrida <= 0) {
            alert("Distância inválida! Digite um número positivo válido.");
        }
        if (isNaN(consumoMedio) || consumoMedio <= 0) {
            alert("Consumo médio inválido! Digite um número positivo válido.");
        }
        if (isNaN(quantidadePostosPesquisados) || quantidadePostosPesquisados <= 0) {
            alert("Quantidade de postos pesquisados inválida! Digite um número positivo válido.");
        }
        if (!/^\d+([.,]?\d+)?$/.test(distanciaValor)) {
            alert("Distância deve ser um número positivo válido.");
        }
        if (!/^\d+([.,]?\d+)?$/.test(consumoValor)) {
            alert("Consumo médio deve ser um número positivo válido.");
        }
        if (!/^\d+$/.test(quantidadeValor)) {
            alert("Quantidade de postos pesquisados deve ser um número inteiro positivo.");
        }   
        return;
    }

    for (let i = 0; i < quantidadePostosPesquisados; i++) {
        let precoInput = prompt("Digite o preço do combustível no posto " + (i + 1) + ":");
        if (!precoInput) {
            alert("Campo obrigatório! Digite um valor numérico positivo.");
            i--;
            continue;
        }
        precoInput = precoInput.trim().replace(',', '.');
        let precoCombustivel = parseFloat(precoInput);

        if (
            isNaN(precoCombustivel) || precoCombustivel <= 0 ||
            !/^\d+([.,]?\d+)?$/.test(precoInput)
        ) {
            alert("Preço inválido! Digite apenas números positivos.");
            i--; // repete a iteração
            continue;
        }

        if (precoCombustivel < min) min = precoCombustivel;
        if (precoCombustivel > max) max = precoCombustivel;
        somaTotalPrecos += precoCombustivel;
    }

    let consumoNecessarioLitros = consumoNecessario(distanciaPercorrida, consumoMedio);
    let mediaValoresPesquisados = mediaValoresCombustiveis(somaTotalPrecos, quantidadePostosPesquisados);
    let gasto = gastoDiario(consumoNecessarioLitros, min);

    const resultadoLista = document.getElementById("resultado-lista");
    resultadoLista.innerHTML = `
        <h2>Resultados</h2> <br>
        <li>A distância percorrida é: ${distanciaPercorrida} km</li>
        <li>O consumo médio é: ${consumoMedio} km/l</li>
        <li>O menor valor pesquisado é: R$ ${min.toFixed(2)}</li>
        <li>O consumo nécessario é: R$ ${consumoNecessarioLitros.toFixed(2)}</li>
        <li>A média dos valores pesquisados é: R$ ${mediaValoresPesquisados.toFixed(2)}</li>
        <li>O gasto diário (ida e volta) com o menor valor é: R$ ${gasto.toFixed(2)}</li>
    `;
}
    function limparResultados() {
    document.getElementById("distancia").value = "";
    document.getElementById("consumo").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("resultado-lista").innerHTML = "";
}
