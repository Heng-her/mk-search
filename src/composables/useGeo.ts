import { ref } from 'vue';

export const countryCode = ref('');
export const isLoadingGeo = ref(true);

let fetchPromise: Promise<void> | null = null;

export const fetchGeo = async () => {
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const response = await fetch("https://ipapi.co/json/", { cache: "no-store", signal: AbortSignal.timeout(4000) });
      const data = await response.json();
      if (!data.error) {
        countryCode.value = data.country_code || 'KH';
      } else {
        countryCode.value = 'KH';
      }
    } catch (error) {
      console.warn("⚠️ Failed to detect location, falling back to KH.", error);
      countryCode.value = 'KH';
    } finally {
      isLoadingGeo.value = false;
    }
  })();
  
  return fetchPromise;
}
