const express = require("express");
const Database = require("./database");

const app = express();
app.use(express.json());

const db = new Database("database.json");

// Регистрация пользователя
app.post("/register", (req, res) => {
  const { email, nickname, password } = req.body;
  db.insert({ email, nickname, password });
  res.status(201).json({ message: "Пользователь зарегистрирован" });
});

// Создание записи
app.post("/posts", (req, res) => {
  const { userId, title, text } = req.body;
  const user = db.find({ _id: userId })[0];
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }
  user.posts = user.posts || [];
  user.posts.push({ title, text });
  db.save();
  res.status(201).json({ message: "Запись создана" });
});

// Получение записей пользователя
app.get("/posts/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = db.find({ _id: userId })[0];
  if (!user || !user.posts) {
    return res.status(404).json({ message: "Записи не найдены" });
  }
  res.json(user.posts);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
