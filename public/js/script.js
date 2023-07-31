const btnParametros = document.querySelector(".btn-parametros")
const parametros = document.querySelector("dialog")
const salvar = document.querySelector(".btn-salvar")
const cancelar = document.querySelector(".btn-cancelar")


btnParametros.addEventListener("click", ()=>{
    parametros.showModal()
});
cancelar.addEventListener("click",()=>{
    parametros.close()
})

salvar.addEventListener("click",()=>{
    const diaria = parseFloat(document.querySelector(".texto-diaria").value);
    localStorage.setItem('valorDiaria',diaria)
    const pegarValorDiaria = localStorage.getItem("valorDiaria")
    diaria.innerText = pegarValorDiaria

    parametros.close();
})
   

function calcularDiaria() {
    const nome = document.getElementById("nomePaciente").value;
    const id = document.getElementById("idPaciente").value;
    const valorDiaria = localStorage.getItem('valorDiaria')
    const dataEntrada = (document.getElementById("dataEntrada").value);
    const horaEntrada = (document.getElementById("horaEntrada").value)
    const dataSaida = (document.getElementById("dataSaida").value);
    const horaSaida = (document.getElementById("horaSaida").value)
    const tipoAlta = document.getElementById("tipoAlta").value;
 
    if(!validarCampos(nome,id,dataEntrada,dataSaida,tipoAlta,horaEntrada,horaSaida)){
    return 
   }
 
    const tempoInternado = (dateFormater(dataSaida) - dateFormater(dataEntrada)) /1000;
    const diaParaSegundo = 24* 60*60;
    let dias = Math.floor(tempoInternado / diaParaSegundo) ;
     
    if (tipoAlta === "Obito" || tipoAlta === "Transferencia") {
        dias += 1;
    }
    const valorTotal = valorDiaria * dias;
    

    
    document.getElementById("nome").innerHTML = `Nome Paciente............ : ${nome}`
    document.getElementById("id").innerHTML = `Número de Prontuário.......... : ${id}`
    document.getElementById("printTipoAlta").innerHTML = "Tipo de Alta........... : " + tipoAlta;
    document.getElementById("printValorDiaria").innerHTML = `Valor da Diária.......... : ${formataValor(valorDiaria)}`;
    document.getElementById("printDataEntrada").innerHTML = `Data Entrada.......... : ${dataParaTexto(dataEntrada)}`
    document.getElementById("printHoraEntrada").innerHTML = `Hora de entrada.......... : ${horaEntrada}`
    document.getElementById("printDataSaida").innerHTML = `Data de Saída.......... : ${dataParaTexto(dataSaida)}`
    document.getElementById("printHoraSaida").innerHTML= `Hora de Saída......... : ${horaSaida}`
    document.getElementById("numeroDiarias").innerHTML = `Número diarias.......... : ${dias}`
    document.getElementById("valorTotal").innerHTML = `Valor Total.......... : ${formataValor(valorTotal)}`;
    document.getElementById("assinatura").innerText = "Assinatura:_________________________________________________________"
}
function imprimirPagina() {
    window.print();
}
function comparadata (data1, data2){
    const dataIgual = dateFormater(data1) <= dateFormater(data2)
    return dataIgual

}
function dataParaTexto (data){
    const [ ano, mes, dia] = data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`
    return dataFormatada
}
function dateFormater(dateHour){
    const [ano,mm, dd] = dateHour.split('-')
    const newDate = new Date(ano,mm -1,dd)
    return newDate.getTime();
}
function validarCampos(nome,id,dataEntrada,dataSaida,tipoAlta,horaEntrada,horaSaida) {
    const camposFaltantes = [];
    const message = document.querySelector(".erro");
    if(!dataValida(dataParaTexto(dataEntrada))){
        camposFaltantes.push("Informe uma data Valida")
    }
    if(!dataValida(dataParaTexto(dataSaida))){
        camposFaltantes.push("Informe uma data Valida")
    }
    if(nome ===""){
        camposFaltantes.push("Informe o nome")
    }
    if(id===""){
        camposFaltantes.push("Número de prontuário")
    }
    if (dataEntrada === "") {
        camposFaltantes.push("Data de Entrada");
    }
    if (dataSaida === "") {
        camposFaltantes.push("Data de Saída");
    }
    if(tipoAlta ===""){
        camposFaltantes.push("Tipo de alta")
    }
    if(horaEntrada===""){
        camposFaltantes.push("Hora de entrada")
    }
    if(horaSaida===""){
        camposFaltantes.push("Hora de saída")
    }
    if(comparadata(dataSaida,dataEntrada)){
        camposFaltantes.push("Data de saída não pode ser menor ou igual a data de entrada!!");
    }
    if (camposFaltantes.length > 0) {
        message.classList.remove('alert-sucess')
        message.classList.add("alert-danger")
        message.innerText = `Por favor, preencha o(s) campo(s) obrigatório(s): ${camposFaltantes.join(", ")}`
        return false;
    }
    if(camposFaltantes.length <=0){
        message.classList.add("alert-sucess")
        message.innerText = "Consulta realizada com sucesso!!"
        return true
    }

    return true;
}
function dataValida(e){
    let data = e
    console.log(data);
    const validaData = new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/)
    const result = validaData.test(data)
    if(result){
        return true
    }
    return false
}
function formataValor(valor){
    const valorFormatado = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor)
    return valorFormatado
}
