import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;
const TELEGRAM_API_TOKEN = "7163499707:AAFNH2WcEX8GWNBjTxHktl9sKpTpmq72fu8";

app.use(bodyParser.json());
app.use(express.static("public")); // 정적 파일 서빙 설정

app.post("/webhook", (req, res) => {
  const { message } = req.body;

  if (message && message.text) {
    handleCommand(message);
  }

  res.sendStatus(200);
});

const handleCommand = (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  if (text === "/start") {
    sendGameMessage(chatId);
  }
};

const sendGameMessage = async (chatId) => {
  const gameShortName = "your_game_short_name";
  const url = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendGame`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      game_short_name: gameShortName,
      reply_markup: {
        inline_keyboard: [[{ text: "Play", callback_game: {} }]],
      },
    }),
  });

  const data = await response.json();
  console.log(data);
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
