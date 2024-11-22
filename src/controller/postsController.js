import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";
import { getPosts, criarPost, atualizarPost } from "../models/postsModel.js";

// Lista todos os posts existentes no banco de dados.
export async function listarPosts(req, res) {
  const result = await getPosts();
  res.status(200).json(result);
}

// Cria um novo post com base nos dados fornecidos no corpo da requisição.
export async function newPost(req, res) {
  const novo = req.body;
  try {
    const postCriado = await criarPost(novo);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Cria um novo post com base em uma imagem enviada e gera uma descrição usando o serviço Gemini.
export async function uploadImg(req, res) {
  // Cria um novo objeto de post com a imagem e uma descrição inicial vazia.
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };
  try {
    // Cria o post no banco de dados.
    const postCriado = await criarPost(novoPost);
    // Renomeia o arquivo da imagem para um nome único baseado no ID do post.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Atualiza um post existente com uma nova descrição gerada pelo serviço Gemini.
export async function atualizarNewPost(req, res) {
  const id = req.params.id; // Convertendo para número
  const url = `http://localhost:3000/${id}.png`;

  try {
    // Lê o conteúdo da imagem do sistema de arquivos.
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    // Utiliza o serviço Gemini para gerar uma descrição para a imagem.
    const descricao = await gerarDescricaoComGemini(imgBuffer);
    // Atualiza o post com a nova descrição e outros dados.
    const post = {
      imagem: url,
      descricao: descricao,
      alt: req.body.alt,
    };
    const postAtualizado = await atualizarPost(id, post);

    if (!postAtualizado) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    res.status(200).json(postAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o post" });
  }
}
