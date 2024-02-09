import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor (erro) {
        const mensagensErro = Object.values(erro.errors)
            .map(error => error.message) //map é um for que retorna um array
            .join(", "); 


        super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}

export default ErroValidacao;