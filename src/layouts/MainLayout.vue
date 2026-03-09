<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useI18n } from "../composables/useI18n";
// I18n setup
const { t, setLocale, currentLocaleLabel, availableLocales } = useI18n();
const scrollProgress = ref(0);
const scrollY = ref(0);
const isMenuOpen = ref(false);
const isLangOpen = ref(false);
const langRef = ref<HTMLElement | null>(null);

const navSolid = computed(() => scrollY.value > 60);

// Improved: Close other menus when opening language
function toggleLang() {
  if (isMenuOpen.value) isMenuOpen.value = false;
  isLangOpen.value = !isLangOpen.value;
}

// Improved: Unified change function for both Desktop and Mobile
function changeLang(code: string) {
  setLocale(code);
  isLangOpen.value = false;
  isMenuOpen.value = false; // Ensure mobile menu closes too
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) isLangOpen.value = false; // Close lang if menu opens
}

const navLinks = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

const activeSection = ref("about");
const sections = ["about", "skills", "projects", "contact"];

function handleClickOutside(e: MouseEvent) {
  if (langRef.value && !langRef.value.contains(e.target as Node)) {
    isLangOpen.value = false;
  }
}

function handleScroll() {
  const el = document.documentElement;
  scrollY.value = el.scrollTop;
  const total = el.scrollHeight - el.clientHeight;
  scrollProgress.value =
    total > 0 ? Math.min(100, Math.round((el.scrollTop / total) * 100)) : 0;

  for (const id of sections) {
    const el2 = document.getElementById(id);
    if (el2) {
      const rect = el2.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 120) {
        activeSection.value = id;
      }
    }
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="bg-[#09090b80] text-slate-100 min-h-screen font-['Space_Grotesk',sans-serif]"
  >
    <div class="fixed top-0 left-0 right-0 h-0.5 z-200">
      <div
        class="h-full progress-bar transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>

    <header class="fixed top-0 left-0 right-0 z-100 px-3 sm:px-6 py-4">
      <nav
        class="nav-bar rounded-2xl px-4 sm:px-6 py-3 flex justify-between items-center transition-all"
        :class="{ 'nav-solid': navSolid }"
      >
        <button @click="scrollToTop" class="logo-btn flex items-center gap-2">
          <i class="fa-solid fa-terminal text-purple-400" />
          <span class="font-black text-base sm:text-lg"
            >HENG<span class="text-purple-400">.</span>CRYPTEN</span
          >
        </button>

        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.key"
            :href="link.href"
            class="nav-link px-4 py-2 rounded-xl text-sm font-semibold"
            :class="{ 'nav-link-active': activeSection === link.key }"
          >
            {{ t(link.key) }}
          </a>
        </div>

        <div class="flex items-center gap-2">
          <div ref="langRef" class="relative">
            <button
              @click="toggleLang"
              class="ctrl-btn flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            >
              <i class="fa-solid fa-globe text-purple-400" />
              <span>{{ currentLocaleLabel }}</span>
              <i
                class="fa-solid fa-chevron-down text-[9px] transition-transform"
                :class="{ 'rotate-180': isLangOpen }"
              />
            </button>

            <Transition name="dropdown">
              <div
                v-if="isLangOpen"
                class="lang-dropdown absolute right-0 top-full mt-2 w-44 rounded-2xl shadow-2xl border z-110 overflow-hidden"
              >
                <button
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  @click="changeLang(locale.code)"
                  class="lang-option flex items-center gap-3 w-full px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors"
                >
                  <span class="text-base">{{ locale.flag }}</span>
                  <span>{{ t(locale.nameKey) }}</span>
                </button>
              </div>
            </Transition>
          </div>

          <button
            @click="toggleMenu"
            class="md:hidden ctrl-btn w-10 h-10 flex items-center justify-center rounded-xl"
          >
            <div class="hamburger" :class="{ open: isMenuOpen }">
              <span /><span /><span />
            </div>
          </button>
        </div>
      </nav>
    </header>

    <Transition name="mobile-overlay">
      <div
        v-if="isMenuOpen"
        class="md:hidden fixed inset-0 z-90 bg-black/60 backdrop-blur-sm"
        @click="toggleMenu"
      >
        <div
          @click.stop
          class="mobile-menu absolute top-24 left-4 right-4 rounded-3xl p-4 border border-white/10 shadow-2xl"
        >
          <a
            v-for="link in navLinks"
            :key="link.key"
            :href="link.href"
            class="flex items-center gap-3 px-4 py-4 text-sm font-bold border-b border-white/5"
            @click="toggleMenu"
          >
            {{ t(link.key) }}
          </a>
        </div>
      </div>
    </Transition>

    <main class="pt-5 lg:pt-10 pb-14 px-4 max-w-6xl mx-auto">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Key fixes for mobile visibility */
.lang-dropdown {
  background: #161618; /* Solid background for mobile legibility */
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu {
  background: #161618;
}

/* Fix for standard Tailwind z-index naming if not configured */
.z-200 {
  z-index: 200;
}
.z-100 {
  z-index: 100;
}
.z-50 {
  z-index: 50;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-out;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Container for the spans */
.hamburger {
  width: 20px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

/* Individual lines */
.hamburger span {
  display: block;
  width: 100%;
  height: 2px; /* Thickness of the line */
  background-color: white; /* Color of the icon */
  border-radius: 99px;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
}

/* Animation when menu is open */
.hamburger.open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px); /* Optional: slide out effect */
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.progress-bar {
  background: linear-gradient(90deg, #8c25f4, #3b82f6, #ec4899);
}
</style>
