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

obterQuantidadeDomingosMes()

function obterDiaSemana(){
    //Pega a data atual da requisição
    let d = Date(Date.now());
    
    //Converte o dia em número e dia da semana

    let a = d.toString().substr(0, 3)

    switch (a){ 
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
    let d = Date(Date.now()).toString().substr(4,3);
    switch (d){ 
        case 'Jan':
            return 31
        case 'Feb':
            if(d.substr(11,4)%4==0 && d.substr(11,4)%100!=0){
                return 29
            } else{
                return 28
            }                 
        case 'Mar':
            return 31
        case 'Apr':
            return 30
        case 'May':
            return 31
        case 'Jun':
            return 30
        case 'Jul':
            return 31
        case 'Aug':
            return 31
        case 'Sep':
            return 30
        case 'Oct':
            return 31
        case 'Nov':
            return 30
        case 'Dec':
            return 31
        }
}

function obterQuantidadeDomingosMes(){
    let diaSemana = obterDiaSemana()
    let diaMes = obterDiaAtual() 
    let mesAtual = obterMesAtual()
    qtdeDias = 0
    dias = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']
    index = dias.indexOf(diaSemana)
    while (diaMes!=mesAtual){
        index++
        diaMes++
        if(index==6){
            index = 0
            qtdeDias++
        }
    }
    console.log(qtdeDias)
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
        tabela+="<tr><th scope='col'>Funções / Horários</th><th scope='col'>07:00</th><th scope='col'>09:00</th><th scope='col'>18:00</th><th scope='col'>20:00</th></tr><td>" + funcao[i] + "</td>";
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
