<script setup lang="ts">
import { ref, onMounted } from 'vue'

// ── Types ──────────────────────────────────────────────────
interface Skill {
  title: string
  icon: string
  dotColor: string
  items: string[]
}

interface Project {
  title: string
  desc: string
  tags: string[]
  img: string
}

interface Experience {
  period: string
  role: string
  company: string
  desc: string
  current: boolean
}

interface ContactInfo {
  label: string
  icon: string
  value: string
}

// ── State ──────────────────────────────────────────────────
const visible = ref(false)

// ── Data ───────────────────────────────────────────────────
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const skills: Skill[] = [
  {
    title: 'Frontend',
    icon: 'fa-solid fa-display text-purple-500',
    dotColor: 'bg-purple-500',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: 'fa-solid fa-server text-blue-500',
    dotColor: 'bg-blue-500',
    items: ['Node.js / Express', 'Python / Django', 'Go', 'GraphQL'],
  },
  {
    title: 'Database',
    icon: 'fa-solid fa-database text-purple-500',
    dotColor: 'bg-purple-500',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'],
  },
  {
    title: 'Tools',
    icon: 'fa-solid fa-cloud text-blue-500',
    dotColor: 'bg-blue-500',
    items: ['Docker / K8s', 'AWS / Vercel', 'Git / CI/CD', 'Figma'],
  },
]

