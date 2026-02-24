import { ref, computed, onMounted, onBeforeUnmount } from "vue";

interface Breakpoints {
  mobile: number;  // below this is mobile
  tablet: number;  // between mobile and tablet is "tablet"
  desktop: number; // above or equal this is desktop
}

export function useResponsive(overrides: Partial<Breakpoints> = {}) {
  const defaultBps: Breakpoints = {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
  };
  const { mobile, tablet, desktop } = { ...defaultBps, ...overrides };

  const width = ref<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  const height = ref<number>(typeof window !== "undefined" ? window.innerHeight : 0);
  const isClient = typeof window !== "undefined";

  let rafId: number | null = null;
  const updateSize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  const onResize = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      updateSize();
      rafId = null;
    });
  };

  onMounted(() => {
    if (!isClient) return;
    updateSize();
    window.addEventListener("resize", onResize, { passive: true });
  });

  onBeforeUnmount(() => {
    if (!isClient) return;
    window.removeEventListener("resize", onResize);
    if (rafId !== null) cancelAnimationFrame(rafId);
  });

  const isMobile = computed(() => width.value < mobile);
  const isTablet = computed(() => width.value >= mobile && width.value < tablet);
  const isDesktop = computed(() => width.value >= tablet);

  const above = (bp: keyof Breakpoints) => {
    if (bp === "mobile") return width.value >= mobile;
    if (bp === "tablet") return width.value >= tablet;
    if (bp === "desktop") return width.value >= desktop;
    return false;
  };

  const below = (bp: keyof Breakpoints) => {
    if (bp === "mobile") return width.value < mobile;
    if (bp === "tablet") return width.value < tablet;
    if (bp === "desktop") return width.value < desktop;
    return false;
  };

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    above,
    below,
  };
}
