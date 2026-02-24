import { onMounted } from "vue";
import { trackUser } from "../services/tracker.service";

export function useTracker() {
  onMounted(() => {
    trackUser();
  });
}