const express = require("express");
const { User, Post } = require("./models");
const router = express.Router();

// Регистрация пользователя
router.post("/register", async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    const user = await User.create({ email, nickname, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Создание записи
router.post("/posts", async (req, res) => {
  try {
    const { userId, title, text } = req.body;
    const post = await Post.create({ user: userId, title, text });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Получение всех записей пользователя
router.get("/posts/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
