import conectaBD from "../config/db.config.js";

const conexao = await conectaBD(process.env.STRING_CONEXAO);

export async function getPosts() {
  const db = conexao.db("imersao-instalike");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

export async function criarPost(newPost) {
  const db = conexao.db("imersao-instalike");
  const colecao = db.collection("posts");
  return colecao.insertOne(newPost);
}
