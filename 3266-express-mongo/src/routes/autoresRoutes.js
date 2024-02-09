import express from "express";
import AutorController from "../controllers/autorController.js";

const autoresRouter = express.Router();

autoresRouter.get("/autores", AutorController.ListarAutores);
autoresRouter.get("/autores/:id", AutorController.listarAutorById);
autoresRouter.post("/autores", AutorController.cadastrarAutor);
autoresRouter.put("/autores/:id", AutorController.atualizarAutor);
autoresRouter.delete("/autores/:id", AutorController.deletarAutor);

export default autoresRouter;