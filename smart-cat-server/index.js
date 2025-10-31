import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "缺少 message" });

  try {
    const startTime = Date.now();

    // 使用 GPT-5 nano
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 500
    });

    const endTime = Date.now();
    const reply = completion.choices[0].message.content;
    const tokenUsed = completion.usage?.total_tokens || 0;
    const costUSD = (tokenUsed * 0.00001).toFixed(5); // 依官方價格調整

    res.json({ reply, tokenUsed, costUSD, durationMs: endTime - startTime });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
