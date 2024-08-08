import express, { Request, Response } from "express";
import client from "./db"; // Импортируем клиент базы данных

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // Позволяем парсить JSON в запросах

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

// Создание пользователя
app.post("/users", async (req: Request, res: Response) => {
  const { nickname, email, password } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3) RETURNING *",
      [nickname, email, password],
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating user" });
  }
});

// Получение всех пользователей
app.get("/users", async (_req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM users");
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching users" });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

// Создание поста
app.post("/posts", async (req: Request, res: Response) => {
  const { user_id, title, context } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO posts (user_id, title, context) VALUES ($1, $2, $3) RETURNING *",
      [user_id, title, context],
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating post" });
  }
});

// Получение всех постов
app.get("/posts", async (_req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM posts");
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching posts" });
  }
});
