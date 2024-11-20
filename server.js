import express from "express";
// array de objetos
const posts = [
  {
    id: 1,
    descricao: "Uma foto",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Uma paisagem incrível",
    imagem: "https://source.unsplash.com/random/300x150/?nature",
  },
  {
    id: 3,
    descricao: "Um gato muito fofo",
    imagem: "https://placekitten.com/300/200",
  },
  {
    id: 4,
    descricao: "Citação inspiradora",
    imagem: "https://picsum.photos/300/150",
  },
  {
    id: 5,
    descricao: "Comida deliciosa",
    imagem: "https://loremflickr.com/300/150/food",
  },
  {
    id: 6,
    descricao: "Um meme engraçado",
    imagem: "https://imgflip.com/memegenerator",
  },
];

const app = express();
app.use(express.json()); //receber em string e transforma json
app.listen(3000, () => {
  console.log("servidor on...");
});

//criar uma rota
app.get("/posts", (req, res) => {
  //requisição e resposta
  res.status(200).json(posts); //http 200 = ok
});


app.get("/posts/:id", (req, res) => {
  const index = buscaPost(req.params.id)
  res.status(200).json(posts[index]);
});

//função para buscar no array pelo id
function buscaPost(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}