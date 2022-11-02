funcao = ['Acólito Palavra', 'Acólito Missal','Turíbulo','Naveta','Castiçal','Castiçal']
escalados = []
ultimosEscalados = []
ultimosEscaladosTuribulo = []
turibulo = []
limpeza = []

let diaLimpezaM = 1
let diaLimpezaC = 1
let sorteouEscala = 0

function verificaPreenchimentoCorreto(){
    let diaMatriz = document.getElementById("LimpezaMatriz").value
    let diaCapela = document.getElementById("LimpezaCapela").value

    if((diaMatriz<1 || diaMatriz>obterDiasDoMesAtual()) || (diaCapela<1 || diaCapela>obterDiasDoMesAtual())){
        alert("Insira uma data válida para os dias da limpeza!")
        return false
    }
    
    if (!(document.getElementById("Sim").checked || document.getElementById("Nao").checked)) {
        alert("Informe se haverá missas especiais no mês!")
        return false
    }
    
    if(sorteouEscala<1){
        if(!(obterValores(diaMatriz, diaCapela, (document.getElementById("Sim").checked)))){
            return false
        }
    }

    sorteouEscala++

    return true
}

function obterValores(DiaLimpezaMatriz, DiaLimpezaCapela, ExisteMissaEspecial){
    diaLimpezaM = DiaLimpezaMatriz
    diaLimpezaC = DiaLimpezaCapela

    if(ExisteMissaEspecial){
        if(document.getElementById("MatrizBispo").checked){
            sortearMissaBispo("MATRIZ")
        } 
        
        else if(document.getElementById("CapelaBispo").checked){
            sortearMissaBispo("CAPELA")
        }

        else{
            alert("Selecione onde será a missa com o bispo!")
            return false
        }
    }
    return true
}

function obterDiaAtual(){
    let d = Date(Date.now());
    return d.substr(8,2)
}

