import { LivroModel } from "../models/index.js";
import { autores } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

    static async ListarLivros (req, res, next) {
        try {
            const listalivros = await LivroModel.find({}).populate("autor").exec();
            if (listalivros !== null){
                res.status(200).json(listalivros);
            } else {
                next (new NaoEncontrado ("livros não encontrado new !"));
            }
            
        } catch (error) {
            res.status(500).send("Erro ao listar os livros NRE!");
        }
    }

    static async listarLivroById (req, res, next) {
        try {
            console.log("TRY");
            const id = req.params.id;
            const livro = await LivroModel.findById(id).populate("autor", "nome").exec(); //findById origem Mongoose
            if (livro !== null) {
                res.status(200).json(livro);
            } else {
                next (new NaoEncontrado ("livro não encontrado new !"));
            }
        } catch (error) {
            console.log("CATCH"); 
            //res.status(500).json({message: "Erro ao buscar livro pelo Id!", error: error.message});
            next(error);
        }
    }

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;//await LivroModel.create(req.body);
        
        try {
            const autorEncontrado = await autores.findById(novoLivro.autor);
            const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}}; //spread operator (...) e pegar dessa forma autor: {...autorEncontrado._doc} devido mogoDb
            const livroCriado = await LivroModel.create(livroCompleto);
            res.status(201).json({message: "Livro cadastrado com sucesso!", livro: livroCriado});

        } catch (error) {
            res.status(500).json({message: "Erro ao cadastrar o livro!", error: error.message});
        }
    }

    static async atualizarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroResultado = await LivroModel.findByIdAndUpdate(id, req.body); //findById origem Mongoose
            if (livroResultado !== null) {
                res.status(200).send({message: "Autor atualizado com sucesso"});
            } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
            }
        } catch (error) {
            next(error); //res.status(500).json({message: "Erro ao atualizar livro pelo Id!", error: error.message});
        }
    }

    static async deletarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroResultado = await LivroModel.findByIdAndDelete(id); //findById origem Mongoose
            if (livroResultado !== null) {
                res.status(200).send({message: "Livro deletado com sucesso"});
            } else {
                next(new NaoEncontrado("Id do Livro não localizado."));
            }
        } catch (error) {
            res.status(500).json({message: "Erro ao deletar livro pelo Id!", error: error.message});
        }
    }

    static async listarLivrosPorFiltro(req, res) { //buscar por parametro usando query
        try {
            const {editora, titulo } = req.query;
            const livros = await LivroModel.find({
                editora: editora,
                titulo: titulo
            }); //quando chave e valor são iguais pode usar apenas um. Exemplo: {editora}
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({message: "Erro ao listar livros por editora!", error: error.message});
        }
        
    }


}

export default LivroController;