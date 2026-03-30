<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Motion } from "@motionone/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useResponsive } from "../composables/responsive";
import { useI18n } from "../composables/useI18n";
import { useProfileData } from "../data/profile";
// @ts-ignore
import ResponsePopup from "@/components/ResponsePopup.vue";
// @ts-ignore
import ImagePopup from "@/components/ImagePopup.vue";
const modules = [Pagination];
const { t } = useI18n();
const { skills, projects, experience, contactInfo, infor } = useProfileData();
const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});
import { program, sendToTelegram } from "../services/telegram.service";
const showModal = ref(false);
const showImageModal = ref(false);
const modalType = ref<"success" | "error">("success");
const modalTitle = ref("");
const modalMessage = ref("");
async function handleSubmit() {
  // Basic validation
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.subject ||
    !form.value.message
  ) {
    modalType.value = "error";
    modalTitle.value = "Missing Information";
    modalMessage.value = "Please fill in all required fields.";
    showModal.value = true;
    return;
  }

  try {
    const message = `
<b>📩 New Contact Form Submission</b>
<pre>
Name: ${form.value.name}
Email: ${form.value.email}
Subject: ${form.value.subject}
</pre>
📝 Message:
${form.value.message}
`;

    await sendToTelegram(message, program);

    modalType.value = "success";
    modalTitle.value = "Message Sent!";
    modalMessage.value = "Thank you! I'll get back to you soon.";
    showModal.value = true;

    // Reset form
    form.value = { name: "", email: "", subject: "", message: "" };
  } catch (error) {
    console.error("Send error:", error);
    modalType.value = "error";
    modalTitle.value = "Failed to Send";
    modalMessage.value = "Something went wrong. Please try again later.";
    showModal.value = true;
  }
}
const visible = ref(false);
const bottomSentinel = ref<HTMLElement | null>(null);
const hasShownModal = ref(false);

const openLink = (url: string | URL | undefined) => {
  window.open(url, "_blank");
};
const { isMobile } = useResponsive();
const { currentLocale } = useI18n();

// 🔹 Intersection Observer logic
let observer: IntersectionObserver | null = null;

const initObserver = () => {
  // Disconnect existing observer if any
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer?.observe(el));
};

onMounted(() => {
  setTimeout(() => (visible.value = true), 100);
  
  // Bottom scroll observer
  const bottomObserver = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && !hasShownModal.value) {
      showImageModal.value = true;
      hasShownModal.value = true;
      bottomObserver.disconnect();
    }
  }, { threshold: 0.1 });

  if (bottomSentinel.value) {
    bottomObserver.observe(bottomSentinel.value);
  }

  initObserver();
});

// 🔹 Re-run observer when locale changes to handle re-rendered elements
import { watch, nextTick } from "vue";
watch(currentLocale, async () => {
  await nextTick();
  initObserver();
});

const handleEmailInput = (e: any) => {
  let value = e.target.value;

  // Remove all @ first
  value = value.replace(/@/g, "");

  // Add @ at the beginning if not empty
  form.value.email = value ? "@" + value : "";
};
</script>

