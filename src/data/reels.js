/**
 * YouTube Shorts from the shop's channel, newest first.
 * `label` is a key in src/i18n/ui/*.js → reels.labels (translated card title).
 * To add a Short: add { id, label } here, save its thumbnail (see scripts/process-reels.mjs) and run that script.
 */
export const youtubeChannel = {
  handle: '@Aarusfancysarees',
  url: 'https://www.youtube.com/@Aarusfancysarees',
  shortsUrl: 'https://www.youtube.com/@Aarusfancysarees/shorts',
};

export const reels = [
  { id: 'QK92dBjreCI', label: 'customers' },
  { id: 'UnWZ3I5-HUM', label: 'live' },
  { id: 'q77mxa_Od1c', label: 'templeJewellery' },
  { id: 'lM6MvVsVSmA', label: 'kundanJewellery' },
  { id: 'snbDfR5VNKA', label: 'redDrape' },
  { id: 'HcEBQ9viszY', label: 'printedSaree' },
  { id: 'YnY1FeX4Ji4', label: 'bandhej' },
  { id: 'Kt69IpR40cE', label: 'cotton' },
  { id: 'cwIhGL4KoPM', label: 'silkDrape' },
  { id: '2zNXoaf6Buk', label: 'cottonCollection' },
  { id: 'D1cbW6JH8gA', label: 'paithaniPattern' },
  { id: 'A0eohek1VCg', label: 'gudiPadwa' },
  { id: 'RkDBnFpg7D4', label: 'gudiPadwaLook' },
  { id: 'I1nz3qWAXBA', label: 'ivoryDrape' },
  { id: 'xdRoYPtM8Ig', label: 'paithaniDrape' },
  { id: 'f9XuwG3KstI', label: 'lotusPaithani' },
  { id: '-jRWnRkbozY', label: 'maheshwari' },
  { id: 'vcpavLke0aY', label: 'silkCollection' },
  { id: '4n6oD5RLSP0', label: 'festiveRed' },
];

const THUMB_DIR = '/images/reels';

/** Local upright thumbnail (no request to YouTube until the visitor presses play). */
export const reelThumb = (id) => ({
  src: `${THUMB_DIR}/${id}-540.webp`,
  srcSet: `${THUMB_DIR}/${id}-360.webp 360w, ${THUMB_DIR}/${id}-540.webp 540w`,
  width: 540,
  height: 960,
});

/** Privacy-enhanced embed URL (youtube-nocookie), autoplaying once opened. */
export const reelEmbed = (id) =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${encodeURIComponent(id)}`;

export const reelWatchUrl = (id) => `https://www.youtube.com/shorts/${encodeURIComponent(id)}`;
