import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

//estudar eslint 2
// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next)  {
    if (erro instanceof mongoose.Error.CastError) {
        //res.status(400).json({message: "Id do autor inválido!"});
        new RequisicaoIncorreta().enviaResposta(res);
    } else if (erro instanceof mongoose.Error.ValidationError) {

        new ErroValidacao(erro).enviaResposta(res);
    
    } else if (erro instanceof NaoEncontrado) {
        erro.enviaResposta(res);
    }
    else {
        //res.status(500).json({message: "Erro ao buscar autor pelo Id!", error: erro.message});
        new ErroBase().enviaResposta(res);
        console.log("manipuladorDeErros: ");
    }
}

export default manipuladorDeErros;