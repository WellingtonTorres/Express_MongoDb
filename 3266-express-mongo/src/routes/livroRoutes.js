import express from "express";
import LivroController from "../controllers/livroController.js";

const livrosRouter = express.Router();
//express faz a busca de rota por ordem compexidade. Exemplo: /livros/busca e /livros/:id. Se colocar /livros/:id primeiro, o /livros/busca não será encontrado
livrosRouter.get("/livros", LivroController.ListarLivros);
livrosRouter.get("/livros/busca", LivroController.listarLivrosPorFiltro);
livrosRouter.get("/livros/:id", LivroController.listarLivroById);
livrosRouter.post("/livros", LivroController.cadastrarLivro);
livrosRouter.put("/livros/:id", LivroController.atualizarLivro);
livrosRouter.delete("/livros/:id", LivroController.deletarLivro);

export default livrosRouter;