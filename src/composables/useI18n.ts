// src/composables/useI18n.ts
import { ref, computed } from "vue";

// This is a simple, self-contained i18n solution.
// For more complex apps, consider using a library like vue-i18n.

type Translations = { [key: string]: any };
type Messages = { [locale: string]: Translations };

// 1. Define all translations here
const messages: Messages = {
  en: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    english: "English",
    khmer: "Khmer",
    chinese: "Chinese",
    vietnamese: "Vietnamese",
    home: {
      hero: {
        greeting: "Hi, I'm",
        name: "Heng",
        role: "Junior Full Stack Developer",
        stack: "Vue • React • Expo • Express • Supabase",
        bio: "IT student passionate about building modern web and mobile applications. Currently upskilling in React (TSX), Next.js, Expo, Telegram Bot development, and backend systems with Express & PostgreSQL.",
        viewProjects: "View Projects",
        contactMe: "Contact Me",
      },
      about: {
        title: "About Me",
        p1: "I'm Bunheng, a Year 4 IT student from Cambodia, currently studying at the University of South-East Asia. I started my journey with Vue.js and frontend development, and now I'm expanding into full stack and mobile development.",
        p2: "I enjoy building real-world applications using React (TSX), Next.js, Expo, Supabase, Express.js, and PostgreSQL, Vue js. My goal is to become a strong Full Stack Developer and contribute to innovative digital solutions.",
        downloadCV: "Download CV",
      },
      skills: {
        title: "Technical Skills",
        subtitle: "The tools I use to bring ideas to life",
      },
      projects: {
        title: "Featured Projects",
        subtitle: "Real-world solutions built from scratch",
        demo: "Demo",
        github: "GitHub",
      },
      experience: {
        title: "Experience & Training",
      },
      contact: {
        title: "Get In Touch",
        subtitle:
          "I'm currently open to new opportunities and collaborations. Let's talk about your next big idea!",
        form: {
          name: "Name",
          email: "Telegram",
          subject: "Subject",
          message: "Message",
          send: "Send Message",
          subjectOptions: {
            collab: "Project Collaboration",
            job: "Job Opportunity",
            general: "General Inquiry",
          },
          placeholders: {
            name: "John Doe",
            email: "@Username",
            message: "How can I help you?",
          },
        },
      },
      mobile: {
        languageTitle: "Language",
      },
    },
  },
  km: {
    about: "អំពី",
    skills: "ជំនាញ",
    projects: "គម្រោង",
    contact: "ទំនាក់ទំនង",
    english: "English",
    khmer: "ខ្មែរ",
    chinese: "ចិន",
    vietnamese: "វៀតណាម",
    home: {
      hero: {
        greeting: "សួស្តី ខ្ញុំគឺ",
        name: "Heng",
        role: "Junior Full Stack",
        stack: "Vue • React • Expo • Express • Supabase",
        bio: "និស្សិតអាយធីដែលមានចំណព្វចិត្តលើការបង្កើតគេហទំព័រ និងកម្មវិធីទូរស័ព្ទទំនើប។ បច្ចុប្បន្នកំពុងពង្រឹងជំនាញក្នុង React (TSX), Next.js, Expo, ការបង្កើត Telegram Bot និងប្រព័ន្ធ backend ជាមួយ Express & PostgreSQL។",
        viewProjects: "មើលគម្រោង",
        contactMe: "ទាក់ទងមកខ្ញុំ",
      },
      about: {
        title: "អំពីខ្ញុំ",
        p1: "ខ្ញុំឈ្មោះ ប៊ុនហេង ជានិស្សិតអាយធីឆ្នាំទី ៤ មកពីប្រទេសកម្ពុជា បច្ចុប្បន្នកំពុងសិក្សានៅសាកលវិទ្យាល័យ South-East Asia។ ខ្ញុំបានចាប់ផ្តើមដំណើររបស់ខ្ញុំជាមួយ Vue.js និងការអភិវឌ្ឍន៍ frontend ហើយឥឡូវនេះខ្ញុំកំពុងពង្រីកទៅកាន់ការអភិវឌ្ឍន៍ full stack និង mobile។",
        p2: "ខ្ញុំរីករាយនឹងការបង្កើតកម្មវិធីជាក់ស្តែងដោយប្រើ React (TSX), Next.js, Expo, Supabase, Express.js និង PostgreSQL, Vue js។ គោលដៅរបស់ខ្ញុំគឺក្លាយជា Full Stack Developer ដ៏ខ្លាំងម្នាក់ និងរួមចំណែកដល់ដំណោះស្រាយឌីជីថលប្រកបដោយភាពច្នៃប្រឌិត។",
        downloadCV: "ទាញយក CV",
      },
      skills: {
        title: "ជំនាញបច្ចេកទេស",
        subtitle: "ឧបករណ៍ដែលខ្ញុំប្រើដើម្បីធ្វើឱ្យគំនិតក្លាយជាការពិត",
      },
      projects: {
        title: "គម្រោងលេចធ្លោ",
        subtitle: "ដំណោះស្រាយជាក់ស្តែងដែលបង្កើតឡើងពីចំណុចចាប់ផ្តើម",
        demo: "ការបង្ហាញ",
        github: "GitHub",
      },
      experience: {
        title: "បទពិសោធន៍ និងការបណ្តុះបណ្តាល",
      },
      contact: {
        title: "ទំនាក់ទំនង",
        subtitle:
          "បច្ចុប្បន្នខ្ញុំកំពុងបើកចំហរសម្រាប់ឱកាស និងកិច្ចសហការថ្មីៗ។ តោះនិយាយអំពីគំនិតដ៏អស្ចារ្យបន្ទាប់របស់អ្នក!",
        form: {
          name: "ឈ្មោះ",
          email: "Telegram",
          subject: "ប្រធានបទ",
          message: "សារ",
          send: "ផ្ញើសារ",
          subjectOptions: {
            collab: "កិច្ចសហការគម្រោង",
            job: "ឱកាសការងារ",
            general: "ការសាកសួរទូទៅ",
          },
          placeholders: {
            name: "John Doe",
            email: "@Username",
            message: "តើខ្ញុំអាចជួយអ្នកដោយរបៀបណា?",
          },
        },
      },
      mobile: {
        languageTitle: "ភាសា",
      },
    },
  },
  zh: {
    about: "关于我",
    skills: "技术栈",
    projects: "项目案例",
    contact: "联系方式",
    english: "英文",
    khmer: "柬埔寨语",
    chinese: "中文",
    vietnamese: "越南语",
    home: {
      hero: {
        greeting: "你好，我是",
        name: "Heng",
        role: "初级全栈开发工程师",
        stack: "Vue • React • Expo • Express • Supabase",
        bio: "我是一名对构建现代 Web 和移动应用充满热情的 IT 学生。目前正专注于提升 React (TSX)、Next.js、Expo、Telegram Bot 开发以及基于 Express 和 PostgreSQL 的后端系统技能。",
        viewProjects: "查看项目",
        contactMe: "联系我",
      },
      about: {
        title: "个人简介",
        p1: "我是 Bunheng，一名来自柬埔寨的四年级 IT 学生，目前就读于东南亚大学。我的开发之路始于 Vue.js 和前端开发，现在我正积极向全栈及移动开发领域扩展。",
        p2: "我热衷于利用 React (TSX)、Next.js、Expo、Supabase、Express.js 和 PostgreSQL、Vue.js 等技术构建实际应用。我的目标是成为一名资深的全栈开发工程师，并为创新的数字化解决方案贡献力量。",
        downloadCV: "下载简历",
      },
      skills: {
        title: "技术技能",
        subtitle: "我用来将想法变为现实的工具",
      },
      projects: {
        title: "精选项目",
        subtitle: "从头开始构建的真实世界解决方案",
        demo: "演示",
        github: "GitHub",
      },
      experience: {
        title: "经验与培训",
      },
      contact: {
        title: "保持联系",
        subtitle: "我目前对新的机会和合作持开放态度。让我们谈谈你的下一个好主意吧！",
        form: {
          name: "姓名",
          email: "Telegram",
          subject: "主题",
          message: "信息",
          send: "发送信息",
          subjectOptions: {
            collab: "项目合作",
            job: "工作机会",
            general: "一般查询",
          },
          placeholders: {
            name: "John Doe",
            email: "@Username",
            message: "我能为您做些什么？",
          },
        },
      },
      mobile: {
        languageTitle: "语言",
      },
    },
  },
  vi: {
    about: "Giới thiệu",
    skills: "Kỹ năng",
    projects: "Dự án",
    contact: "Liên hệ",
    english: "Tiếng Anh",
    khmer: "Tiếng Khmer",
    chinese: "Tiếng Trung",
    vietnamese: "Tiếng Việt",
    home: {
      hero: {
        greeting: "Xin chào, mình là",
        name: "Heng",
        role: "Lập trình viên Full Stack (Junior)",
        stack: "Vue • React • Expo • Express • Supabase",
        bio: "Mình là sinh viên CNTT đam mê xây dựng các ứng dụng Web và Mobile hiện đại. Hiện tại, mình đang tập trung nâng cao kỹ năng về React (TSX), Next.js, Expo, phát triển Telegram Bot và hệ thống Backend với Express & PostgreSQL.",
        viewProjects: "Xem dự án",
        contactMe: "Liên hệ ngay",
      },
      about: {
        title: "Về mình",
        p1: "Mình là Bunheng, sinh viên CNTT năm 4 từ Campuchia, hiện đang theo học tại Đại học Đông Nam Á. Mình bắt đầu hành trình lập trình với Vue.js và phát triển Frontend, hiện tại mình đang mở rộng sang lĩnh vực Full Stack và Mobile.",
        p2: "Mình yêu thích việc xây dựng các ứng dụng thực tiễn sử dụng React (TSX), Next.js, Expo, Supabase, Express.js và PostgreSQL. Mục tiêu của mình là trở thành một lập trình viên Full Stack chuyên nghiệp và đóng góp vào các giải pháp kỹ thuật số sáng tạo.",
        downloadCV: "Tải CV",
      },
      skills: {
        title: "Kỹ năng kỹ thuật",
        subtitle: "Các công cụ tôi sử dụng để biến ý tưởng thành hiện thực",
      },
      projects: {
        title: "Dự án nổi bật",
        subtitle: "Các giải pháp trong thế giới thực được xây dựng từ đầu",
        demo: "Bản demo",
        github: "GitHub",
      },
      experience: {
        title: "Kinh nghiệm & Đào tạo",
      },
      contact: {
        title: "Liên lạc",
        subtitle:
          "Tôi hiện đang mở ra các cơ hội và hợp tác mới. Hãy nói về ý tưởng lớn tiếp theo của bạn!",
        form: {
          name: "Tên",
          email: "Telegram",
          subject: "Chủ đề",
          message: "Tin nhắn",
          send: "Gửi tin nhắn",
          subjectOptions: {
            collab: "Hợp tác dự án",
            job: "Cơ hội việc làm",
            general: "Yêu cầu chung",
          },
          placeholders: {
            name: "John Doe",
            email: "@Username",
            message: "Làm thế nào tôi có thể giúp bạn?",
          },
        },
      },
      mobile: {
        languageTitle: "Ngôn ngữ",
      },
    },
  },
};

