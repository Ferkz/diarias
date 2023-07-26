class modelController{
    constructor(){
        this._inputNome = document.querySelector("#nomePaciente");
        this._inputId = document.querySelector("#idPaciente");
        this._inputValorDiaria = parseFloat(document.querySelector("#valorDiaria"));
        this._dataEntrada = (document.querySelector("#dataEntrada"));
        this._dataSaida = (document.querySelector("#dataSaida"));
        this._horaEntrada = (document.querySelector("#horaEntrada"));
        this._horaSaida = (document.querySelector("#horaSaida"));
        this._tipoAlta = document.querySelector("#tipoAlta");
    }
    _criaDiaria(){
        return new Diaria(
            this._inputNome.value,
            this._inputId.value,
            this._inputValorDiaria,
            this._dataEntrada,
            this._dataSaida,
            this._horaEntrada,
            this._horaSaida,
            this._tipoAlta

        );
    }
    
}
