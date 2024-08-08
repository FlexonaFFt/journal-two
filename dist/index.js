"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db")); // Импортируем клиент базы данных
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json()); // Позволяем парсить JSON в запросах
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
// Создание пользователя
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, email, password } = req.body;
    try {
        const result = yield db_1.default.query("INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3) RETURNING *", [nickname, email, password]);
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error creating user" });
    }
}));
// Получение всех пользователей
app.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * FROM users");
        return res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching users" });
    }
}));
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
// Создание поста
app.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, title, context } = req.body;
    try {
        const result = yield db_1.default.query("INSERT INTO posts (user_id, title, context) VALUES ($1, $2, $3) RETURNING *", [user_id, title, context]);
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error creating post" });
    }
}));
// Получение всех постов
app.get("/posts", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * FROM posts");
        return res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching posts" });
    }
}));
//# sourceMappingURL=index.js.map