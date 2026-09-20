import { ShortsBlueprint } from '../types';
import { computeOverlayTypography } from './overlayTypographyEngine';

/**
 * Generates a true 1080x1920 alpha text overlay PNG with exact typography,
 * golden-amber styling, drop shadow, and centered safe-zone layout.
 */
export async function generateAlphaOverlayBlob(blueprint: ShortsBlueprint): Promise<Blob> {
  // Ensure fonts like Noto Sans Tamil & Mukta Malar are fully loaded before rendering
  try {
    if (document && document.fonts) {
      await document.fonts.ready;
    }
  } catch {
    // Fallback if fonts.ready API is unsupported
  }

  // Canonical NFC normalization to ensure combining vowel signs like 'ு' (U+0BC1) on 'வ' (U+0BB5) form perfect 'வு' glyph ligatures
  const line1TamilNormalized = blueprint.subtitles.line1Tamil.normalize('NFC');
  const line2EnglishNormalized = blueprint.subtitles.line2English.normalize('NFC');
  const line3RefNormalized = blueprint.subtitles.line3Ref.normalize('NFC');

  const typo = computeOverlayTypography(
    line1TamilNormalized,
    line2EnglishNormalized,
    line3RefNormalized
  );

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // Transparent background (true alpha)
  ctx.clearRect(0, 0, 1080, 1920);

  // Setup text rendering
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Helper to wrap text into lines fitting max width
  const wrapText = (text: string, maxW: number): string[] => {
    const words = text.split(' ');
    if (words.length <= 1) return [text];
    
    // Check if whole text fits
    if (ctx.measureText(text).width <= maxW) return [text];

    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      if (ctx.measureText(testLine).width > maxW) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const maxWidth = 760; // Strict YouTube Shorts safe width (160px padding on left & right to prevent UI overlay/edge clipping)
  const centerY = 960;  // 50% vertical safe zone

  // No drop-shadow: Keep overlay crisp and unobtrusive so background video is clearly visible
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Robust font stack supporting Tamil complex script ligatures ('வு', 'ளி', 'னா', 'நி', etc.)
  const tamilFontStack = `"Noto Sans Tamil", "Mukta Malar", "Catamaran", "Latha", "Tamil Sangam MN", "Arial Unicode MS", sans-serif`;

  // Measure fonts
  ctx.font = `bold ${typo.tamilPx}px ${tamilFontStack}`;
  const tamilLines = wrapText(line1TamilNormalized, maxWidth);

  ctx.font = `italic ${typo.englishPx}px "Cinzel", "Georgia", "Times New Roman", serif`;
  const englishLines = wrapText(line2EnglishNormalized, maxWidth);

  const refLine = line3RefNormalized;

  // Calculate vertical layout & spacing
  const tamilLineHeight = typo.tamilPx * 1.32;
  const englishLineHeight = typo.englishPx * 1.35;
  const gap1 = 28; // gap between Tamil and English
  const gap2 = 22; // gap between English and Ref

  const totalTamilH = tamilLines.length * tamilLineHeight;
  const totalEnglishH = englishLines.length * englishLineHeight;
  const totalRefH = typo.refPx;

  const totalBlockH = totalTamilH + gap1 + totalEnglishH + gap2 + totalRefH;
  let startY = centerY - (totalBlockH / 2);

  // 1. Render Tamil lines (Golden-Amber)
  ctx.fillStyle = '#FFC107';
  ctx.font = `bold ${typo.tamilPx}px ${tamilFontStack}`;
  for (const line of tamilLines) {
    ctx.fillText(line, 540, startY + (tamilLineHeight / 2));
    startY += tamilLineHeight;
  }

  startY += gap1;

  // 2. Render English lines (Off-White Serif)
  ctx.fillStyle = '#F8F9FA';
  ctx.font = `italic ${typo.englishPx}px "Cinzel", "Georgia", "Times New Roman", serif`;
  for (const line of englishLines) {
    ctx.fillText(line, 540, startY + (englishLineHeight / 2));
    startY += englishLineHeight;
  }

  startY += gap2;

  // 3. Render Ref (Muted Stone)
  ctx.fillStyle = '#D6D3D1';
  ctx.font = `600 ${typo.refPx}px monospace, sans-serif`;
  ctx.fillText(refLine, 540, startY + (totalRefH / 2));

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate Alpha PNG Blob'));
    }, 'image/png');
  });
}

/**
 * Initiates browser download of the generated 1080x1920 Alpha PNG
 */
export async function downloadAlphaOverlayPng(blueprint: ShortsBlueprint): Promise<void> {
  const blob = await generateAlphaOverlayBlob(blueprint);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `short_${blueprint.id}_alpha_overlay_1080x1920.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
