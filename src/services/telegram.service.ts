const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_GROUP_ID;

export async function sendToTelegram(message: string) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  });
}