// const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
// services/telegram.service.ts
export async function sendToTelegram(message: string, chat_id: string) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  
  // ❌ BUG FIX: Removed extra spaces in URL
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}

export const program = import.meta.env.VITE_TELEGRAM_GROUP_ID_CONTACT;