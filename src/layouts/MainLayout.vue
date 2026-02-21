<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(true);
const scrollProgress = ref(0);

function toggleTheme(): void {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  document.documentElement.classList.add("dark");

  window.addEventListener("scroll", () => {
    const el = document.documentElement;
    const total = el.scrollHeight - el.clientHeight;
    scrollProgress.value =
      total > 0 ? Math.min(100, Math.round((el.scrollTop / total) * 100)) : 0;
  });
});
</script>

<template>
  <div :class="isDark ? 'dark' : ''">
    <div
      class="bg-[#f7f5f8] dark:bg-[#09090b] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 relative font-['Space_Grotesk',sans-serif]"
    >
      <!-- Decorative border frame -->
      <div
        class="fixed inset-3 pointer-events-none z-50 rounded-2xl border border-purple-500/20 dark:border-purple-400/15 shadow-[0_0_80px_rgba(139,37,244,0.05)]"
      />

      <!-- Scroll Progress Bar -->
      <div
        class="fixed top-3 left-3 right-3 h-0.5 z-100 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden"
      >
        <div
          class="h-full bg-linear-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-150"
          :style="{ width: `${scrollProgress}%` }"
        />
      </div>

      <!-- ───── Header ───── -->
      <header class="fixed top-5 left-6 right-6 z-50">
        <nav
          class="glass border border-white/10 rounded-2xl px-6 py-3.5 flex justify-between items-center shadow-xl"
        >
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-terminal text-purple-500 text-lg" />
            <span class="font-black text-lg tracking-tight">DEV.ALEX</span>
          </div>

          <!-- Desktop Nav Links -->
          <div class="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a
              href="#about"
              class="hover:text-purple-500 transition-colors duration-200"
              >About</a
            >
            <a
              href="#skills"
              class="hover:text-purple-500 transition-colors duration-200"
              >Skills</a
            >
            <a
              href="#projects"
              class="hover:text-purple-500 transition-colors duration-200"
              >Projects</a
            >
            <a
              href="#contact"
              class="hover:text-purple-500 transition-colors duration-200"
              >Contact</a
            >
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-3">
            <!-- Language Switcher -->
            <div class="relative group">
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                <i class="fa-solid fa-globe text-purple-500 text-xs" />
                EN
                <i class="fa-solid fa-chevron-down text-[10px] opacity-50" />
              </button>
              <div
                class="absolute right-0 top-full mt-2 w-36 glass rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden shadow-xl border border-white/10 z-50"
              >
                <a
                  class="flex items-center gap-2 px-4 py-2.5 hover:bg-purple-500/20 text-xs font-medium transition-colors"
                  href="#"
                  >🇺🇸 English</a
                >
                <a
                  class="flex items-center gap-2 px-4 py-2.5 hover:bg-purple-500/20 text-xs font-medium transition-colors"
                  href="#"
                  >🇰🇭 Khmer</a
                >
                <a
                  class="flex items-center gap-2 px-4 py-2.5 hover:bg-purple-500/20 text-xs font-medium transition-colors"
                  href="#"
                  >🇨🇳 Chinese</a
                >
              </div>
            </div>

            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="w-9 h-9 flex items-center justify-center rounded-xl glass border border-white/10 hover:border-purple-500/50 transition-all duration-200"
            >
              <i
                v-if="isDark"
                class="fa-solid fa-sun text-yellow-400 text-sm"
              />
              <i v-else class="fa-solid fa-moon text-purple-500 text-sm" />
            </button>
          </div>
        </nav>
      </header>

      <!-- ───── Page Content ───── -->
      <main class="pt-28 pb-16 px-6 max-w-6xl mx-auto space-y-32">
        <router-view />
      </main>

      <!-- ───── Footer ───── -->
      <footer class="glass border-t border-white/5 py-12 text-center space-y-4">
        <div class="flex items-center justify-center gap-2">
          <i class="fa-solid fa-terminal text-purple-500" />
          <span class="font-black text-lg">DEV.ALEX</span>
        </div>
        <p class="text-slate-500 text-sm">
          © 2025 Alex. Built with Vue 3, Tailwind &amp; Passion.
        </p>
        <div
          class="flex justify-center gap-6 text-slate-400 text-xs font-semibold"
        >
          <a class="hover:text-purple-500 transition-colors" href="#"
            >Privacy Policy</a
          >
          <a class="hover:text-purple-500 transition-colors" href="#">Terms</a>
          <a class="hover:text-purple-500 transition-colors" href="#"
            >Sitemap</a
          >
        </div>
      </footer>

      <!-- Back to Top FAB -->
      <button
        @click="scrollToTop"
        class="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-linear-to-br from-purple-600 to-blue-500 text-white shadow-2xl shadow-purple-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <i class="fa-solid fa-arrow-up text-sm" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
}
</style>