<template>
  <div class="space-y-24">
    <!-- ──────────────── HERO ──────────────── -->
    <section
      class="relative flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 h-screen overflow-hidden"
    >
      <!-- Video Background -->
      <video
        autoplay
        loop
        muted
        playsinline
        class="fixed top-0 left-0 w-screen h-screen object-cover z-[-1]"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <!-- Animated gradient orbs -->
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />

      <!-- Avatar -->
      <Motion
        :initial="{ opacity: 0, y: -40, scale: 0.8 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.7, easing: [0.22, 1, 0.36, 1] }"
      >
        <div class="relative inline-block avatar-wrapper">
          <div class="avatar-ring" />
          <img
            src="/profile.jpg"
            alt="Her Bunheng - Full Stack Developer Profile"
            class="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full object-cover border-2 border-white/20"
          />
          <!-- Status dot -->
          <span class="status-dot" />
        </div>
      </Motion>

      <!-- Headline -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.15, easing: [0.22, 1, 0.36, 1] }"
      >
        <div class="space-y-3 relative">
          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none"
          >
            {{ t("home.hero.greeting") }}
            <span class="gradient-text">{{ t("home.hero.name") }}</span>
          </h1>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-400">
            {{ t("home.hero.role") }}
          </h2>
          <div class="flex justify-center">
            <p
              class="typing-effect text-sm sm:text-base md:text-lg font-semibold text-purple-400"
            >
              {{ t("home.hero.stack") }}
            </p>
          </div>
          <p
            class="max-w-md sm:max-w-lg md:max-w-xl mx-auto text-slate-400 leading-relaxed text-sm sm:text-base pt-1"
          >
            {{ infor.infomation }}
          </p>
        </div>
      </Motion>

      <!-- CTA Buttons -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.3, easing: [0.22, 1, 0.36, 1] }"
      >
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a href="#projects" class="cta-primary">
            {{ t("home.hero.viewProjects") }}
            <i class="fa-solid fa-arrow-right text-xs ml-1" />
          </a>
          <a href="#contact" class="cta-ghost">
            {{ t("home.hero.contactMe") }}
          </a>
        </div>
      </Motion>

      <!-- Scroll indicator -->
      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 1 }"
      >
        <div
          class="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator"
        >
          <div class="scroll-dot" />
        </div>
      </Motion>
    </section>

    <!-- ──────────────── ABOUT ──────────────── -->
    <section
      id="about"
      class="grid md:grid-cols-5 gap-8 sm:gap-12 items-center reveal fade-up"
    >
      <!-- Image -->
      <div class="relative group order-1 md:order-2 md:col-span-2">
        <div class="img-glow" />
        <div
          class="relative aspect-square rounded-2xl overflow-hidden glass-card border border-white/10 img-hover-wrapper"
        >
          <img
            src="/48hr.jpg"
            alt="Alex portrait"
            class="w-full h-full object-cover img-zoom"
          />
          <!-- Overlay shimmer -->
          <div class="img-shimmer" />
        </div>
      </div>

      <!-- Text -->
      <div class="space-y-4 sm:space-y-6 order-2 md:order-1 md:col-span-3">
        <h2 class="text-3xl sm:text-4xl font-black flex items-center gap-3">
          <span class="icon-badge"
            ><i class="fa-solid fa-user text-purple-400"
          /></span>
          {{ t("home.about.title") }}
        </h2>
        <p class="text-slate-400 leading-relaxed text-sm sm:text-base">
          {{ t("home.about.p1") }}
        </p>
        <p class="text-slate-400 leading-relaxed text-sm sm:text-base">
          {{ t("home.about.p2") }}
        </p>
        <button class="cv-btn">
          <i class="fa-solid fa-download text-purple-400" />
          {{ t("home.about.downloadCV") }}
        </button>
      </div>
    </section>

    <!-- ──────────────── SKILLS ──────────────── -->
    <section id="skills" class="space-y-12">
      <div class="text-center space-y-2 reveal fade-up">
        <h2 class="text-3xl sm:text-4xl font-black">
          {{ t("home.skills.title") }}
        </h2>
        <p class="text-slate-500 text-sm sm:text-base">
          {{ t("home.skills.subtitle") }}
        </p>
      </div>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <div
          v-for="(skill, i) in skills"
          :key="i"
          class="skill-card reveal fade-up glass-card border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          <i
            :class="skill.icon"
            class="text-3xl sm:text-4xl block skill-icon"
          />
          <h3 class="font-bold text-lg sm:text-xl">{{ skill.title }}</h3>
          <ul class="space-y-2 text-slate-400 text-xs sm:text-sm">
            <li
              v-for="item in skill.items"
              :key="item"
              class="flex items-center gap-2"
            >
              <div
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="skill.dotColor"
              />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ──────────────── PROJECTS ──────────────── -->
    <section id="projects" class="space-y-12">
      <div class="flex justify-between items-end reveal fade-up">
        <div class="space-y-2">
          <h2 class="text-3xl sm:text-4xl font-black">
            {{ t("home.projects.title") }}
          </h2>
          <p class="text-slate-500 text-sm sm:text-base">
            {{ t("home.projects.subtitle") }}
          </p>
        </div>
      </div>

      <!-- Mobile: Swiper -->
      <Swiper
        v-if="isMobile"
        :modules="modules"
        :slides-per-view="1.2"
        :space-between="20"
        :pagination="{ clickable: true }"
      >
        <SwiperSlide v-for="(project, i) in projects" :key="i">
          <div
            class="project-card glass-card border border-white/10 rounded-2xl overflow-hidden flex flex-col"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="project.img"
                :alt="project.title"
                class="w-full h-full object-cover project-img"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"
              />
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div class="space-y-3">
                <h3 class="text-lg font-bold">{{ project.title }}</h3>
                <p class="text-slate-500 text-sm line-clamp-2">
                  {{ project.desc }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{
                    tag
                  }}</span>
                </div>
              </div>
              <div class="flex gap-3 pt-2">
                <button
                  @click="openLink(project.link)"
                  class="flex-1 btn-primary text-xs py-2"
                  :disabled="project.disabled"
                >
                  {{ t("home.projects.demo") }}
                </button>
                <button class="flex-1 btn-ghost text-xs">
                  {{ t("home.projects.github") }}
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Desktop: Grid -->
      <div v-if="!isMobile" class="md:grid md:grid-cols-2 gap-8">
        <div
          v-for="(project, i) in projects"
          :key="i"
          class="project-card reveal fade-up glass-card border border-white/10 rounded-2xl overflow-hidden flex flex-col"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <div class="relative h-52 overflow-hidden">
            <img
              :src="project.img"
              :alt="project.title"
              class="w-full h-full object-cover project-img"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"
            />
            <div class="project-overlay" />
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <h3 class="text-xl font-bold">{{ project.title }}</h3>
              <p class="text-slate-500 text-sm line-clamp-2">
                {{ project.desc }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{
                  tag
                }}</span>
              </div>
            </div>
            <div class="flex gap-3 pt-2">
              <button
                @click="openLink(project.link)"
                class="flex-1 btn-primary py-2 text-xs font-bold"
                :disabled="project.disabled"
              >
                {{ t("home.projects.demo") }}
              </button>
              <button class="flex-1 btn-ghost py-2 text-xs font-bold">
                {{ t("home.projects.github") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────── EXPERIENCE ──────────────── -->
    <section class="space-y-12">
      <h2 class="text-3xl sm:text-4xl font-black text-center reveal fade-up">
        {{ t("home.experience.title") }}
      </h2>

      <div
        class="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l border-white/10 space-y-12"
      >
        <div
          v-for="(exp, i) in experience"
          :key="i"
          class="relative reveal fade-left"
          :style="{ transitionDelay: `${i * 120}ms` }"
        >
          <!-- Timeline dot with pulse for current -->
          <div
            class="timeline-dot"
            :class="
              exp.current ? 'timeline-dot-active' : 'timeline-dot-inactive'
            "
          >
            <span v-if="exp.current" class="timeline-pulse" />
          </div>

          <div
            class="exp-card glass-card border border-white/10 hover:border-purple-500/30 p-5 sm:p-6 rounded-2xl space-y-2"
          >
            <span
              class="text-xs sm:text-sm font-bold"
              :class="exp.current ? 'text-purple-400' : 'text-slate-500'"
            >
              {{ exp.period }}
            </span>
            <h3 class="text-lg sm:text-xl font-bold">{{ exp.role }}</h3>
            <p class="text-blue-400 font-semibold text-xs sm:text-sm">
              {{ exp.company }}
            </p>
            <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {{ exp.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────── CONTACT ──────────────── -->
    <section
      id="contact"
      class="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10"
    >
      <!-- Info -->
      <div class="space-y-8 reveal fade-up">
        <div class="space-y-3">
          <h2 class="text-4xl font-black">{{ t("home.contact.title") }}</h2>
          <p class="text-slate-500 leading-relaxed">
            {{ t("home.contact.subtitle") }}
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-for="(info, i) in contactInfo"
            :key="i"
            class="contact-info-item reveal fade-left"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="contact-icon-box">
              <i :class="info.icon" />
            </div>
            <div>
              <p
                class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
              >
                {{ info.label }}
              </p>
              <p class="font-bold">{{ info.value }}</p>
            </div>
          </div>
        </div>
        <!-- Socials -->
        <div class="flex gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            v-for="social in [
              {
                icon: 'fa-brands fa-github',
                href: 'https://www.github.com/Heng-her',
              },
              {
                icon: 'fa-brands fa-linkedin-in',
                href: 'https://www.linkedin.com/in/bun-heng-107340361',
              },
              {
                icon: 'fa-brands fa-instagram',
                href: 'https://www.instagram.com/caterfly.buy',
              },
            ]"
            :key="social.icon"
            :href="social.href"
            class="social-btn"
          >
            <i :class="social.icon" />
          </a>
        </div>
      </div>

      <!-- Form -->
      <div
        class="glass-card border border-white/10 p-8 rounded-2xl shadow-2xl reveal fade-up"
        style="transition-delay: 150ms"
      >
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="input-label">{{
                t("home.contact.form.name")
              }}</label>
              <input
                type="text"
                :placeholder="t('home.contact.form.placeholders.name')"
                class="input-field"
                v-model="form.name"
              />
            </div>
            <div class="space-y-2">
              <label class="input-label">{{
                t("home.contact.form.email")
              }}</label>
              <input
                type="text"
                :placeholder="t('home.contact.form.placeholders.email')"
                class="input-field"
                v-model="form.email"
                @input="handleEmailInput"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label class="input-label">{{
              t("home.contact.form.subject")
            }}</label>
            <select v-model="form.subject" class="input-field appearance-none">
              <option disabled value="">
                {{ t("home.contact.form.subjectOptions.a") }}
              </option>
              <option class="text-black">
                {{ t("home.contact.form.subjectOptions.collab") }}
              </option>
              <option class="text-black">
                {{ t("home.contact.form.subjectOptions.job") }}
              </option>
              <option class="text-black">
                {{ t("home.contact.form.subjectOptions.general") }}
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="input-label">{{
              t("home.contact.form.message")
            }}</label>
            <textarea
              v-model="form.message"
              :placeholder="t('home.contact.form.placeholders.message')"
              rows="4"
              class="input-field resize-none"
            />
          </div>
          <button type="submit" class="submit-btn">
            <i class="fa-solid fa-paper-plane" />
            {{ t("home.contact.form.send") }}
          </button>
        </form>
      </div>
    </section>

    <!-- Sentinel for scroll-to-bottom detection -->
    <div ref="bottomSentinel" class="h-4 w-full" />
  </div>

  <ResponsePopup
    v-model="showModal"
    :type="modalType"
    :title="modalTitle"
    :message="modalMessage"
    confirm-text="Got it!"
    @confirm="console.log('Modal confirmed')"
  />

  <ImagePopup
    v-model="showImageModal"
    image-src="/bunheng-work.jpg"
    title="Think Before choosing a developer Skill."
  />
</template>

<style scoped>
/* ═══════════════════════════════════════
   SCROLL REVEAL SYSTEM
═══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.in-view {
  opacity: 1;
  transform: none !important;
}
.fade-up {
  transform: translateY(48px);
}
.fade-left {
  transform: translateX(-32px);
}

/* ═══════════════════════════════════════
   HERO ANIMATED ORBS
═══════════════════════════════════════ */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
  animation: float 8s ease-in-out infinite;
}
.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(139, 37, 244, 0.18),
    transparent 70%
  );
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}
.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.15),
    transparent 70%
  );
  top: 30%;
  right: 10%;
  animation-delay: -3s;
}
.orb-3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 70%);
  bottom: 20%;
  left: 30%;
  animation-delay: -5s;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  33% {
    transform: translateY(-30px) scale(1.05);
  }
  66% {
    transform: translateY(20px) scale(0.97);
  }
}

