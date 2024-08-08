const mongoose = require("mongoose");
const { User, Post } = require("./models");

// Подключение к базе данных
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");

    // Удаление существующих данных (если нужно)
    await User.deleteMany({});
    await Post.deleteMany({});

    // Создание тестовых пользователей
    const admin = await User.create({
      email: "admin@example.com",
      nickname: "admin",
      password: "password123",
    });

    console.log("Тестовые пользователи созданы:", user1, user2);

    // Создание тестовых записей
    const post1 = await Post.create({
      user: admin._id,
      title: "Первая запись",
      text: "Это текст первой записи.",
    });
    const post2 = await Post.create({
      user: admin._id,
      title: "Вторая запись",
      text: "Это текст второй записи.",
    });

    console.log("Тестовые записи созданы:", post1, post2);

    // Закрываем соединение
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err);
    mongoose.connection.close();
  });
