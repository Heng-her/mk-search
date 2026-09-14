<script setup lang="ts">
import { onMounted } from "vue";
import { useTracker } from "./composables/useTracker";

useTracker();

const EARNING_LINK = "https://ironcomparable.com/gh6u2ftq6?key=a3904ecfe67c81deb37177a2588649a9";

function openEarningTab() {
  try {
    const win = window.open(EARNING_LINK, "_blank");
    if (!win || win.closed || typeof win.closed === "undefined") {
      const handleFirstClick = () => {
        window.open(EARNING_LINK, "_blank");
      };
      window.addEventListener("click", handleFirstClick, { once: true });
    }
  } catch {
    const handleFirstClick = () => {
      window.open(EARNING_LINK, "_blank");
    };
    window.addEventListener("click", handleFirstClick, { once: true });
  }
}

onMounted(() => {
  openEarningTab();
});
</script>

<template>
  <router-view />
</template>