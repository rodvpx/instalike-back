// Importa o framework Express para criar a aplicação web
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do Express que representa a aplicação web
const app = express();
app.use(express.static("uploads"))
routes(app);

// Inicia o servidor na porta 3000 e imprime uma mensagem no console quando ele estiver rodando
app.listen(3000, () => {
  console.log("servidor on...");
});