const projects: Project[] = [
  {
    title: 'Nova Analytics Dashboard',
    desc: 'A real-time data visualization platform for SaaS products featuring multi-tenant support and predictive analytics.',
    tags: ['Next.js', 'Chart.js', 'Firebase'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzbSLGL7gst-YRy3qK6RLNdvuQxv5jFgmGTnpcK2gCZJ1wZdQlROhZuQ7tNIRvCO0-tPCncu82J0jhPIqwRIUlhfn_cftxRogm2jR0Z4_QrBT1aNKjC3MeuhZBSOCLg8MVYtRV2NGMhttYvJT_He1_RpVX8Vy8k8QrMgbaL0xCEwB0fqRFqMcbZiavqxETWQetIYwJCRJ-iGKxypv0JK3iXrIGy-q_W6APQ45p0caRSwKPOmcCqwrHyaYogkGgQEPq2DHBM90d-gfh',
  },
  {
    title: 'SwiftCart E-Commerce',
    desc: 'Full-featured online store with Stripe integration, headless CMS, and PWA capabilities.',
    tags: ['React', 'PostgreSQL', 'Stripe'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_7OryTesOOl_989EFTn7besmeJzAoJbDylIpYQpNHUir4eo_wsp5oApo3Gv0NrsopwI9IZjBIVCJuwHJqW1XJz558NOIMCs5U6EVQ2czxBqNsU1pQC_GaO2St5CaU_S4hRh9zrpUa_a7ZaW50k4S3wG392cEugHEKX6silhZRnR6puosN1L6Kyr-RYjL9q4aCGUlSGFcAE0M6GacYAO_E8db-yvFx6H672GXKS7YLWWzF4DSvs-KI55qOcrijyZ0Li5saOsBNObAN',
  },
]

const experience: Experience[] = [
  {
    period: '2022 – Present',
    role: 'Senior Full Stack Developer',
    company: 'Skyline Tech Solutions',
    desc: 'Leading a team of 5 developers to migrate legacy monolith systems to microservices. Improved performance by 40% using Redis and optimized GraphQL queries.',
    current: true,
  },
  {
    period: '2019 – 2021',
    role: 'Frontend Engineer',
    company: 'Digital Craft Studio',
    desc: 'Developed responsive web interfaces for high-traffic e-commerce sites. Built a custom UI library used across 10+ projects.',
    current: false,
  },
]

const contactInfo: ContactInfo[] = [
  { label: 'Email',    icon: 'fa-solid fa-envelope',      value: 'hello@alex.dev'       },
  { label: 'Location', icon: 'fa-solid fa-location-dot',  value: 'Phnom Penh, Cambodia' },
]

// ── Helpers ────────────────────────────────────────────────
function getContribColor(): string {
  const colors = [
    'bg-slate-800',
    'bg-purple-900/60',
    'bg-purple-700/60',
    'bg-purple-600/80',
    'bg-purple-500',
  ]
  return colors[Math.floor(Math.random() * colors.length)]!
}

// ── Lifecycle ──────────────────────────────────────────────
onMounted(() => {
  setTimeout(() => (visible.value = true), 100)
})
</script>

<template>
  <div class="space-y-32">

    <!-- ──────────────── HERO ──────────────── -->
    <section class="flex flex-col items-center text-center py-16 space-y-8 relative">
      <!-- Ambient glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <!-- Avatar (rounded-full, top of hero) -->
      <div
        class="transition-all duration-700 ease-out"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'"
      >
        <div class="relative inline-block">
          <div class="absolute -inset-1 bg-linear-to-br from-purple-600 to-blue-500 rounded-full blur-sm opacity-70 animate-pulse" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcZcP1qiRaWPJeDPgVLWcWHb3uOOSoUg478RJfN0a2xA9P9l1WtgAWORB5oTjYTixdrx5MAFvnyGhN9csj4FoK4ZIb6vX2_M2peiJr_LbcYDHTx0GwBD2nEuvBB75pnhkqIY2vDdTCajVbrURYOhyGMbudTpr49yFUhd8PbcpEbqHD6b2mW1aW8xwBo0TeG0bCJxJZEoQeHM-0BQdyJve530fF5WqU2vs46OIkRRW3zonl8VIZaZ49DKTJrBnXsIFXwMT8-Q39RxJg"
            alt="Alex"
            class="relative w-28 h-28 rounded-full object-cover border-2 border-white/20 grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>

      <!-- Headline -->
      <div
        class="space-y-3 relative transition-all duration-700 delay-100 ease-out"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <h1 class="text-5xl md:text-7xl font-black tracking-tight">
          Hi, I'm <span class="gradient-text">Alex</span>
        </h1>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-500 dark:text-slate-400">
          Full Stack Developer
        </h2>
        <div class="flex justify-center">
          <p class="typing-effect text-base md:text-lg font-semibold text-purple-500">
            I build scalable web applications.
          </p>
        </div>
        <p class="max-w-xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed text-base pt-1">
          Passionate about seamless user experiences with modern technologies.
          Specialising in cloud architectures and intuitive UI/UX.
        </p>
      </div>

      <!-- CTA Buttons -->
      <div
        class="flex flex-wrap justify-center gap-4 transition-all duration-700 delay-200 ease-out"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <a
          href="#projects"
          class="bg-linear-to-r from-purple-600 to-blue-500 text-white px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-purple-500/25"
        >
          View Projects <i class="fa-solid fa-arrow-right text-sm" />
        </a>
        <a
          href="#contact"
          class="glass-btn border border-white/15 px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </section>

    <!-- ──────────────── ABOUT ──────────────── -->
    <section id="about" class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Text -->
      <div class="space-y-6 order-2 md:order-1">
        <h2 class="text-3xl font-black flex items-center gap-3">
          <i class="fa-solid fa-user text-purple-500" />
          About Me
        </h2>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          With over 5 years of experience in the tech industry, I've transitioned from a curious hobbyist to a professional architecting complex systems. I believe in writing clean, maintainable code and staying ahead with emerging technologies.
        </p>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          When I'm not coding, you'll find me exploring open-source contributions or mentoring junior developers in the community.
        </p>
        <button class="flex items-center gap-2 glass-btn border border-purple-500/30 px-6 py-3 rounded-xl font-semibold hover:bg-purple-500/15 transition-all">
          <i class="fa-solid fa-download text-purple-500" />
          Download CV
        </button>
      </div>

      <!-- Image -->
      <div class="relative group order-1 md:order-2">
        <div class="absolute -inset-4 bg-linear-to-br from-purple-600 to-blue-500 rounded-2xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <div class="relative aspect-square rounded-2xl overflow-hidden glass-card border border-white/10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcZcP1qiRaWPJeDPgVLWcWHb3uOOSoUg478RJfN0a2xA9P9l1WtgAWORB5oTjYTixdrx5MAFvnyGhN9csj4FoK4ZIb6vX2_M2peiJr_LbcYDHTx0GwBD2nEuvBB75pnhkqIY2vDdTCajVbrURYOhyGMbudTpr49yFUhd8PbcpEbqHD6b2mW1aW8xwBo0TeG0bCJxJZEoQeHM-0BQdyJve530fF5WqU2vs46OIkRRW3zonl8VIZaZ49DKTJrBnXsIFXwMT8-Q39RxJg"
            alt="Alex portrait"
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>

    <!-- ──────────────── SKILLS ──────────────── -->
    <section id="skills" class="space-y-12">
      <div class="text-center space-y-2">
        <h2 class="text-3xl font-black">Technical Skills</h2>
        <p class="text-slate-500">The tools I use to bring ideas to life</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(skill, i) in skills"
          :key="skill.title"
          class="glass-card border border-white/10 hover:border-purple-500/50 p-6 rounded-2xl space-y-4 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <i :class="skill.icon" class="text-4xl block group-hover:scale-110 transition-transform duration-300" />
          <h3 class="font-bold text-xl">{{ skill.title }}</h3>
          <ul class="space-y-2 text-slate-500 dark:text-slate-400 text-sm">
            <li v-for="item in skill.items" :key="item" class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full shrink-0" :class="skill.dotColor" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ──────────────── PROJECTS ──────────────── -->
    <section id="projects" class="space-y-12">
      <div class="flex justify-between items-end">
        <div class="space-y-2">
          <h2 class="text-3xl font-black">Featured Projects</h2>
          <p class="text-slate-500">Real-world solutions built from scratch</p>
        </div>
        <a class="text-purple-500 font-semibold hover:underline flex items-center gap-1 text-sm" href="#">
          View All <i class="fa-solid fa-arrow-up-right-from-square text-xs" />
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="project in projects"
          :key="project.title"
          class="group glass-card border border-white/10 hover:border-purple-500/30 rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
        >
          <div class="relative h-52 overflow-hidden">
            <img
              :src="project.img"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <h3 class="text-xl font-bold group-hover:text-purple-500 transition-colors duration-200">{{ project.title }}</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{{ project.desc }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button class="flex-1 bg-linear-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                <i class="fa-solid fa-eye" /> Demo
              </button>
              <button class="flex-1 glass-btn border border-white/10 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                <i class="fa-brands fa-github" /> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────── CONTRIBUTION GRAPH ──────────────── -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold flex items-center gap-2">
        <i class="fa-solid fa-chart-bar text-purple-500" />
        Contribution Activity
      </h2>

      <div class="glass-card border border-white/10 p-6 rounded-2xl overflow-x-auto">
        <div class="flex flex-col gap-1 min-w-175">
          <div class="flex gap-1 justify-between text-[10px] text-slate-500 mb-2">
            <span v-for="m in months" :key="m">{{ m }}</span>
          </div>
          <div class="flex gap-1">
            <div v-for="col in 52" :key="col" class="flex flex-col gap-1">
              <div
                v-for="row in 7"
                :key="row"
                class="w-3 h-3 rounded-[3px] hover:scale-125 transition-transform cursor-pointer"
                :class="getContribColor()"
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 items-center mt-3 text-[10px] text-slate-500">
            <span>Less</span>
            <div class="w-3 h-3 rounded-[3px] bg-slate-800" />
            <div class="w-3 h-3 rounded-[3px] bg-purple-900/60" />
            <div class="w-3 h-3 rounded-[3px] bg-purple-700/60" />
            <div class="w-3 h-3 rounded-[3px] bg-purple-600/80" />
            <div class="w-3 h-3 rounded-[3px] bg-purple-500" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────── EXPERIENCE ──────────────── -->
    <section class="space-y-12">
      <h2 class="text-3xl font-black text-center">Work Experience</h2>

      <div class="relative max-w-3xl mx-auto pl-8 border-l border-white/10 space-y-12">
        <div v-for="(exp, i) in experience" :key="i" class="relative">
          <!-- Timeline dot -->
          <div
            class="absolute -left-10.25 top-0 w-4 h-4 rounded-full ring-4 ring-[#09090b]"
            :class="exp.current ? 'bg-linear-to-br from-purple-600 to-blue-500' : 'bg-slate-700'"
          />
          <div class="glass-card border border-white/10 hover:border-purple-500/30 p-6 rounded-2xl space-y-2 hover:translate-x-2 transition-all duration-300">
            <span class="text-sm font-bold" :class="exp.current ? 'text-purple-500' : 'text-slate-500'">
              {{ exp.period }}
            </span>
            <h3 class="text-xl font-bold">{{ exp.role }}</h3>
            <p class="text-blue-400 font-semibold text-sm">{{ exp.company }}</p>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{{ exp.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────── CONTACT ──────────────── -->
    <section id="contact" class="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
      <!-- Contact Info -->
      <div class="space-y-8">
        <div class="space-y-3">
          <h2 class="text-4xl font-black">Get In Touch</h2>
          <p class="text-slate-500 leading-relaxed">I'm currently open to new opportunities and collaborations. Let's talk about your next big idea!</p>
        </div>

        <div class="space-y-4">
          <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-4 group">
            <div class="w-12 h-12 rounded-xl glass-btn border border-white/10 flex items-center justify-center text-purple-500 group-hover:bg-linear-to-br group-hover:from-purple-600 group-hover:to-blue-500 group-hover:text-white transition-all duration-300">
              <i :class="info.icon" />
            </div>
            <div>
              <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{{ info.label }}</p>
              <p class="font-bold">{{ info.value }}</p>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex gap-3">
          <a
            v-for="social in [
              { icon: 'fa-brands fa-github', href: '#' },
              { icon: 'fa-brands fa-linkedin-in', href: '#' },
              { icon: 'fa-brands fa-x-twitter', href: '#' },
            ]"
            :key="social.icon"
            :href="social.href"
            class="w-10 h-10 rounded-full glass-btn border border-white/10 hover:border-purple-500/50 flex items-center justify-center hover:text-purple-500 transition-all duration-200"
          >
            <i :class="social.icon" />
          </a>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="glass-card border border-white/10 p-8 rounded-2xl shadow-2xl">
        <form class="space-y-5" @submit.prevent>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</label>
              <input type="text" placeholder="John Doe" class="input-field" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email</label>
              <input type="email" placeholder="john@example.com" class="input-field" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Subject</label>
            <select class="input-field appearance-none">
              <option>Project Collaboration</option>
              <option>Job Opportunity</option>
              <option>General Inquiry</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Message</label>
            <textarea placeholder="How can I help you?" rows="4" class="input-field resize-none" />
          </div>

          <button
            type="submit"
            class="w-full bg-linear-to-r from-purple-600 to-blue-500 text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-paper-plane" />
            Send Message
          </button>
        </form>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Glass utilities */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
}
.glass-btn {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #8c25f4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Input fields */
.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-field:focus {
  border-color: rgba(139, 37, 244, 0.5);
  box-shadow: 0 0 0 3px rgba(139, 37, 244, 0.1);
}

/* Typing animation */
@keyframes typing {
  from { width: 0 }
  to   { width: 100% }
}
@keyframes blink {
  50% { border-color: transparent }
}
.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #8c25f4;
  width: 0;
  animation:
    typing 3.5s steps(40, end) forwards,
    blink 0.75s step-end infinite;
}
</style>