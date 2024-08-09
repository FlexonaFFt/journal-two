"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// db.ts
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: "postgres", // замените на ваше имя пользователя
    host: "localhost", // или адрес вашего сервера
    database: "journal-app", // замените на имя вашей базы данных
    password: "postgres", // замените на ваш пароль
    port: 5432, // порт по умолчанию для PostgreSQL
});
client
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Connection error", err.stack));
exports.default = client;
//# sourceMappingURL=db.js.map