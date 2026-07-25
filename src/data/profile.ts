import { computed } from "vue";
import { useI18n } from "../composables/useI18n";
import { profileData } from "./i18n-profile";
import type { ContactInfo, Experience, Project, Skill } from "../types/profile";

// Original static data that doesn't need translation
const staticData = {
  infor: {
    id: 1,
    nickname: "Heng Crypten",
    first_name: "Her",
    last_name: "Bunheng",
    full_name: "Her Bunheng",
    age: 22,
  },
  contactInfo: [
    {
      icon: "fa-solid fa-envelope",
      value: "bunhengher@gmail.com",
      label: "",
    },
    {
      icon: "fa-solid fa-location-dot",
      value: "Siem Reap / Phnom Penh, Cambodia",
      label: "",
    },
    {
      icon: "fa-brands fa-github",
      value: "github.com/Heng-her",
      label: "",
    },
  ],
  projects: [
    {
      tags: [
        "Nuxt",
        "Tailwindcss",
        "Responsive Web",
        "SEO",
        "Vercel",
        "Cloudflare",
      ],
      img: "/homestay.png",
      disabled: false,
      link: "https://angkor-homestay.com",
    },
    {
      tags: ["Vue 3", "Telegram Bot API", "Express", "primevue"],
      img: "/attendance.png",
      disabled: false,
      link: "https://att-admin-stage.1dev.biz",
    },
    {
      tags: [
        "Vue",
        "primevue",
        "Responsive Web",
        "Cloudflare",
        "Cloudflare D1",
        "Cloudflare R2",
      ],
      img: "/school.png",
      disabled: false,
      link: "https://school-billing.system-codex.workers.dev",
    },
    {
      tags: ["Vue 3", "Express", "PostgreSQL", "Prisma", "Capacitor"],
      img: "/quiz.jpg",
      disabled: true,
    },
    {
      tags: ["React Native", "Expo", "Supabase", "TypeScript"],
      img: "/mobileapp.jpg",
      disabled: false,
      link: "https://www.facebook.com/share/v/1GncB91YrA/?mibextid=wwXIfr",
    },
    {
      tags: ["Node.js", "Telegram Bot API", "Express"],
      img: "/telegram.jpg",
      disabled: true,
    },
    {
      tags: ["React", "Telegram Bot API", "Mongodb"],
      img: "/soft-launch.png",
      disabled: false,
      link: "https://48hr-soft-launch.vercel.app",
    },
  ],
};

export function useProfileData() {
  const { currentLocale } = useI18n();

  const data = computed(() => {
    return profileData[currentLocale.value] || profileData.en;
  });

  const skills = computed<Skill[]>(() => data.value?.skills || []);

  const projects = computed<Project[]>(() =>
    (data.value?.projects || []).map((p, i) => ({
      ...staticData.projects[i],
      ...p,
    })),
  );

  const experience = computed<Experience[]>(() => data.value?.experience || []);

  const contactInfo = computed<ContactInfo[]>(() =>
    (data.value?.contactInfo || []).map((c, i) => {
      const merged = {
        ...c,
        ...staticData.contactInfo[i],
      };
      return {
        ...merged,
        icon: merged.icon || "",
        value: merged.value || "",
      };
    }),
  );

  const infor = computed(() => ({
    ...staticData.infor,
    infomation: data.value?.infor?.information,
  }));

  return {
    skills,
    projects,
    experience,
    contactInfo,
    infor,
  };
}