/* ═══════════════════════════════════════
   AVATAR
═══════════════════════════════════════ */
.avatar-wrapper {
  position: relative;
}
.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #8c25f4, #3b82f6, #ec4899, #8c25f4);
  animation: spin 4s linear infinite;
  opacity: 0.8;
  filter: blur(2px);
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.status-dot {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 14px;
  height: 14px;
  background: #22c55e;
  border: 2px solid #09090b;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse-green 2s infinite;
}
@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

/* ═══════════════════════════════════════
   SCROLL INDICATOR
═══════════════════════════════════════ */
.scroll-indicator {
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 13px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
}
.scroll-dot {
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  animation: scroll-bounce 2s ease-in-out infinite;
}
@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(12px);
    opacity: 0.2;
  }
}

/* ═══════════════════════════════════════
   GLASS & SHARED
═══════════════════════════════════════ */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
}

.gradient-text {
  background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ═══════════════════════════════════════
   CTA BUTTONS
═══════════════════════════════════════ */
.cta-primary {
  background: linear-gradient(135deg, #8c25f4, #3b82f6);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 0 24px rgba(139, 37, 244, 0.35);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.cta-primary:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 0 40px rgba(139, 37, 244, 0.5);
}
.cta-ghost {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: inherit;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.875rem;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;
}
.cta-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(139, 37, 244, 0.4);
  transform: translateY(-2px);
}

/* ═══════════════════════════════════════
   ABOUT IMAGE
═══════════════════════════════════════ */
.img-glow {
  position: absolute;
  inset: -16px;
  background: linear-gradient(
    135deg,
    rgba(139, 37, 244, 0.2),
    rgba(59, 130, 246, 0.2)
  );
  border-radius: 1.5rem;
  filter: blur(32px);
  opacity: 0.5;
  transition: opacity 0.4s;
}
.img-hover-wrapper:hover .img-glow {
  opacity: 0.8;
}
.img-zoom {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.img-hover-wrapper:hover .img-zoom {
  transform: scale(1.06);
}
.img-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 70%
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* ═══════════════════════════════════════
   ICON BADGE
═══════════════════════════════════════ */
.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(139, 37, 244, 0.15);
  border: 1px solid rgba(139, 37, 244, 0.3);
  border-radius: 0.75rem;
}

/* ═══════════════════════════════════════
   CV BUTTON
═══════════════════════════════════════ */
.cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 37, 244, 0.3);
  backdrop-filter: blur(10px);
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;
}
.cv-btn:hover {
  background: rgba(139, 37, 244, 0.15);
  border-color: rgba(139, 37, 244, 0.6);
  transform: translateY(-2px);
}

