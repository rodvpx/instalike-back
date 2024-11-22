import express from "express";
import multer from "multer";
import cors from "cors";
import {
  listarPosts,
  newPost,
  uploadImg,
  atualizarNewPost,
} from "../controller/postsController.js";

// Configura o armazenamento de arquivos enviados via upload.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos enviados: "uploads/"
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado.
    cb(null, file.originalname);
  },
});

// Configura as opções do CORS para permitir acesso de uma origem específica.
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200, // Padrão é 200, mas explicita aqui para clareza.
};

// Cria uma instância do middleware multer com as configurações de armazenamento.
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da API.
const routes = (app) => {
  // Habilita o parsing de JSON no corpo da requisição.
  app.use(express.json());
  // Habilita o CORS com as opções configuradas.
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts.
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post.
  app.post("/posts", newPost);

  // Rota POST para upload de imagem e criação de post.
  // O middleware "upload.single('img')" processa o upload de um único arquivo chamado "img".
  app.post("/upload", upload.single("img"), uploadImg);

  // Rota PUT para atualizar um post existente.
  // O parâmetro ":id" captura o ID do post da URL.
  app.put("/upload/:id", atualizarNewPost);
};

// Exporta a função "routes" para ser usada no arquivo principal da aplicação.
export default routes;
