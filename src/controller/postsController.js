import { getPosts } from "../models/postsModel.js";

export async function listarPosts(req, res) {
  // Chama a função getPosts para buscar todos os posts do banco de dados de forma assíncrona e armazena o resultado em uma variável
  const result = await getPosts();

  // Envia uma resposta de sucesso (código de status 200) com os posts obtidos no formato JSON
  res.status(200).json(result);
}
