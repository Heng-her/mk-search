import { sendToTelegram } from "./telegram.service";

export async function trackUser() {
  try {
    const currentUrl = window.location.href;
    const domain = window.location.origin;
    const route = window.location.pathname; // /about or /

    const message = `
<b>🌍 New Visitor</b>
🌐 Domain: <a href="${domain}">${domain}</a>
📄 Route: <a href="${currentUrl}">${route}</a>
`;

    await sendToTelegram(message);
  } catch (error) {
    console.error("Tracking failed:", error);
  }
}
