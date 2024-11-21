import fs from "fs";
import { getPosts, criarPost } from "../models/postsModel.js";

export async function listarPosts(req, res) {
  const result = await getPosts();
  res.status(200).json(result);
}

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

export async function uploadImg(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };
  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
