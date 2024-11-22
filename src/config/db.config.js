import { MongoClient } from "mongodb";

// Função para conectar ao banco de dados MongoDB Atlas
export default async function conectaBD(stringConexao) {
  // Cria uma variável para armazenar o cliente MongoDB
  let mongoClient;

  try {
    // Cria uma nova instância do cliente MongoDB com a string de conexão fornecida
    mongoClient = new MongoClient(stringConexao);

    // Imprime uma mensagem de log indicando que a conexão está sendo estabelecida
    console.log("Conectando ao cluster do BD...");

    // Tenta estabelecer a conexão com o banco de dados
    await mongoClient.connect();

    // Se a conexão for bem-sucedida, imprime uma mensagem de sucesso
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna o cliente MongoDB conectado para uso posterior
    return mongoClient;
  } catch (error) {
    // Se ocorrer um erro durante a conexão, imprime uma mensagem de erro e encerra o processo
    console.error("Falha na conexão com o BD!", erro);
    process.exit();
  }
}
