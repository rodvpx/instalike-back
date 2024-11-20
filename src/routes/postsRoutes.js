import express from "express";
import { listarPosts } from "../controller/postsController.js";
const routes = (app) => {
  // Configura um middleware para que o Express possa interpretar dados recebidos no formato JSON nas requisições
  app.use(express.json());
  // **Definição de rota para obter todos os posts**
  // Essa rota lida com requisições GET para o endpoint "/posts"
  app.get("/posts", listarPosts);
};

export default routes;