// 2. Define available locales
export const availableLocales = [
  { code: "en", nameKey: "english", flag: "🇺🇸" },
  { code: "km", nameKey: "khmer", flag: "🇰🇭" },
  { code: "zh", nameKey: "chinese", flag: "🇨🇳" },
  { code: "vi", nameKey: "vietnamese", flag: "🇻🇳" },
];

// 3. Singleton state for the current language
const getInitialLocale = (): string => {
  if (typeof window !== "undefined" && window.localStorage) {
    const savedLocale = window.localStorage.getItem("locale");
    if (savedLocale && Object.keys(messages).includes(savedLocale)) {
      return savedLocale;
    }
  }
  return "en"; // Default language
};

const currentLocale = ref<string>(getInitialLocale());

// This part is the composable that components will use
export function useI18n() {
  // Function to change the language
  const setLocale = (locale: string) => {
    if (Object.keys(messages).includes(locale)) {
      currentLocale.value = locale;
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("locale", locale);
      }
    } else {
      console.warn(`Locale "${locale}" not found.`);
    }
  };

  // The translation function
  const t = (key: string): string => {
    const keys = key.split(".");
    let result: any = messages[currentLocale.value];
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        result = undefined;
        break;
      }
    }

    if (result === undefined) {
      result = messages.en;
      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = result[k];
        } else {
          return key;
        }
      }
    }

    return typeof result === "string" ? result : key;
  };

  // Computed property for the current locale's label (e.g., "EN")
  const currentLocaleLabel = computed(() => currentLocale.value.toUpperCase());

  return {
    t,
    setLocale,
    currentLocale,
    currentLocaleLabel,
    availableLocales, // Exposing this to build the dropdown
  };
}
