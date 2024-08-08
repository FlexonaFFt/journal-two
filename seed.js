const Database = require("./database");

const db = new Database("database.json");

// Очистка базы данных (если нужно)
db.data = [];

// Создание тестовых пользователей
const user1 = {
  _id: "1",
  email: "user1@example.com",
  nickname: "User1",
  password: "password123",
};
const user2 = {
  _id: "2",
  email: "user2@example.com",
  nickname: "User2",
  password: "password456",
};

db.insert(user1);
db.insert(user2);

console.log("Тестовые пользователи созданы:", user1, user2);

// Создание тестовых записей
user1.posts = [
  { title: "Первая запись", text: "Это текст первой записи." },
  { title: "Вторая запись", text: "Это текст второй записи." },
];

user2.posts = [
  {
    title: "Запись пользователя 2",
    text: "Это текст записи для второго пользователя.",
  },
];

db.save();

console.log("Тестовые записи созданы");
