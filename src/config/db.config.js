import { MongoClient } from "mongodb";

export default async function conectaBD(stringConexao) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConexao);
    console.log("Conectando ao cluster do BD...");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    return mongoClient;
  } catch (error) {
    console.error("Falha na conexão com o BD!", erro);
    process.exit();
  }
}
