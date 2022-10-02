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

// Array de pessoas sorteadas para limpeza.
// Será usada na função sortearLimpeza()
limpeza = []

//console.log(verificaMissaEspecial())
console.log(obterQuantidadeMissasMes())

let diaLimpezaM = 1
let diaLimpezaC = 1

function verificaPreenchimentoCorreto(){
    let diaMatriz = document.getElementById("LimpezaMatriz").value
    let diaCapela = document.getElementById("LimpezaCapela").value
    if(diaMatriz<1 || diaCapela>obterDiasDoMesAtual()){
        alert("Insira uma data válida para os dias da limpeza!")
        return false
    }
    if (!(document.getElementById("Sim").checked || document.getElementById("Nao").checked)) {
        alert("Informe se haverá missas especiais no mês!")
        return false
    }

    obterValores(diaMatriz, diaCapela, (document.getElementById("Sim").checked))

    return true
}

function obterValores(DiaLimpezaMatriz, DiaLimpezaCapela, ExisteMissaEspecial){
    diaLimpezaM = DiaLimpezaMatriz
    diaLimpezaC = DiaLimpezaCapela
    //if(ExisteMissaEspecial){
        
    //}
}

function obterDiaSemana(){
    //Pega a data atual da requisição
    let d = Date(Date.now());
    
    //Converte o dia em número e dia da semana

    let a = d.toString().substr(0, 3)

    //Retorna o dia da semana do dia de hoje

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
    //Obtém o dia do mês atual
    let d = Date(Date.now());
    return d.substr(8,2)
}

function obterDiasDoMesAtual(){
    //Obtém o mês atual
    let d = Date(Date.now()).toString().substr(4,3);
    //Retorna a quantidade de dias do mês atual
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

function obterQuantidadeMissasMes(){
    //Retorna o dia da semana do dia de hoje
    let diaSemana = obterDiaSemana()
    //Retorna que dia é hoje
    let diaHoje = obterDiaAtual() 
    //Retorna a quantidade de dias do mês atual
    let qtdeDiasMes = obterDiasDoMesAtual()
    //Cria a variável contadora de dias do mês
    qtdeQuarta = 0
    qtdeQuinta = 0
    qtdeSabado = 0
    qtdeDomingo = 0
    qtdeMissas = 0
    //Lista para definir os dias da semana
    dias = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']
    //Retorna o índice da lista do dia da semana de hoje
    //Ex.: 0 - Segunda, 1 - Terça, 2 - Quarta, 3 - Quinta, 4 - Sexta, 5 - Sábado, 6 - Domingo
    index = dias.indexOf(diaSemana)
    //Enquanto o mês não acabar, continue a executar
    while (diaHoje!=qtdeDiasMes){
        switch (index){
            case 2:
                qtdeQuarta++
                index++
                diaHoje++
                break
            case 3:
                qtdeQuinta++
                index++
                diaHoje++
                break
            case 5:
                qtdeSabado++
                index++
                diaHoje++
                break
            case 6:
                qtdeDomingo++
                index = 0
                diaHoje++
                break
            default:
                diaHoje++
                index++
        }
    }
    qtdeMissas = qtdeQuarta+qtdeQuinta+qtdeSabado+(qtdeDomingo*2)+1
    return qtdeMissas
}

function verificaMissaEspecial(){
    //Verifica se há missa especial no mês
    var special_mass = confirm("Vai ter missa especial? Se sim, clique em Ok.")
    //Caso sim
    if(special_mass == true){
        //Pega o nome da missa especial e a data e retorna em uma lista
        let vet = []
        var special_mass_n = prompt("Qual será a missa especial?")
        var diaMissaEspecial = prompt("Digite a data dessa missa")
        vet.push(special_mass_n, diaMissaEspecial)
        return vet
    }
}

function sortearAcolito(){
    if (!verificaPreenchimentoCorreto()){
        return 
    }
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
    document.getElementById("Sortear").disabled = true
};

function sortearLimpeza(){
    if (!verificaPreenchimentoCorreto()){
        return 
    }
    
    var h_limpeza_matriz = "14H30";
    var h_limpeza_capela = "14H";

    $("body").append("<br><h2>ESCALA LIMPEZA OBJETOS LITÚRGICOS</h2>");
    /// Matriz
    $("body").append("<br><h3>Matriz - Dia " + diaLimpezaM) + "</h3>";
    //Criando tabela
    $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\" STYLE=\"display: flex; justify-content: center;\">Horário " + h_limpeza_matriz + "</TH></TR></THEAD><TBODY ID=\"tabela-limp-matriz\">");
    //Criando a variável que vai inserir o conteúdo da tabela no html
    let tabela = "";
    //Criando a variável para sortear posição no vetor nome
    let numeroSorteado = 0;
	for (i=0; i<5; i++){
        if(limpeza.length == nome.length){
            limpeza = [];
        };

        numeroSorteado = parseInt(Math.random()*nome.length);
        console.log(numeroSorteado)

        while (limpeza.indexOf(nome[numeroSorteado]) > -1){
            numeroSorteado = parseInt(Math.random()*nome.length);
            console.log("E O PAUUUUUUULOOOOOOOOOOOO")
        };

        tabela+="<TR><TD>" + nome[numeroSorteado] + "</TD></TR>";
        limpeza.push(nome[numeroSorteado]);
        console.log(limpeza);
    };
	let inserir = document.getElementById('tabela-limp-matriz');
	inserir.innerHTML = tabela;
    $("body").append("</TBODY>");
    $("body").append("</TABLE>");
    $("body").append("<BR>");
    /// Capela
    $("body").append("<br><h3>Capela - Dia " + diaLimpezaC) + "</h3>";
    //Criando tabela
    $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\" STYLE=\"display: flex; justify-content: center;\">Horário " + h_limpeza_capela + "</TH></TR></THEAD><TBODY ID=\"tabela-limp-capela\">");
    //Limpando a variável que vai inserir o conteúdo da tabela no html
    tabela = "";
    //Limpando a variável para sortear posição no vetor nome
    numeroSorteado = 0;
    console.log(limpeza)
	for (i=0; i<5; i++){
        if(limpeza.length == nome.length){
            limpeza = [];
        };

        numeroSorteado = parseInt(Math.random()*nome.length);
        console.log(numeroSorteado)

        while (limpeza.indexOf(nome[numeroSorteado]) > -1){
            numeroSorteado = parseInt(Math.random()*nome.length);
            console.log("E O PAUUUUUUULOOOOOOOOOOOO")
        };

        tabela+="<TR><TD>" + nome[numeroSorteado] + "</TD></TR>";
        limpeza.push(nome[numeroSorteado]);
        console.log(limpeza);
    };
	inserir = document.getElementById('tabela-limp-capela');
	inserir.innerHTML = tabela;
    $("body").append("</TBODY>");
    $("body").append("</TABLE>");
};

function reseta(){

};