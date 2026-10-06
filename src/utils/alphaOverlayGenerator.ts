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

  // Helper to draw rounded rectangle
  const drawRoundedRect = (
    c: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    c.beginPath();
    if (typeof c.roundRect === 'function') {
      c.roundRect(x, y, w, h, r);
    } else {
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    }
    c.fill();
  };

  // Shadow 2px (0,0,0,180) per production constraints
  ctx.shadowColor = 'rgba(0, 0, 0, 0.706)'; // (0,0,0,180)
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  // Robust font stack supporting Tamil complex script ligatures ('வு', 'ளி', 'னா', 'நி', etc.)
  const tamilFontStack = `"Noto Sans Tamil", "Mukta Malar", "Catamaran", "Latha", "Tamil Sangam MN", "Arial Unicode MS", sans-serif`;
  const latinFontStack = `600 ${typo.refPx}px "DejaVu Sans", monospace, sans-serif`;
  const tamilRefFontStack = `600 ${typo.refPx}px ${tamilFontStack}`;

  // Measure fonts and use pre-split safe lines (<760px)
  ctx.font = `bold ${typo.tamilPx}px ${tamilFontStack}`;
  const tamilLines = typo.splitTamilLines && typo.splitTamilLines.length > 0 
    ? typo.splitTamilLines 
    : wrapText(line1TamilNormalized, maxWidth);

  ctx.font = `italic ${typo.englishPx}px "Cinzel", "Georgia", "Times New Roman", serif`;
  const englishLines = typo.splitEnglishLines && typo.splitEnglishLines.length > 0 
    ? typo.splitEnglishLines 
    : wrapText(line2EnglishNormalized, maxWidth);

  const refLine = line3RefNormalized;

  // Use exact lifted coordinates calculated by overlayTypographyEngine
  const tamilYCoords = typo.tamilYCoords && typo.tamilYCoords.length >= tamilLines.length
    ? typo.tamilYCoords
    : tamilLines.map((_, i) => 940 + i * 65);

  const englishYCoords = typo.englishYCoords && typo.englishYCoords.length >= englishLines.length
    ? typo.englishYCoords
    : englishLines.map((_, i) => 1110 + i * 45);

  const refY = typo.refYCoord || 1215;

  // Measure widths to ensure the dark plate 100% covers all text lines with zero spill
  let maxLineWidth = 0;
  ctx.font = `bold ${typo.tamilPx}px ${tamilFontStack}`;
  for (const line of tamilLines) {
    const w = ctx.measureText(line).width;
    if (w > maxLineWidth) maxLineWidth = w;
  }
  ctx.font = `italic ${typo.englishPx}px "Cinzel", "Georgia", "Times New Roman", serif`;
  for (const line of englishLines) {
    const w = ctx.measureText(line).width;
    if (w > maxLineWidth) maxLineWidth = w;
  }
  if (refLine.includes('|')) {
    const parts = refLine.split('|');
    const tamilPart = parts[0].trim() + ' | ';
    const englishPart = parts.slice(1).join('|').trim();
    ctx.font = tamilRefFontStack;
    const w1 = ctx.measureText(tamilPart).width;
    ctx.font = latinFontStack;
    const w2 = ctx.measureText(englishPart).width;
    const totalRefW = w1 + w2;
    if (totalRefW > maxLineWidth) maxLineWidth = totalRefW;
  } else {
    ctx.font = latinFontStack;
    const w = ctx.measureText(refLine).width;
    if (w > maxLineWidth) maxLineWidth = w;
  }

  // User Specification:
  // Base Dark Plate: [140, 860, 940, 1360] rounded 18px, 35% opacity
  // Extends 70px lower (to y=1360) with extra padding top/bottom giving breathing room below reference line at y=1215
  // Dynamic extension asserts that under any circumstance the black background covers all of the text overlay with zero spill.
  const firstTextY = Math.min(...tamilYCoords) - (typo.tamilPx * 0.8);
  const lastTextY = refY + (typo.refPx * 0.8);
  const plateYStart = Math.min(860, Math.floor(firstTextY - 24));
  const plateYEnd = Math.max(1360, Math.ceil(lastTextY + 50)); // generous breathing room below ref (extends to at least 1360)

  const paddedWidth = Math.max(800, Math.ceil(maxLineWidth + 60));
  const plateWidth = Math.min(1000, paddedWidth);
  const plateXStart = Math.min(140, Math.floor(540 - (plateWidth / 2)));

  // Render 35% opacity dark plate [140, 860, 940, 1360] with 18px rounded corners
  ctx.save();
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'; // 35% opacity
  drawRoundedRect(ctx, plateXStart, plateYStart, plateWidth, plateYEnd - plateYStart, 18);
  ctx.restore();

  // 1. Render Tamil lines (Golden-Amber #FFC107)
  ctx.fillStyle = '#FFC107';
  ctx.font = `bold ${typo.tamilPx}px ${tamilFontStack}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  tamilLines.forEach((line, i) => {
    const y = tamilYCoords[i] ?? (tamilYCoords[0] + i * 65);
    ctx.fillText(line, 540, y);
  });

  // 2. Render English lines (Off-White Serif #F8F9FA)
  ctx.fillStyle = '#F8F9FA';
  ctx.font = `italic ${typo.englishPx}px "Cinzel", "Georgia", "Times New Roman", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  englishLines.forEach((line, i) => {
    const y = englishYCoords[i] ?? (englishYCoords[0] + i * 45);
    ctx.fillText(line, 540, y);
  });

  // 3. Render Ref (Stone Gray #A8A29E with Mixed-Script Dual-Run Fix)
  ctx.fillStyle = '#A8A29E'; // Stone Gray #A8A29E

  if (refLine.includes('|')) {
    const parts = refLine.split('|');
    const tamilPart = parts[0].trim() + ' | ';
    const englishPart = parts.slice(1).join('|').trim();

    ctx.font = tamilRefFontStack;
    const wTamil = ctx.measureText(tamilPart).width;

    ctx.font = latinFontStack;
    const wEnglish = ctx.measureText(englishPart).width;

    const totalWidth = wTamil + wEnglish;
    const startX = 540 - (totalWidth / 2);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    // Render Tamil part with Tamil font
    ctx.font = tamilRefFontStack;
    ctx.fillText(tamilPart, startX, refY);

    // Render English part with Latin font
    ctx.font = latinFontStack;
    ctx.fillText(englishPart, startX + wTamil, refY);

    ctx.textAlign = 'center'; // Reset alignment
  } else {
    // Single language fallback
    const isTamil = /[\u0B80-\u0BFF]/.test(refLine);
    ctx.font = isTamil ? tamilRefFontStack : latinFontStack;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(refLine, 540, refY);
  }

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