/* ═══════════════════════════════════════
   SKILL CARDS
═══════════════════════════════════════ */
.skill-card {
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s,
    border-color 0.35s;
  cursor: default;
}
.skill-card:hover {
  transform: translateY(-8px) rotate(-0.5deg);
  border-color: rgba(139, 37, 244, 0.5) !important;
  box-shadow: 0 20px 40px rgba(139, 37, 244, 0.12);
}
.skill-icon {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.skill-card:hover .skill-icon {
  transform: scale(1.2) rotate(5deg);
}

/* ═══════════════════════════════════════
   PROJECT CARDS
═══════════════════════════════════════ */
.project-card {
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s;
}
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px rgba(139, 37, 244, 0.15);
}
.project-img {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.project-card:hover .project-img {
  transform: scale(1.08);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(139, 37, 244, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.4s;
}
.project-card:hover .project-overlay {
  opacity: 1;
}

.tag {
  padding: 0.15rem 0.5rem;
  border-radius: 0.375rem;
  background: rgba(139, 37, 244, 0.3);
  color: #d8b4fe;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ═══════════════════════════════════════
   BUTTONS
═══════════════════════════════════════ */
.btn-primary {
  background: linear-gradient(135deg, #8c25f4, #3b82f6);
  color: white;
  border-radius: 0.5rem;
  font-weight: 700;
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: scale(1.02);
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-ghost {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  font-weight: 700;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.btn-ghost:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

/* ═══════════════════════════════════════
   EXPERIENCE TIMELINE
═══════════════════════════════════════ */
.timeline-dot {
  position: absolute;
  left: -2.25rem;
  top: 1.25rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid #09090b;
}
.timeline-dot-active {
  background: linear-gradient(135deg, #8c25f4, #3b82f6);
}
.timeline-dot-inactive {
  background: #334155;
}
.timeline-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(139, 37, 244, 0.4);
  animation: timeline-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes timeline-ping {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}
.exp-card {
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s;
}
.exp-card:hover {
  transform: translateX(8px);
}

/* ═══════════════════════════════════════
   CONTACT
═══════════════════════════════════════ */
.contact-info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.contact-icon-box {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a855f7;
  transition:
    background 0.3s,
    color 0.3s,
    transform 0.3s;
}
.contact-info-item:hover .contact-icon-box {
  background: linear-gradient(135deg, #8c25f4, #3b82f6);
  color: white;
  transform: scale(1.1) rotate(-4deg);
}

.social-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition:
    border-color 0.2s,
    color 0.2s,
    transform 0.3s,
    background 0.3s;
}
.social-btn:hover {
  border-color: rgba(139, 37, 244, 0.6);
  color: #a855f7;
  transform: translateY(-3px) rotate(8deg);
  background: rgba(139, 37, 244, 0.1);
}

/* ═══════════════════════════════════════
   FORM
═══════════════════════════════════════ */
.input-label {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  display: block;
}
.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: inherit;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background 0.2s;
}
.input-field:focus {
  border-color: rgba(139, 37, 244, 0.5);
  box-shadow: 0 0 0 3px rgba(139, 37, 244, 0.12);
  background: rgba(139, 37, 244, 0.04);
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #8c25f4, #3b82f6);
  color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 24px rgba(139, 37, 244, 0.3);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}
.submit-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.submit-btn:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 16px 40px rgba(139, 37, 244, 0.45);
}
.submit-btn:hover::before {
  opacity: 1;
}
.submit-btn:active {
  transform: scale(0.98);
}

/* ═══════════════════════════════════════
   TYPING ANIMATION
═══════════════════════════════════════ */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blink {
  50% {
    border-color: transparent;
  }
}
.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #a855f7;
  width: 0;
  animation:
    typing 3.5s steps(40, end) forwards,
    blink 0.75s step-end infinite;
}
</style>
