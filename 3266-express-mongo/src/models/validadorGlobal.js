import mongoose from "mongoose";

console.log("Passou por aqui no validadorGlobal.js");
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim() !== "",
    message: ({ path }) =>  `O campo ${path} foi fornecido em branco.`
});

