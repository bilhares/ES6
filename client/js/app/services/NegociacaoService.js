class NegociacaoService {
  constructor() {
    this.http = new HttpService();
  }
  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {
      this.http
        .get("negociacoes/semana")
        .then(negociacoes => {
          resolve(
            negociacoes.map(
              objeto =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return new Promise((resolve, reject) => {
      this.http
        .get("negociacoes/retrasada")
        .then(negociacoes => {
          resolve(
            negociacoes.map(
              objeto =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    });
  }

  obterNegociacoesDaSemanaAnterior() {
    return new Promise((resolve, reject) => {
      this.http
        .get("negociacoes/anterior")
        .then(negociacoes => {
          resolve(
            negociacoes.map(
              objeto =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    });
  }
}
