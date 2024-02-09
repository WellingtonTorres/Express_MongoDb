import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    //id: { type: mongoose.Schema.Types.ObjectId },
    id: { type: String },
    nome: { 
        type: String, 
        required: [true, "O nome do autor(a) é obrigatório."] 
    },
    nacionalidade: { type: String }
},{
    versionKey: false
}
);

const autores = mongoose.model("autores", autorSchema);

export default autores;