function obterDiaSemana(){
    let d = Date(Date.now());

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

function obterDiasDoMesAtual(){
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

function obterQuantidadeMissasMes(aux){
    let diaSemana = obterDiaSemana()
    let diaHoje = obterDiaAtual() 
    let qtdeDiasMes = obterDiasDoMesAtual()

    qtdeQuarta = 0
    qtdeQuinta = 0
    qtdeSabado = 0
    qtdeDomingo = 0
    qtdeMissas = 0
    
    dias = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']
    
    index = dias.indexOf(diaSemana)
    
    while (diaHoje<qtdeDiasMes+1){
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

    switch (aux){
        case 'quarta':
            return qtdeQuarta
        case 'quinta':
            return qtdeQuinta
        case 'sabado':
            return qtdeSabado
        case 'domingo':
            return qtdeDomingo
    } 

    qtdeMissas = qtdeQuarta+qtdeQuinta+qtdeSabado+(qtdeDomingo*2)+1

    return qtdeMissas
}

function obterDiaPrimeiraSexta(){
    let diaHoje = obterDiaAtual() 

    if(diaHoje<=7){
        let diaSemanaHoje = obterDiaSemana()
        dias = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']
        index = dias.indexOf(diaSemanaHoje)
        for (i=diaHoje; i<=7; i++){
            if(index==4){
                return diaHoje
            }
            diaHoje++
            index++
        }
        return true
    }
    return false
}

function obterDomingosRestantes(){
    let diaHoje = obterDiaAtual() 
    let diaSemanaHoje = obterDiaSemana()

    dias = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']

    let pos = dias.indexOf(diaSemanaHoje)
    let qtdeDom = 0

    for(i=diaHoje; i>1; i--){
        if(pos==0){
            pos = 7
            qtdeDom++
        }
        pos-=1
    }

    var domingosRestantes = obterQuantidadeMissasMes("domingo")

    if(domingosRestantes>=1){
        return qtdeDom
    }
}

function sortearNome(){
    if(escalados.length == nome.length){
        for(cont = escalados.length - 20; cont<escalados.length; cont++){
            ultimosEscalados.push(escalados[cont])
        }
        escalados = []
    }

    if(turibulo.length == nome.length){
        for(cont = turibulo.length - 20; cont<turibulo.length; cont++){
            ultimosEscaladosTuribulo.push(turibulo[cont])
        }
        escalados = []
    }

    numeroSorteado = parseInt(Math.random()*nome.length);

    while ((escalados.indexOf(nome[numeroSorteado]) > -1) || ultimosEscalados.indexOf(nome[numeroSorteado]) > -1){
        numeroSorteado = parseInt(Math.random()*nome.length);
    }

    if(escalados.length >= 20){
        ultimosEscalados = []
    }

    if(turibulo.length >= 20){
        ultimosEscaladosTuribulo = []
    }

    escalados.push(nome[numeroSorteado]);
    return nome[numeroSorteado]
}

function sortearAcolito(){
    if (!verificaPreenchimentoCorreto()){
        return 
    }

    if(obterDiaPrimeiraSexta()){
        $("body").append("<br><h2> PRIMEIRA SEXTA FEIRA - MATRIZ</h2>");
        $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\">Função</TH><TH SCOPE=\"col\">19:00</TH></TR></THEAD><TBODY ID=\"tabela-escala-matriz-sexta\">");

        let tabela = "";

        for (i=0; i<2; i++){
            tabela+="<TR><TD>"+funcao[i]+"</TD>"
            tabela+="<TD>"+sortearNome()+"</TD>"
        }

        let inserir = document.getElementById("tabela-escala-matriz-sexta");
        inserir.innerHTML = tabela;
            
        $("body").append("</TBODY>");
        $("body").append("</TABLE>");
        $("body").append("<BR>");
    }

    for(x=1; x<obterQuantidadeMissasMes("quarta")+1; x++){
        var domingoAgora = obterDomingosRestantes() + x

        $("body").append("<br><h2>" + domingoAgora +"º QUARTA - CAPELA</h2>");
        $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\">Função</TH><TH SCOPE=\"col\">19:00</TH></TR></THEAD><TBODY ID=\"tabela-escala-matriz-quarta" + x +"\">");

        let tabela = "";

        for (i=0; i<2; i++){
            tabela+="<TR><TD>"+funcao[i]+"</TD>"
            tabela+="<TD>"+sortearNome()+"</TD>"
        }

        let inserir = document.getElementById("tabela-escala-matriz-quarta" + x);
        inserir.innerHTML = tabela;
            
        $("body").append("</TBODY>");
        $("body").append("</TABLE>");
        $("body").append("<BR>");
    }

    for(x=1; x<obterQuantidadeMissasMes("quinta")+1; x++){
        var domingoAgora = obterDomingosRestantes() + x

        $("body").append("<br><h2>" + domingoAgora +"º QUINTA - MATRIZ</h2>");
        $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\">Função</TH><TH SCOPE=\"col\">18:00</TH></TR></THEAD><TBODY ID=\"tabela-escala-matriz-quinta" + x +"\">");

        let tabela = "";

        for (i=0; i<funcao.length - 2; i++){
            tabela+="<TR><TD>"+funcao[i]+"</TD>"
            if(i==2){
                var auxTuribulo = sortearNome()

                while((auxTuribulo.indexOf(turibulo[numeroSorteado])> -1)){
                    auxTuribulo = sortearNome()
                }

                turibulo.push(auxTuribulo)
                tabela+="<TD>"+auxTuribulo+"</TD>"

            }else{
                tabela+="<TD>"+sortearNome()+"</TD>"
            }
        }

        let inserir = document.getElementById("tabela-escala-matriz-quinta" + x);
        inserir.innerHTML = tabela;
            
        $("body").append("</TBODY>");
        $("body").append("</TABLE>");
        $("body").append("<BR>");
    }

    for(x=1; x<obterQuantidadeMissasMes("sabado")+1; x++){

        var domingoAgora = obterDomingosRestantes() + x

        $("body").append("<br><h2>" + domingoAgora +"º SÁBADO - CAPELA NOSSA SENHORA APARECIDA</h2>");
        $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\">Função</TH><TH SCOPE=\"col\">19:00</TH></TR></THEAD><TBODY ID=\"tabela-escala-matriz-sbd" + x +"\">");

        let tabela = "";

        for (i=0; i<2; i++){
            tabela+="<TR><TD>"+funcao[i]+"</TD>"
            tabela+="<TD>"+sortearNome()+"</TD>"
        }

        let inserir = document.getElementById("tabela-escala-matriz-sbd" + x);
        inserir.innerHTML = tabela;
            
        $("body").append("</TBODY>");
        $("body").append("</TABLE>");
        $("body").append("<BR>");
    }

    for(x=1; x<obterQuantidadeMissasMes("domingo")+1; x++){
        var domingoAgora = obterDomingosRestantes() + x

        $("body").append("<br><h2>" + domingoAgora +"º DOMINGO - MATRIZ</h2>");
        $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\">Função</TH><TH SCOPE=\"col\">07:00</TH><TH SCOPE=\"col\">09:00</TH><TH SCOPE=\"col\">18:00</TH><TH SCOPE=\"col\">20:00</TH></TR></THEAD><TBODY ID=\"tabela-escala-matriz-dmg" + x +"\">");

        let tabela = "";

        for (i=0; i<funcao.length; i++){
            tabela+="<TR><TD>"+funcao[i]+"</TD>"
            if(i<2){
                for(k=0;k<4;k++){
                    tabela+="<TD>"+sortearNome()+"</TD>"
                }

                tabela+="</TR>"
            }
            else{
                for(k=0;k<4;k++){
                    if(k==0 || k==1){
                        tabela+="<TD></TD>"
                    } else{
                        if(i==2){
                            var auxTuribulo = sortearNome()
                            while((auxTuribulo.indexOf(turibulo[numeroSorteado])> -1)){
                                auxTuribulo = sortearNome()
                            }
                            turibulo.push(auxTuribulo)
                            tabela+="<TD>"+auxTuribulo+"</TD>"
                        }else{
                            tabela+="<TD>"+sortearNome()+"</TD>"
                        }
                    }
                }
                tabela+="</TR>"
            }
        }

        let inserir = document.getElementById("tabela-escala-matriz-dmg" + x);
        inserir.innerHTML = tabela;
            
        $("body").append("</TBODY>");
        $("body").append("</TABLE>");
        $("body").append("<BR>");
        
        $("body").append("<br><h2>" + domingoAgora + "º DOMINGO - CAPELA</h2>");
        $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\">Função</TH><TH SCOPE=\"col\">08:00</TH><TH SCOPE=\"col\">19:00</TH></TR></THEAD><TBODY ID=\"tabela-escala-capela-dmg" + x + "\">");
        tabela = "";

        for (i=0; i<funcao.length; i++){
            tabela+="<TR><TD>"+funcao[i]+"</TD>"
            if(i<2){
                for(k=0;k<2;k++){
                    tabela+="<TD>"+sortearNome()+"</TD>"
                }
                tabela+="</TR>"
            }
            else{
                for(k=0;k<2;k++){
                    if(k==0){
                        tabela+="<TD></TD>"
                    } else{
                        if(i==2){
                            turiferario = sortearNome()
                            turibulo.push(turiferario)
                            tabela+="<TD>"+turiferario+"</TD>"
                        }else{
                            tabela+="<TD>"+sortearNome()+"</TD>"
                        }
                    }
                }
                tabela+="</TR>"
            }
        }
        inserir = document.getElementById("tabela-escala-capela-dmg" + x);
        inserir.innerHTML = tabela;
        
        $("body").append("</TBODY>");
        $("body").append("</TABLE>");
        $("body").append("<BR>");
    };
    document.getElementById("Sortear").disabled = true 
};

