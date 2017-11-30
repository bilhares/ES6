class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputQuantidade = $("#quantidade");
    this._inputData = $("#data");
    this._inputValor = $("#valor");
    this._negociacoesView = new NegociacoesView($("#negociacoesView"));

    this._listaNegociacoes = ProxyFactory.create(
      new ListaNegociacoes(),
      ["adiciona", "esvazia"],
      model => {
        this._negociacoesView.update(model);
      }
    );

    this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem = ProxyFactory.create(new Mensagem(), ["texto"], model =>
      this._mensagemView.update(model)
    );
    this._mensagemView = new MensagemView($("#mensagemView"));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Negociacao adicionada com sucesso";
    this._limpaFormulario();
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()
    ])
      .then(negociacoes => {
        negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array) , [])
            .forEach(negociacao =>
            this._listaNegociacoes.adiciona(negociacao)
            );
        this._mensagem.texto = "Importado com sucesso!";
      })
      .catch(error => console.log(error));
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = "Negociacoes apagada com sucesso";
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }
  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }
}
