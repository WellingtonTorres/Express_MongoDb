import NaoEncontrado from "../erros/NaoEncontrado.js";
import  {autores} from "../models/index.js";

//atualizando apenas para testar git actions - NOVAMENTE 3
class AutorController {

    static async ListarAutores (req, res, next) {
        try {
            const listaAutores = await autores.find({});
            res.status(200).json(listaAutores);
        } catch (error) {
            next(error);
        }
    }

    static async listarAutorById (req, res, next) {
        console.log("ANALISE AQUI req => " + req.params.id);
        try {
            const id = req.params.id;
            const autor = await autores.findById(id); //findById origem Mongoose
            // console.log("ANALISE AQUI id => " + id);
            // console.log("ANALISE AQUI autor => " + autor);
            if (autor !==  null){
                res.status(200).json(autor);
            } else {
                next (new NaoEncontrado ("autor não encontrado new !"));
            }
        } catch (error) {
            next(error);
        }
    }

    static async cadastrarAutor (req, res, next) {
        try {
            //throw new Error(); apenas para testar em manipuladorDeErros.js
            // const autor = new autores(req.body);
            // const Autoresalvo = await autor.save();
            // res.status(201).json(Autoresalvo);
            const novoAutor = await autores.create(req.body);
            res.status(201).json({message: "autor cadastrado com sucesso!", autor: novoAutor});

        } catch (error) {
            next(error);
        }
    }

    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findByIdAndUpdate(id, req.body); //findById origem Mongoose
            if (autorResultado !== null) {
                res.status(200).json({message: "autor atualizado com sucesso!"});
            } else {
                next (new NaoEncontrado ("Id do autor não encontrado new !"));
            }
        } catch (error) {
            next(error);
        }
    }

    static async deletarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findByIdAndDelete(id); //findById origem Mongoose
            if (autorResultado !== null) {
                res.status(200).json({message: "autor deletado com sucesso!"});
            } else {
                next (new NaoEncontrado ("Id do autor não encontrado new !"));
            }
        } catch (error) {
            next(error);
        }
    }


}

export default AutorController;