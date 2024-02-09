import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next) {
    //res.status(404).send({mensagem: "Pagina nao encontrada!"});
    const erro404 = new NaoEncontrado();
    next(erro404);
}

export default manipulador404;