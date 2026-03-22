// services/tracker.service.ts
import { UAParser } from "ua-parser-js";
import { sendToTelegram, sendLocationToTelegram } from "./telegram.service";

const chatId = import.meta.env.VITE_TELEGRAM_GROUP_ID_CONTACT;

interface IPDetails {
  ip: string;
  isp: string;
  connectionType: string;
  location: string;
}

// 🔹 Fetch public IP + ISP info (using free ipapi.co)
async function fetchIPInfo(): Promise<IPDetails> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      cache: "no-store",
      signal: AbortSignal.timeout(4000), // 4s timeout
    });

    if (!response.ok) throw new Error("IP fetch failed");

    const data = await response.json();

    // ISP & Connection Type Heuristics
    let connectionType = "Unknown";
    const isp = data.org || data.isp || "Unknown ISP";

    const mobileCarriers = /mobile|cellular|lte|5g|4g|3g|gsm|cdma|verizon|att|tmobile|sprint|telkomsel|xl|indosat|smartfren|metfone|cellcard|smart/i;
    const wifiKeywords = /fiber|cable|dsl|broadband|home|wifi|unifi|indihome|online|viettel|fpt|vnpt/i;

    if (mobileCarriers.test(isp)) {
      connectionType = "📱 Mobile Data";
    } else if (wifiKeywords.test(isp)) {
      connectionType = "🏠 Home/Office WiFi";
    } else if (/cloud|datacenter|server|aws|google|azure/i.test(isp)) {
      connectionType = "🖥️ Datacenter/VPN";
    }

    const location = `${data.city || ""}${data.city && data.region ? ", " : ""}${data.region || ""}${data.country_name ? ` (${data.country_name})` : ""}`.trim();

    return {
      ip: data.ip || "Hidden",
      isp: isp,
      connectionType,
      location: location || "Unknown",
    };
  } catch (error) {
    console.warn("IP detection failed:", error);
    return { 
      ip: "Hidden", 
      isp: "Unknown", 
      connectionType: "Unknown", 
      location: "Unknown" 
    };
  }
}

// 🔹 Detect connection type via Network Information API
function getBrowserConnectionType(): string | null {
  // @ts-ignore
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return null;

  const type = connection.type;
  const effectiveType = connection.effectiveType;

  if (type === "wifi") return "🏠 WiFi (Browser API)";
  if (type === "cellular") return `📱 Mobile Data (${effectiveType?.toUpperCase() || "Unknown"})`;
  if (type === "ethernet") return "🔌 Wired Ethernet";
  
  // SSID/WiFi name is NOT accessible in web browsers for security reasons.
  // We can only detect the type of connection.
  return null;
}

export async function trackUser(
  toPath: string,
  latitude?: number,
  longitude?: number,
) {
  try {
    const domain = window.location.origin;

    const parser = new UAParser(navigator.userAgent);
    const result = parser.getResult();

    const deviceType = (result.device.type || "desktop").toUpperCase();
    const os = `${result.os.name || "Unknown"} ${result.os.version || ""}`.trim();
    const deviceBrand = result.device.vendor || "Unknown";
    const deviceModel = result.device.model || "";
    const browser = `${result.browser.name || ""} ${result.browser.version || ""}`.trim();

    // 🌐 Get IP & Location info
    const ipInfo = await fetchIPInfo();

    // 📡 Get browser-level connection type
    const browserConnection = getBrowserConnectionType();
    const finalConnectionType = browserConnection || ipInfo.connectionType;

    const message = `
<b>🌍 New Visitor Detected</b>
━━━━━━━━━━━━━━━━━━
🌐 <b>Domain:</b> <code>${domain}</code>
📄 <b>Route:</b> <code>${toPath}</code>
📱 <b>Device:</b> ${deviceType}
🖥️ <b>OS:</b> ${os}
🏷️ <b>Brand:</b> ${deviceBrand} ${deviceModel ? `- ${deviceModel}` : ""}
🌐 <b>Browser:</b> ${browser}
🔹 <b>IP Address:</b> <code>${ipInfo.ip}</code>
📡 <b>Connection:</b> ${finalConnectionType}
🏢 <b>ISP:</b> ${ipInfo.isp}
📍 <b>Location:</b> ${ipInfo.location}
📌 <b>Coordinates:</b> ${latitude ? `<code>${latitude}, ${longitude}</code>` : "Not available"}
⏰ <b>Time:</b> ${new Date().toLocaleString("en-GB")}
━━━━━━━━━━━━━━━━━━
    `.trim();

    await sendToTelegram(message, chatId);

    // 📍 Send a separate map pin if coordinates are available
    if (latitude && longitude) {
      await sendLocationToTelegram(latitude, longitude, chatId);
    }
  } catch (error) {
    console.error("Tracking failed:", error);
  }
}

