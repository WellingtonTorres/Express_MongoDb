import express from "express";
import connectNaDatabase from "./dbConnect.js";
//import mongoose from "mongoose";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
//import { LivroModel } from "./models/Livro.js";

const conexao = await connectNaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro na conexão com o banco de dados!", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
});


const app = express();
app.use(express.json()); //(middleware) para o express entender o corpo da requisição
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;