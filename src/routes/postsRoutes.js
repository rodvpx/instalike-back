import express from "express";
import multer from "multer";
import {
  listarPosts,
  newPost,
  uploadImg,
} from "../controller/postsController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(express.json());
  app.get("/posts", listarPosts);
  app.post("/posts", newPost);
  app.post("/upload", upload.single("img"), uploadImg);
};

export default routes;
