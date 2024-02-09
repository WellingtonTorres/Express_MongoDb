import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

// const rotas = {
//     "/": "Curso API NodeJs 2!",
//     "/livros": "Rota de livros!",
//     "/autores": "Rota de autores"
// };

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end(rotas[req.url] || "Rota não encontrada"); // pipe para o response
// });

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000");
});