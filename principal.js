//Array de nomes importado do python - Só de exemplo no momento
nome = ["nome1","nome2","nome3","nome4","nome5","nome6"]

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

function sortearAcolito(){
    let tabela = "";
    let numeroSorteado = 0;
	for (i=0; i<funcao.length; i++){
        numeroSorteado = parseInt(Math.random()*nome.length);
        if (nome[numeroSorteado] in escalados){
            numeroSorteado = parseInt(Math.random()*nome.length);
        };
        tabela+="<tr><td>" + funcao[i] + "</td>";
        tabela+="<td>" + nome[numeroSorteado] + "</td></tr>";
        fora.push(nome[numeroSorteado]);
        escalados.push(nome[numeroSorteado]);
        console.log(escalados);
    }
	let inserir = document.getElementById('Pessoas');
	inserir.innerHTML = tabela;
    escalados = [];
};

function reseta(){

};

