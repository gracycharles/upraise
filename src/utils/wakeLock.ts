/**
 * Screen Wake Lock & Fullscreen utilities for continuous display
 */

export async function requestScreenWakeLock(): Promise<WakeLockSentinel | null> {
  if ('wakeLock' in navigator) {
    try {
      const sentinel = await navigator.wakeLock.request('screen');
      return sentinel;
    } catch (err) {
      console.warn('Screen WakeLock could not be acquired:', err);
      return null;
    }
  }
  return null;
}

export function toggleFullScreen(): void {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn('Error attempting to enable fullscreen:', err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