function sortearLimpeza(){
    if (!verificaPreenchimentoCorreto()){
        return 
    }
    
    var h_limpeza_matriz = "14H30";
    var h_limpeza_capela = "14H";

    $("body").append("<br><h2>ESCALA LIMPEZA OBJETOS LITÚRGICOS</h2>");
    
    $("body").append("<br><h3>Matriz - Dia " + diaLimpezaM) + "</h3>";
    
    $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\" STYLE=\"display: flex; justify-content: center;\">Horário " + h_limpeza_matriz + "</TH></TR></THEAD><TBODY ID=\"tabela-limp-matriz\">");

    let tabela = "";

    let numeroSorteado = 0;

	for (i=0; i<5; i++){
        if(limpeza.length == nome.length){
            limpeza = [];
        };

        numeroSorteado = parseInt(Math.random()*nome.length);

        while (limpeza.indexOf(nome[numeroSorteado]) > -1){
            numeroSorteado = parseInt(Math.random()*nome.length);
        };

        tabela+="<TR><TD>" + nome[numeroSorteado] + "</TD></TR>";
        limpeza.push(nome[numeroSorteado]);
    };

	let inserir = document.getElementById('tabela-limp-matriz');
	inserir.innerHTML = tabela;
    $("body").append("</TBODY>");
    $("body").append("</TABLE>");
    $("body").append("<BR>");
    
    $("body").append("<br><h3>Capela - Dia " + diaLimpezaC) + "</h3>";
    
    $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\" STYLE=\"display: flex; justify-content: center;\">Horário " + h_limpeza_capela + "</TH></TR></THEAD><TBODY ID=\"tabela-limp-capela\">");
    
    tabela = "";

    numeroSorteado = 0;

	for (i=0; i<5; i++){
        if(limpeza.length == nome.length){
            limpeza = [];
        };

        numeroSorteado = parseInt(Math.random()*nome.length);

        while (limpeza.indexOf(nome[numeroSorteado]) > -1){
            numeroSorteado = parseInt(Math.random()*nome.length);
        };

        tabela+="<TR><TD>" + nome[numeroSorteado] + "</TD></TR>";
        limpeza.push(nome[numeroSorteado]);
    };

	inserir = document.getElementById('tabela-limp-capela');
	inserir.innerHTML = tabela;

    $("body").append("</TBODY>");
    $("body").append("</TABLE>");
};

