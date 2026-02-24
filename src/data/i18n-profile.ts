import type { ContactInfo, Experience, Project, Skill } from "../types/profile";

interface ProfileData {
  infor: { information: string };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  contactInfo: Omit<ContactInfo, "icon" | "value">[];
}

export const profileData: Record<string, ProfileData> = {
  en: {
    infor: {
      information:
        "Passionate Full Stack Developer from Cambodia with strong experience in Vue.js and modern JavaScript frameworks. Currently upskilling in React (TSX), Next.js, Expo (React Native), Supabase, Telegram Bot development, and backend systems using Express.js. Focused on building scalable web and mobile applications.",
    },
    skills: [
      {
        title: "Frontend",
        icon: "fa-solid fa-display text-purple-500",
        dotColor: "bg-purple-500",
        items: [
          "Vue.js / Nuxt",
          "React / Next.js (TSX)",
          "TypeScript",
          "Tailwind CSS",
          "HTML / CSS / JavaScript",
          "Uni-app (basic)",
          "Wordpress",
        ],
      },
      {
        title: "Mobile Development",
        icon: "fa-solid fa-mobile-screen text-green-500",
        dotColor: "bg-green-500",
        items: [
          "React Native",
          "Expo",
          "Flutter",
          "Uni-app (basic)",
          "Capacitorjs",
        ],
      },
      {
        title: "Backend",
        icon: "fa-solid fa-server text-blue-500",
        dotColor: "bg-blue-500",
        items: [
          "Node.js",
          "Express.js",
          "REST API Development",
          "Telegram Bot API",
        ],
      },
      {
        title: "Database & BaaS",
        icon: "fa-solid fa-database text-purple-500",
        dotColor: "bg-purple-500",
        items: ["PostgreSQL", "My SQL", "RethinkDB", "Prisma ORM", "Supabase"],
      },
      {
        title: "Tools & Deployment",
        icon: "fa-solid fa-cloud text-blue-500",
        dotColor: "bg-blue-500",
        items: [
          "Git / GitHub",
          "Vercel",
          "Cloudflare",
          "cPanel Hosting",
          "npm / Package Management",
        ],
      },
    ],
    projects: [
      {
        title: "Full Stack Web Application",
        desc: "Built a modern full-stack web application using Vue 3, Express.js, PostgreSQL, and Prisma. Implemented authentication.",
        tags: ["Vue 3", "Express", "PostgreSQL", "Prisma", "Capacitor"],
        img: "/quiz.jpg",
      },
      {
        title: "Mobile App with Expo",
        desc: "Developed a cross-platform mobile application using React Native with Expo and TypeScript. Integrated Supabase for backend and authentication.",
        tags: ["React Native", "Expo", "Supabase", "TypeScript"],
        img: "/mobileapp.jpg",
      },
      {
        title: "Telegram Bot Automation",
        desc: "Created Telegram bots using Node.js and Express to automate messaging, notifications, and business workflows.",
        tags: ["Node.js", "Telegram Bot API", "Express"],
        img: "/telegram.jpg",
      },
      {
        title: "Soft Launch",
        desc: "Small Web that register for meeting soft launch with project 48hr",
        tags: ["React", "Telegram Bot API", "Mongodb"],
        img: "/soft-launch.png",
      },
      {
        title: "One Attendance",
        desc: "First development from 1Dev company",
        tags: ["Vue 3", "Telegram Bot API", "Express", "primevue"],
        img: "/attendance.png",
      },
    ],
    experience: [
      {
        period: "2025 – Present",
        role: "Frontend Developer",
        company: "Nealika Company",
        desc: "Developing and maintaining responsive web applications using React and Vue 3. Collaborating with backend developers to integrate REST APIs, building reusable UI components, and optimizing performance for production environments.",
        current: true,
      },
      {
        period: "2024 – 2025 (Trainee)",
        role: "Frontend Developer",
        company: "1Dev Company, Siem Reap",
        desc: "Completed intensive frontend training using Vue.js, Tailwind CSS, JavaScript, and TypeScript. Contributed to CMS-based projects and collaborated with senior developers to improve real-world applications.",
        current: true,
      },
      {
        period: "2023 – 2024",
        role: "Content Creator & Digital Marketer",
        company: "The Premier Angkor Palace, Siem Reap",
        desc: "Managed and grew social media platforms through digital marketing strategies, content creation, and engagement optimization.",
        current: false,
      },
    ],
    contactInfo: [
      { label: "Email" },
      { label: "Location" },
      { label: "GitHub" },
    ],
  },
  km: {
    infor: {
      information:
        "អ្នកបង្កើតកម្មវិធី Full Stack ដ៏មានសក្ដានុពលមកពីប្រទេសកម្ពុជា ដែលមានបទពិសោធន៍រឹងមាំជាមួយ Vue.js និង JavaScript Framework ទំនើបៗ។ បច្ចុប្បន្នកំពុងបង្កើនជំនាញលើ React (TSX), Next.js, Expo (React Native), Supabase, ការបង្កើត Telegram Bot និងប្រព័ន្ធ Backend ដោយប្រើ Express.js។ ផ្តោតលើការបង្កើតកម្មវិធីគេហទំព័រ និងកម្មវិធីទូរស័ព្ទដែលអាចពង្រីកបាន។",
    },
    skills: [
      {
        title: "Frontend",
        icon: "fa-solid fa-display text-purple-500",
        dotColor: "bg-purple-500",
        items: [
          "Vue.js / Nuxt",
          "React / Next.js (TSX)",
          "TypeScript",
          "Tailwind CSS",
          "HTML / CSS / JavaScript",
          "Uni-app (មូលដ្ឋាន)",
          "Wordpress",
        ],
      },
      {
        title: "ការអភិវឌ្ឍន៍កម្មវិធីទូរស័ព្ទ",
        icon: "fa-solid fa-mobile-screen text-green-500",
        dotColor: "bg-green-500",
        items: [
          "React Native",
          "Expo",
          "Flutter",
          "Uni-app (មូលដ្ឋាន)",
          "Capacitorjs",
        ],
      },
      {
        title: "Backend",
        icon: "fa-solid fa-server text-blue-500",
        dotColor: "bg-blue-500",
        items: [
          "Node.js",
          "Express.js",
          "ការអភិវឌ្ឍន៍ REST API",
          "Telegram Bot API",
        ],
      },
      {
        title: "មូលដ្ឋានទិន្នន័យ & BaaS",
        icon: "fa-solid fa-database text-purple-500",
        dotColor: "bg-purple-500",
        items: ["PostgreSQL", "My SQL", "RethinkDB", "Prisma ORM", "Supabase"],
      },
      {
        title: "ឧបករណ៍ & ការដាក់ឱ្យដំណើរការ",
        icon: "fa-solid fa-cloud text-blue-500",
        dotColor: "bg-blue-500",
        items: [
          "Git / GitHub",
          "Vercel",
          "Cloudflare",
          "cPanel Hosting",
          "npm / ការគ្រប់គ្រង Package",
        ],
      },
    ],
    projects: [
      {
        title: "កម្មវិធីគេហទំព័រ Full Stack",
        desc: "បង្កើតកម្មវិធីគេហទំព័រ Full Stack ទំនើបដោយប្រើ Vue 3, Express.js, PostgreSQL និង Prisma។ រួមបញ្ចូលទាំងប្រព័ន្ធបញ្ជាក់អត្តសញ្ញាណ (Authentication)។",
        tags: ["Vue 3", "Express", "PostgreSQL", "Prisma", "Capacitor"],
        img: "/quiz.jpg",
      },
      {
        title: "កម្មវិធីទូរស័ព្ទជាមួយ Expo",
        desc: "បង្កើតកម្មវិធីទូរស័ព្ទប្រើប្រាស់បានទាំង iOS និង Android ដោយប្រើ React Native ជាមួយ Expo និង TypeScript។ រួមបញ្ចូល Supabase សម្រាប់ Backend និងការបញ្ជាក់អត្តសញ្ញាណ។",
        tags: ["React Native", "Expo", "Supabase", "TypeScript"],
        img: "/mobileapp.jpg",
      },
      {
        title: "ប្រព័ន្ធស្វ័យប្រវត្តិកម្ម Telegram Bot",
        desc: "បង្កើត Telegram bots ដោយប្រើ Node.js និង Express ដើម្បីធ្វើឱ្យការផ្ញើសារ ការជូនដំណឹង និងលំហូរការងារអាជីវកម្មមានភាពស្វ័យប្រវត្ត។",
        tags: ["Node.js", "Telegram Bot API", "Express"],
        img: "/telegram.jpg",
      },
      {
        title: "Soft Launch",
        desc: "គេហទំព័រខ្នាតតូចសម្រាប់ចុះឈ្មោះចូលរួមការប្រជុំ Soft Launch ជាមួយគម្រោង 48hr",
        tags: ["React", "Telegram Bot API", "Mongodb"],
        img: "/soft-launch.png",
      },
      {
        title: "One Attendance",
        desc: "ការអភិវឌ្ឍន៍ដំបូងបង្អស់ពីក្រុមហ៊ុន 1Dev",
        tags: ["Vue 3", "Telegram Bot API", "Express", "primevue"],
        img: "/attendance.png",
      },
    ],
    experience: [
      {
        period: "២០២៥ – បច្ចុប្បន្ន",
        role: "អ្នកបង្កើត Frontend",
        company: "ក្រុមហ៊ុន Nealika",
        desc: "អភិវឌ្ឍ និងថែទាំកម្មវិធីគេហទំព័រដែលឆ្លើយតប (Responsive) ដោយប្រើ React និង Vue 3។ សហការជាមួយអ្នកបង្កើត Backend ដើម្បីភ្ជាប់ REST APIs បង្កើត UI components ដែលអាចប្រើឡើងវិញបាន និងបង្កើនប្រសិទ្ធភាពសម្រាប់បរិស្ថានផលិតកម្ម។",
        current: true,
      },
      {
        period: "២០២៤ – ២០២៥ (កម្មសិក្សា)",
        role: "អ្នកបង្កើត Frontend",
        company: "ក្រុមហ៊ុន 1Dev, សៀមរាប",
        desc: "បានបញ្ចប់ការបណ្តុះបណ្តាល Frontend យ៉ាងស៊ីជម្រៅដោយប្រើ Vue.js, Tailwind CSS, JavaScript និង TypeScript។ បានចូលរួមចំណែកក្នុងគម្រោងដែលផ្អែកលើ CMS និងសហការជាមួយអ្នកអភិវឌ្ឍន៍ជាន់ខ្ពស់ដើម្បីកែលម្អកម្មវិធីជាក់ស្តែង។",
        current: true,
      },
      {
        period: "២០២៣ – ២០២៤",
        role: "អ្នកបង្កើតមាតិកា និងអ្នកទីផ្សារឌីជីថល",
        company: "The Premier Angkor Palace, សៀមរាប",
        desc: "គ្រប់គ្រង និងពង្រីកបណ្តាញសង្គមតាមរយៈយុទ្ធសាស្ត្រទីផ្សារឌីជីថល ការបង្កើតមាតិកា និងការបង្កើនអន្តរកម្មជាមួយអតិថិជន។",
        current: false,
      },
    ],
    contactInfo: [
      { label: "អ៊ីមែល" },
      { label: "ទីតាំង" },
      { label: "GitHub" },
    ],
  },
  zh: {
    infor: {
      information:
        "来自柬埔寨的全栈开发工程师，在 Vue.js 和现代 JavaScript 框架方面拥有深厚的经验。目前正致力于提升 React (TSX)、Next.js、Expo (React Native)、Supabase、Telegram Bot 开发以及 Express.js 后端系统的技术能力。专注于构建高性能、可扩展的 Web 和移动应用程序。",
    },
    skills: [
      {
        title: "前端",
        icon: "fa-solid fa-display text-purple-500",
        dotColor: "bg-purple-500",
        items: [
          "Vue.js / Nuxt",
          "React / Next.js (TSX)",
          "TypeScript",
          "Tailwind CSS",
          "HTML / CSS / JavaScript",
          "Uni-app (基础)",
          "Wordpress",
        ],
      },
      {
        title: "移动开发",
        icon: "fa-solid fa-mobile-screen text-green-500",
        dotColor: "bg-green-500",
        items: [
          "React Native",
          "Expo",
          "Flutter",
          "Uni-app (基础)",
          "Capacitorjs",
        ],
      },
      {
        title: "后端",
        icon: "fa-solid fa-server text-blue-500",
        dotColor: "bg-blue-500",
        items: ["Node.js", "Express.js", "REST API 开发", "Telegram Bot API"],
      },
      {
        title: "数据库和 BaaS",
        icon: "fa-solid fa-database text-purple-500",
        dotColor: "bg-purple-500",
        items: ["PostgreSQL", "My SQL", "RethinkDB", "Prisma ORM", "Supabase"],
      },
      {
        title: "工具和部署",
        icon: "fa-solid fa-cloud text-blue-500",
        dotColor: "bg-blue-500",
        items: [
          "Git / GitHub",
          "Vercel",
          "Cloudflare",
          "cPanel 主机",
          "npm / 包管理",
        ],
      },
    ],
    projects: [
      {
        title: "全栈 Web 应用程序",
        desc: "使用 Vue 3、Express.js、PostgreSQL 和 Prisma 构建了一个现代的全栈 Web 应用程序。实现了身份验证。",
        tags: ["Vue 3", "Express", "PostgreSQL", "Prisma", "Capacitor"],
        img: "/quiz.jpg",
      },
      {
        title: "使用 Expo 的移动应用",
        desc: "使用 React Native、Expo 和 TypeScript 开发了一个跨平台移动应用程序。集成了 Supabase 用于后端和身份验证。",
        tags: ["React Native", "Expo", "Supabase", "TypeScript"],
        img: "/mobileapp.jpg",
      },
      {
        title: "Telegram Bot 自动化",
        desc: "使用 Node.js 和 Express 创建了 Telegram 机器人，以自动执行消息传递、通知和业务工作流程。",
        tags: ["Node.js", "Telegram Bot API", "Express"],
        img: "/telegram.jpg",
      },
      {
        title: "软启动",
        desc: "一个用于与 48 小时项目一起注册会议软启动的小型网站",
        tags: ["React", "Telegram Bot API", "Mongodb"],
        img: "/soft-launch.png",
      },
      {
        title: "One Attendance",
        desc: "1Dev 公司的首次开发",
        tags: ["Vue 3", "Telegram Bot API", "Express", "primevue"],
        img: "/attendance.png",
      },
    ],
    experience: [
      {
        period: "2025 年至今",
        role: "前端开发人员",
        company: "Nealika 公司",
        desc: "使用 React 和 Vue 3 开发和维护响应式 Web 应用程序。与后端开发人员协作以集成 REST API，构建可重用的 UI 组件，并优化生产环境的性能。",
        current: true,
      },
      {
        period: "2024 – 2025 (实习)",
        role: "前端开发人员",
        company: "1Dev 公司，暹粒",
        desc: "完成了使用 Vue.js、Tailwind CSS、JavaScript 和 TypeScript 的密集前端培训。为基于 CMS 的项目做出了贡献，并与高级开发人员合作改进实际应用程序。",
        current: true,
      },
      {
        period: "2023 – 2024",
        role: "内容创作者和数字营销人员",
        company: "The Premier Angkor Palace, 暹粒",
        desc: "通过数字营销策略、内容创作和参与度优化来管理和发展社交媒体平台。",
        current: false,
      },
    ],
    contactInfo: [
      { label: "电子邮箱" },
      { label: "所在地" },
      { label: "GitHub" },
    ],
  },
  vi: {
    infor: {
      information:
        "Lập trình viên Full Stack đầy nhiệt huyết đến từ Campuchia với kinh nghiệm dày dặn về Vue.js và các framework JavaScript hiện đại. Hiện tại mình đang nâng cao kỹ năng về React (TSX), Next.js, Expo (React Native), Supabase, phát triển Telegram Bot và các hệ thống Backend sử dụng Express.js. Tập trung vào việc xây dựng các ứng dụng Web và Mobile có khả năng mở rộng cao.",
    },
    skills: [
      {
        title: "Frontend",
        icon: "fa-solid fa-display text-purple-500",
        dotColor: "bg-purple-500",
        items: [
          "Vue.js / Nuxt",
          "React / Next.js (TSX)",
          "TypeScript",
          "Tailwind CSS",
          "HTML / CSS / JavaScript",
          "Uni-app (cơ bản)",
          "Wordpress",
        ],
      },
      {
        title: "Phát triển di động",
        icon: "fa-solid fa-mobile-screen text-green-500",
        dotColor: "bg-green-500",
        items: [
          "React Native",
          "Expo",
          "Flutter",
          "Uni-app (cơ bản)",
          "Capacitorjs",
        ],
      },
      {
        title: "Backend",
        icon: "fa-solid fa-server text-blue-500",
        dotColor: "bg-blue-500",
        items: [
          "Node.js",
          "Express.js",
          "Phát triển REST API",
          "Telegram Bot API",
        ],
      },
      {
        title: "Cơ sở dữ liệu & BaaS",
        icon: "fa-solid fa-database text-purple-500",
        dotColor: "bg-purple-500",
        items: ["PostgreSQL", "My SQL", "RethinkDB", "Prisma ORM", "Supabase"],
      },
      {
        title: "Công cụ & Triển khai",
        icon: "fa-solid fa-cloud text-blue-500",
        dotColor: "bg-blue-500",
        items: [
          "Git / GitHub",
          "Vercel",
          "Cloudflare",
          "cPanel Hosting",
          "npm / Quản lý gói",
        ],
      },
    ],
    projects: [
      {
        title: "Ứng dụng web Full Stack",
        desc: "Đã xây dựng một ứng dụng web full-stack hiện đại bằng Vue 3, Express.js, PostgreSQL và Prisma. Đã triển khai xác thực.",
        tags: ["Vue 3", "Express", "PostgreSQL", "Prisma", "Capacitor"],
        img: "/quiz.jpg",
      },
      {
        title: "Ứng dụng di động với Expo",
        desc: "Đã phát triển một ứng dụng di động đa nền tảng bằng React Native với Expo và TypeScript. Tích hợp Supabase cho backend và xác thực.",
        tags: ["React Native", "Expo", "Supabase", "TypeScript"],
        img: "/mobileapp.jpg",
      },
      {
        title: "Tự động hóa Telegram Bot",
        desc: "Đã tạo các bot Telegram bằng Node.js và Express để tự động hóa việc nhắn tin, thông báo và quy trình làm việc kinh doanh.",
        tags: ["Node.js", "Telegram Bot API", "Express"],
        img: "/telegram.jpg",
      },
      {
        title: "Ra mắt mềm",
        desc: "Web nhỏ đăng ký cuộc họp ra mắt mềm với dự án 48 giờ",
        tags: ["React", "Telegram Bot API", "Mongodb"],
        img: "/soft-launch.png",
      },
      {
        title: "One Attendance",
        desc: "Sản phẩm phát triển đầu tiên từ công ty 1Dev",
        tags: ["Vue 3", "Telegram Bot API", "Express", "primevue"],
        img: "/attendance.png",
      },
    ],
    experience: [
      {
        period: "2025 – Hiện tại",
        role: "Nhà phát triển Frontend",
        company: "Công ty Nealika",
        desc: "Phát triển và duy trì các ứng dụng web đáp ứng bằng React và Vue 3. Hợp tác với các nhà phát triển backend để tích hợp các API REST, xây dựng các thành phần UI có thể tái sử dụng và tối ưu hóa hiệu suất cho môi trường sản xuất.",
        current: true,
      },
      {
        period: "2024 – 2025 (Thực tập)",
        role: "Nhà phát triển Frontend",
        company: "Công ty 1Dev, Siem Reap",
        desc: "Đã hoàn thành khóa đào tạo frontend chuyên sâu bằng Vue.js, Tailwind CSS, JavaScript và TypeScript. Đã đóng góp vào các dự án dựa trên CMS và hợp tác với các nhà phát triển cao cấp để cải thiện các ứng dụng trong thế giới thực.",
        current: true,
      },
      {
        period: "2023 – 2024",
        role: "Người tạo nội dung & Nhà tiếp thị kỹ thuật số",
        company: "The Premier Angkor Palace, Siem Reap",
        desc: "Quản lý và phát triển các nền tảng truyền thông xã hội thông qua các chiến lược tiếp thị kỹ thuật số, tạo nội dung và tối ưu hóa tương tác.",
        current: false,
      },
    ],
    contactInfo: [
      { label: "Email" },
      { label: "Địa điểm" },
      { label: "GitHub" },
    ],
  },
};
