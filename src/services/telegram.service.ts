// const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

export async function sendToTelegram(message: string, chat_id: string) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id,
      text: message,
      parse_mode: "HTML",
    }),
  });
}

export const program = import.meta.env.VITE_TELEGRAM_GROUP_ID_CONTACT;