function sortearMissaBispo(local){
        var horarioMissaBispo = document.getElementById("HorarioBispo").value
        let tabela = ""
       
        $("body").append("<br><h2>MISSA COM O BISPO - "+local+"</h2>");
        $("body").append("<TABLE CLASS=\"table table-dark table-striped-columns\"><THEAD><TR><TH SCOPE=\"col\">Função</TH><TH SCOPE=\"col\">"+horarioMissaBispo+"</TH></TR></THEAD><TBODY ID=\"tabela-escala-bispo-"+local+"\">");
        
        funcao.push("Mitra")
        funcao.push("Báculo")

        for (i=0; i<funcao.length; i++){
            tabela+="<TR><TD>"+funcao[i]+"</TD>"
            if(i==2){
                var auxTuribulo = sortearNome()
                while((auxTuribulo.indexOf(turibulo[numeroSorteado])> -1)){
                    auxTuribulo = sortearNome()
                }
                turibulo.push(auxTuribulo)
                tabela+="<TD>"+auxTuribulo+"</TD>"
            }else{
                tabela+="<TD>"+sortearNome()+"</TD>"
            }
        }
        tabela+="</TR>"

        let inserir = document.getElementById("tabela-escala-bispo-"+local);
        inserir.innerHTML = tabela;
        
        $("body").append("</TBODY>");
        $("body").append("</TABLE>");
        $("body").append("<BR>");

        funcao.pop("Mitra")
        funcao.pop("Báculo")
}

function sortearTudo(){
    sortearAcolito()
    sortearLimpeza()
}

function reseta(){

};
