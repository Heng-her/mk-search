import { onMounted } from "vue";
import { useGeolocation, watchOnce } from "@vueuse/core";
import { trackUser } from "../services/tracker.service";
import { useRoute } from "vue-router";

export function useTracker() {
  const route = useRoute();
  const { coords, resume, pause } = useGeolocation();

  onMounted(() => {
    // We only want to track precise location once per session/load
    // after the user grants permission.
    watchOnce(coords, (newCoords: any) => {
      if (
        newCoords.latitude !== Infinity &&
        newCoords.longitude !== Infinity
      ) {
        trackUser(route.fullPath, newCoords.latitude, newCoords.longitude);
        // After sending coordinates once, we can stop the watcher
        pause();
      }
    });

    // Start tracking
    resume();
  });
}
