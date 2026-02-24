import { ref, onMounted } from 'vue';

export function useTheme() {
  const isDark = ref(true);

  function toggleTheme() {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
      if (isDark.value) {
        document.documentElement.classList.add('dark');
      }
    } else {
      // If no theme is saved, use the system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDark.value = prefersDark;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  });

  return {
    isDark,
    toggleTheme,
  };
}
