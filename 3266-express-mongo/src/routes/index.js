import express from "express";
import livrosRouter from "./livroRoutes.js";
import autoresRouter from "./autoresRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso API NodeJs - Via Express! index.js"));

    app.use(express.json(),livrosRouter,autoresRouter); //middleware para o express entender o corpo da requisição
    //app.use(express.json(),autoresRouter) //middleware para o express entender o corpo da requisição
};

export default routes;