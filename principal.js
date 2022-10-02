//Array para definir as funções a serem sorteadas
funcao = ['Acólito Palavra', 'Acólito Missal','Turíbulo','Naveta','Castiçal','Castiçal']

//Array de pessoas que já foram escaladas
//se alguém for sorteado na escala
//irá vir para este array para não ser escalado novamente
escalados = []

//Array para evitar que haja repetições
//na função do turíbulo. Enquanto o turíbulo
//não estiver com todos os nomes da lista nome, 
//vai adicionando quem for sorteado para a função
//nessa lista, quando estiver lotada, é limpada 
turibulo = []

console.log(obterDiaSemana())
console.log(obterDiaAtual())
console.log(obterMesAtual())

function obterDiaSemana(){
    //Pega a data atual da requisição
    let d = Date(Date.now());
    
    //Converte o dia em número e dia da semana

    let a = d.toString()
    let x = a.substr(0, 3)

    switch (x){ 
    case 'Mon':
        return 'Segunda'
    case 'Tue':
        return 'Terça'
    case 'Wed':
        return 'Quarta'
    case 'Thu':
        return 'Quinta'
    case 'Fri':
        return 'Sexta'
    case 'Sat':
        return 'Sábado'
    case 'Sun':
        return 'Domingo'
    }
}

function obterDiaAtual(){
    let d = Date(Date.now());
    return d.substr(8,2)
}

function obterMesAtual(){
    let d = Date(Date.now());
    return d.substr(4,3)
}

function sortearAcolito(){
    //Criando a variável que vai inserir a tabela no html
    let tabela = "";
    //Criando a variável para sortear posição no vetor nome
    let numeroSorteado = 0;
	for (i=0; i<funcao.length; i++){
        numeroSorteado = parseInt(Math.random()*nome.length);
        while (nome[numeroSorteado] in escalados){
            numeroSorteado = parseInt(Math.random()*nome.length);
        };
        tabela+="<tr><td>" + funcao[i] + "</td>";
        tabela+="<td>" + nome[numeroSorteado] + "</td></tr>";
        escalados.push(nome[numeroSorteado]);
        console.log(escalados);
    }
	let inserir = document.getElementById('Pessoas');
	inserir.innerHTML = tabela;
    escalados = [];
};

function reseta(){

};
