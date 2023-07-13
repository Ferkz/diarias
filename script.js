function calcularDiaria() {
    const nome = document.getElementById("nomePaciente").value;
    const id = document.getElementById("idPaciente").value;
    const valorDiaria = parseFloat(document.getElementById("valorDiaria").value);
    const dataEntrada = (document.getElementById("dataEntrada").value);
    const dataSaida = (document.getElementById("dataSaida").value);
    const tipoAlta = document.getElementById("tipoAlta").value;
    const erros = []

    if (!nome.value || nome.value === undefined || nome.value ===null ){
        validaCampo(nome,"Campo nome está vazio!!");
    }
    if (!id.value || id.value === undefined || id.value === null){
        validaCampo(id,"Número de prontuário não pode estar vazio");
    }
   function validaCampo(input, texto){
        const exibirErro =  document.querySelector(".erro");
        exibirErro.classList.add("alert-danger")
        exibirErro.innerText = texto

      

   }


    function dateFormater(dateHour){
        const [ano,mm, dd] = dateHour.split('-')
        const newDate = new Date(ano,mm -1,dd)
        return newDate.getTime();
    }
    function dataParaTexto (data){
        const [ ano, mes, dia] = data.split('-');
        const dataFormatada = `${dia}/${mes}/${ano}`
        return dataFormatada
    }
    
    const tempoInternado = (dateFormater(dataSaida) - dateFormater(dataEntrada)) /1000;
    const diaParaSegundo = 24* 60*60;
    let dias = Math.floor(tempoInternado / diaParaSegundo) ;
    console.log(tipoAlta);
 
    if (tipoAlta === "obito" || tipoAlta === "transferencia") {
        dias += 1;
        console.log(dias);
    }
    const valorTotal = valorDiaria * dias;

   
  
    document.getElementById("valorTotal").innerHTML = `Valor Total:.......... R$ ${valorTotal.toFixed(2)}`;
    document.getElementById("nome").innerHTML = `Nome Paciente:.......... ${nome}`
    document.getElementById("id").innerHTML = `Número de Prontuário:.......... ${id}`
    document.getElementById("printTipoAlta").innerHTML = "Tipo de Alta: " + tipoAlta;
    document.getElementById("printValorDiaria").innerHTML = `Valor da Diária:.......... R$ ${valorDiaria.toFixed(2)}`;
    document.getElementById("printDataEntrada").innerHTML = `Data Entrada:.......... ${dataParaTexto(dataEntrada)}`
    document.getElementById("printDataSaida").innerHTML = `Data de Saída:.......... ${dataParaTexto(dataSaida)}`
    document.getElementById("numeroDiarias").innerHTML = `Número diarias:.......... ${dias}`
    document.getElementById("assinatura").innerText = "Assinatura:_________________________________________________________"
}

function imprimirPagina() {
    window.print();
}
