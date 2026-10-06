import { CompletionStatusMap, ShortCompletionStatus } from '../types';

const STORAGE_KEY = 'gracy_completion_markers_v1';

/**
 * Creates the default initial status:
 * - Up till 30: YouTube deployed (and Video generated)
 * - Up till 47: Video generated
 * - 48 to 300: Pending
 */
export function createDefaultCompletionStatus(totalCount: number = 300): CompletionStatusMap {
  const map: CompletionStatusMap = {};
  for (let i = 1; i <= totalCount; i++) {
    map[i] = {
      youtubeDeployed: i <= 30,
      videoGenerated: i <= 47,
    };
  }
  return map;
}

/**
 * Loads completion status from localStorage, or initializes with defaults.
 */
export function loadCompletionStatus(totalCount: number = 300): CompletionStatusMap {
  if (typeof window === 'undefined') {
    return createDefaultCompletionStatus(totalCount);
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createDefaultCompletionStatus(totalCount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw) as CompletionStatusMap;
    // Ensure all 1..totalCount IDs exist
    let changed = false;
    for (let i = 1; i <= totalCount; i++) {
      if (!parsed[i]) {
        parsed[i] = {
          youtubeDeployed: i <= 30,
          videoGenerated: i <= 47,
        };
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (err) {
    console.warn('Failed to parse completion markers from localStorage, using defaults:', err);
    return createDefaultCompletionStatus(totalCount);
  }
}

/**
 * Saves completion status map to localStorage.
 */
export function saveCompletionStatus(map: CompletionStatusMap): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    console.error('Failed to save completion markers to localStorage:', err);
  }
}

/**
 * Toggles Video Generated for a given Short ID
 */
export function toggleVideoGeneratedStatus(
  prevMap: CompletionStatusMap,
  id: number
): CompletionStatusMap {
  const current = prevMap[id] || { videoGenerated: false, youtubeDeployed: false };
  const updated: ShortCompletionStatus = {
    ...current,
    videoGenerated: !current.videoGenerated,
  };
  const next = { ...prevMap, [id]: updated };
  saveCompletionStatus(next);
  return next;
}

/**
 * Toggles YouTube Deployed for a given Short ID
 */
export function toggleYouTubeDeployedStatus(
  prevMap: CompletionStatusMap,
  id: number
): CompletionStatusMap {
  const current = prevMap[id] || { videoGenerated: false, youtubeDeployed: false };
  const willBeDeployed = !current.youtubeDeployed;
  const updated: ShortCompletionStatus = {
    ...current,
    youtubeDeployed: willBeDeployed,
    // If marking as deployed to YouTube, video must also be generated
    videoGenerated: willBeDeployed ? true : current.videoGenerated,
  };
  const next = { ...prevMap, [id]: updated };
  saveCompletionStatus(next);
  return next;
}

/**
 * Sets Video Generated up to a specific Short ID
 */
export function setVideoGeneratedUpTo(
  prevMap: CompletionStatusMap,
  upToId: number,
  totalCount: number = 300
): CompletionStatusMap {
  const next = { ...prevMap };
  for (let i = 1; i <= totalCount; i++) {
    const cur = next[i] || { videoGenerated: false, youtubeDeployed: false };
    next[i] = {
      ...cur,
      videoGenerated: i <= upToId,
    };
  }
  saveCompletionStatus(next);
  return next;
}

/**
 * Sets YouTube Deployed up to a specific Short ID
 */
export function setYouTubeDeployedUpTo(
  prevMap: CompletionStatusMap,
  upToId: number,
  totalCount: number = 300
): CompletionStatusMap {
  const next = { ...prevMap };
  for (let i = 1; i <= totalCount; i++) {
    const cur = next[i] || { videoGenerated: false, youtubeDeployed: false };
    const isDeployed = i <= upToId;
    next[i] = {
      ...cur,
      youtubeDeployed: isDeployed,
      videoGenerated: isDeployed ? true : cur.videoGenerated,
    };
  }
  saveCompletionStatus(next);
  return next;
}

/**
 * Computes counts and percentages
 */
export function getCompletionMetrics(map: CompletionStatusMap, totalCount: number = 300) {
  let videoCount = 0;
  let ytCount = 0;
  for (let i = 1; i <= totalCount; i++) {
    if (map[i]?.videoGenerated) videoCount++;
    if (map[i]?.youtubeDeployed) ytCount++;
  }
  return {
    videoCount,
    ytCount,
    videoPercent: Math.round((videoCount / totalCount) * 100),
    ytPercent: Math.round((ytCount / totalCount) * 100),
  };
}
