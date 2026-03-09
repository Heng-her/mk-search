// services/tracker.service.ts
import { sendToTelegram } from "./telegram.service";

const chatId = import.meta.env.VITE_TELEGRAM_GROUP_ID_CONTACT;

export async function trackUser(toPath: string) {
  try {
    const domain = window.location.origin;
    const userAgent = navigator.userAgent;
    
    // Simple Device & OS Detection
    let deviceType = "Desktop";
    if (/Mobi|Android|iPhone/i.test(userAgent)) deviceType = "Mobile";
    
    let os = "Unknown OS";
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    else if (userAgent.indexOf("X11") !== -1) os = "Linux";
    else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (/Android/.test(userAgent)) os = "Android";
    else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";

    const message = `
<b>🌍 New Route Access</b>
━━━━━━━━━━━━━━━━━━
🌐 <b>Domain:</b> ${domain}
📄 <b>Route:</b> <code>${toPath}</code>
📱 <b>Device:</b> ${deviceType} (${os})
⏰ <b>Time:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━
    `;

    // Fire and forget (don't await so the UI doesn't lag)
    sendToTelegram(message, chatId);
  } catch (error) {
    console.error("Tracking failed:", error);
  }
}