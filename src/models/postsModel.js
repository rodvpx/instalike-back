import { ObjectId } from "mongodb";
import conectaBD from "../config/db.config.js";

// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão fornecida no ambiente.
const conexao = await conectaBD(process.env.STRING_CONEXAO);

// Função para recuperar todos os posts da coleção "posts" do banco de dados.
export async function getPosts() {
  // Obtém o banco de dados "imersao-instalike".
  const db = conexao.db("imersao-instalike");
  // Obtém a coleção "posts" do banco de dados.
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna um array.
  return colecao.find().toArray();
}

// Função para criar um novo post na coleção "posts" do banco de dados.
export async function criarPost(newPost) {
  // Obtém o banco de dados "imersao-instalike".
  const db = conexao.db("imersao-instalike");
  // Obtém a coleção "posts" do banco de dados.
  const colecao = db.collection("posts");
  // Insere o novo post na coleção e retorna o resultado da operação.
  return colecao.insertOne(newPost);
}

// Função para atualizar um post existente na coleção "posts" do banco de dados.
export async function atualizarPost(id, newPost) {
  // Obtém o banco de dados "imersao-instalike".
  const db = conexao.db("imersao-instalike");
  // Obtém a coleção "posts" do banco de dados.
  const colecao = db.collection("posts");
  // Converte o ID em formato de string hexadecimal para um objeto ObjectId.
  const objectID = ObjectId.createFromHexString(id);
  // Atualiza o post com o novo conteúdo, usando o ID como filtro.
  return colecao.updateOne({ _id: new ObjectId(objectID) }, { $set: newPost });
}
