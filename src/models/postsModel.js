// Importa a função conectaBD que provavelmente está localizada em src/config/db.config.js
// Essa função é responsável por estabelecer a conexão com o banco de dados
import conectaBD from "../config/db.config.js";

// Conecta à base de dados de forma assíncrona e armazena a conexão em uma variável
const conexao = await conectaBD(process.env.STRING_CONEXAO);
// **Função assíncrona para buscar todos os posts do banco de dados**
export async function getPosts() {
  // Acessa o banco de dados "imersao-instalike" e a coleção "posts" utilizando a conexão existente
  const db = conexao.db("imersao-instalike");
  const colecao = db.collection("posts");

  // Utiliza o método find para recuperar todos os documentos da coleção e os converte para um array
  return colecao.find().toArray();
}
