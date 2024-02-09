import mongoose from "mongoose";
//import  {autorSchema} from "../models/Autor.js";


// const LivroSchema = new mongoose.Schema({
//     //id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     id: { type: mongoose.Schema.Types.ObjectId },
//     titulo: { type: String, required: true },
//     editora: { type: String, required: true },
//     preco: { type: Number },
//     paginas: { type: Number }
// },{versionKey: false});
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
        type: String, 
        required: [true, "O título do livro é obrigatório."] },
    editora: { 
        type: String,
        required: [true, "O nome da editora é obrigatório."],
        enum: {
            values: ["Casa do Código", "Alura"],
            message: "Editora {VALUE} inválida. Valores válidos: Casa do Código e Alura"
        }    
    },
    preco: { type: Number },
    paginas: { 
        type: Number,
        // min: [10, "O livro deve ter no mínimo 10 páginas, o valor fornecido foi {VALUE}"],
        // max: [1000, "O livro deve ter no máximo 1000 páginas, o valor fornecido foi {VALUE}"]
        validate: {
            validator: function(valor) {
                return valor >= 10 && valor <= 1000;
            },
            message: "O livro deve ter no mínimo 10 páginas e no máximo 1000 páginas, o valor fornecido foi {VALUE}"
        }
    }
    //autor: autorSchema
}, { versionKey: false });

const LivroModel = mongoose.model("livros", livroSchema);

export default LivroModel;