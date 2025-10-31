import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI 初始化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 聊天路由
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "缺少 message" });

  try {
    const startTime = Date.now();

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano", // 或 gpt-4 / gpt-3.5-turbo 測試
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const endTime = Date.now();
    const reply = completion.choices[0].message.content;
    const tokenUsed = completion.usage?.total_tokens || 0;
    const costUSD = (tokenUsed * 0.00001).toFixed(5);

    res.json({
      reply,
      tokenUsed,
      costUSD,
      durationMs: endTime - startTime,
    });
  } catch (err) {
    console.error("OpenAI 錯誤:", err.response?.data || err.message || err);
    res.status(500).json({ error: "伺服器錯誤", detail: err.message || err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
