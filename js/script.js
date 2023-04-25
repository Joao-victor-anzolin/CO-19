function exibirErro(mensagem) {
    //implementar...
}


var dados_mapa = [
    ['Países', 'Confirmados'],
    ['0', 0]
];

google.charts.load('current', { 'packages': ['geochart'], });
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    let data = google.visualization.arrayToDataTable(dados_mapa);

    let options = {
        colorAxis: { color: ['red', 'blue'] }
    };

    let chart = new google.visualization.GeoChart(document.getElementById('mapa'));

    chart.draw(data, options);
}



async function buscarDados() {

    await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => prepararDadosMapa(dados))
        .catch(e => exibirErro(e.message));
}


function prepararDadosMapa(dados) {

    for(let i = 0; i < dados['data'].length; i++) {
        dados_mapa.push([dados['data'][i].country, dados['data'][i].confirmed])
    }

    console.table(dados_mapa)

    drawRegionsMap();    

}










var dados_pizza = [
    ['categoria', 'total'],
    ['0', 0]
];

//--- Gráfico de pizza para volume de negociações ---

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(desenharGraficoDePizza);


function desenharGraficoDePizza() {

    let data = google.visualization.arrayToDataTable(dados_pizza);

    let options = {

        is3D: true,
        legend: { position: 'bottom' },
    };

    let chart = new google.visualization.PieChart(
        document.getElementById('graf-pz')
    );

    chart.draw(data, options);
}
async function carregarDados() {

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => prepararDados(dados))
        .catch(e => exibirDados(e.mensagem));
}

function prepararDados(dados) {
    //console.table(dados['data'])
    var totalC = 0
    var totalD = 0
    var totalR = 0

    for (let i = 0; i < dados['data'].length; i++) {

        totalC = totalC + dados['data'][i].confirmed
        totalD = totalD + dados['data'][i].deaths
        totalR = totalR + dados['data'][i].recovered

    }

    dados_pizza = [
        ['categoria', 'total']
    ];

    dados_pizza.push(['Confirmados', totalC]);
    dados_pizza.push(['Mortes', totalD]);
    dados_pizza.push(['Recuperados', totalR]);

    desenharGraficoDePizza();
}

//Tabela

async function carregarTabela() {
    
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')   //Endpoint da API
        .then( response => response.json() )    // Obtendo resposta da API
        .then( dados => prepararDadosTabela(dados) )  // Obtendo os dados
        .catch( e => exibirErro(e.message) );   // Obtendo erro (se der erro)
}

// Função para preparar e exibir os dados no HTML
function prepararDadosTabela(dados) {
    // Criando variável para controlar as linhas da tbody
    let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';
    
    // Laço para percorrer todos os dados recebidos
    for (let i=0; i<dados['data'].length; i++) {
        let auxLinha = '';

        if (i %2 !=0)
            auxLinha = '<tr class="listra">';
        else 
            auxLinha = '<tr>';

        auxLinha += '<td class="linhas">' + dados['data'][i].uf + '</td>' +
                    '<td class="linhas"> ' + dados['data'][i].state + '</td>' +
                    '<td class="linhas">' + dados['data'][i].cases + '</td>' +
                    '<td class="linhas">' + dados['data'][i].deaths + '</td>' +
                    '<td class="linhas">' + dados['data'][i].suspects + '</td>' +
                    '<td class="linhas">' + dados['data'][i].refuses + '</td>' +
                '</tr>';

        linhas.innerHTML += auxLinha;
    }
}

document.addEventListener("DOMContentLoaded",
    function (event) {
        carregarDados();
        carregarTabela();
        buscarDados();

    }



)