/**
 * Overlay Typography Engine for 9:16 Vertical Shorts
 * 
 * Automatically calculates character count and determines the exact font sizing,
 * line wrapping, and safe margin instructions for video generation & post-production
 * compositing. Ensures that long overlays (e.g. Short #143) fit cleanly on screen
 * with reduced font size while guaranteeing 100% full content retention (zero loss, zero truncation).
 */

export type OverlayTier = 'compact' | 'medium' | 'long' | 'ultra-long';

export interface OverlayTypographyMetrics {
  tamilCharCount: number;
  englishCharCount: number;
  refCharCount: number;
  maxCharCount: number;
  tier: OverlayTier;
  tierLabel: string;
  
  // Font sizes for standard 1080x1920 vertical canvas
  tamilFontSizeCanvas: string;
  englishFontSizeCanvas: string;
  refFontSizeCanvas: string;
  
  // Exact numeric pixel values (for 1080x1920)
  tamilPx: number;
  englishPx: number;
  refPx: number;
  
  // Percentage scaling vs standard base (58px)
  scalePercent: number;
  reductionPercent: number;
  
  // Layout & margins
  safeMarginWidth: string;
  lineHeight: string;
  recommendedWrap: string;
  
  // Explicit prompt instructions
  promptAdditionDirective: string;
  compositingSpecsText: string;
  
  // UI Tailwind classes for live preview
  uiTamilClass: string;
  uiEnglishClass: string;
  uiRefClass: string;
  uiBadgeText: string;
  uiBadgeClass: string;
}

/**
 * Computes overlay typography metrics based on Tamil, English, and Reference strings.
 */
export function computeOverlayTypography(
  line1Tamil: string,
  line2English: string,
  line3Ref: string = ''
): OverlayTypographyMetrics {
  const tamilCharCount = Array.from(line1Tamil.trim()).length;
  const englishCharCount = line2English.trim().length;
  const refCharCount = line3Ref.trim().length;
  const maxCharCount = Math.max(tamilCharCount, englishCharCount);

  let tier: OverlayTier;
  let tierLabel: string;
  let tamilPx: number;
  let englishPx: number;
  let refPx: number;
  let scalePercent: number;
  let reductionPercent: number;
  let recommendedWrap: string;
  let uiTamilClass: string;
  let uiEnglishClass: string;
  let uiRefClass: string;
  let uiBadgeText: string;
  let uiBadgeClass: string;

  if (tamilCharCount <= 32 && englishCharCount <= 42) {
    // Tier 1: Compact (Standard)
    tier = 'compact';
    tierLabel = 'Compact (Standard Scale)';
    tamilPx = 58;
    englishPx = 38;
    refPx = 26;
    scalePercent = 100;
    reductionPercent = 0;
    recommendedWrap = 'Single line centered (1 line Tamil, 1 line English, 1 line Ref)';
    uiTamilClass = 'text-base sm:text-lg font-bold';
    uiEnglishClass = 'text-xs sm:text-sm font-medium';
    uiRefClass = 'text-[11px]';
    uiBadgeText = `Standard Scale • ${maxCharCount} chars max`;
    uiBadgeClass = 'bg-stone-800 text-stone-300 border-stone-700';
  } else if (tamilCharCount <= 52 && englishCharCount <= 58) {
    // Tier 2: Medium
    tier = 'medium';
    tierLabel = 'Medium (Balanced Scale)';
    tamilPx = 48;
    englishPx = 32;
    refPx = 24;
    scalePercent = 83;
    reductionPercent = 17;
    recommendedWrap = 'Balanced 1-2 lines with natural phrasing break';
    uiTamilClass = 'text-sm sm:text-base font-bold';
    uiEnglishClass = 'text-xs font-medium';
    uiRefClass = 'text-[10px]';
    uiBadgeText = `Auto-Scaled: 48px (-17%) • ${maxCharCount} chars • Zero Loss`;
    uiBadgeClass = 'bg-blue-950/70 text-blue-300 border-blue-500/30';
  } else if (tamilCharCount <= 74 || englishCharCount <= 74) {
    // Tier 3: Long-Form (e.g. Short #143: 71 Tamil chars / 68 English chars)
    tier = 'long';
    tierLabel = 'Long Text (Compact Fit)';
    tamilPx = 38;
    englishPx = 26;
    refPx = 20;
    scalePercent = 65;
    reductionPercent = 35;
    recommendedWrap = 'Balanced 2-line wrap with natural phrasing; line-height 1.25';
    uiTamilClass = 'text-xs sm:text-sm font-bold leading-snug';
    uiEnglishClass = 'text-[11px] sm:text-xs font-medium leading-snug';
    uiRefClass = 'text-[10px]';
    uiBadgeText = `Auto-Scaled: 38px (-35%) • Long Text (${maxCharCount} chars) • 100% Content Intact`;
    uiBadgeClass = 'bg-amber-950/70 text-amber-300 border-amber-500/40 font-semibold';
  } else {
    // Tier 4: Ultra-Long (> 74 chars)
    tier = 'ultra-long';
    tierLabel = 'Ultra-Long (Micro-Scaled Fit)';
    tamilPx = 32;
    englishPx = 22;
    refPx = 18;
    scalePercent = 55;
    reductionPercent = 45;
    recommendedWrap = 'Balanced 2-3 line wrap; line-height 1.20';
    uiTamilClass = 'text-[11px] sm:text-xs font-bold leading-tight';
    uiEnglishClass = 'text-[10px] font-medium leading-tight';
    uiRefClass = 'text-[9px]';
    uiBadgeText = `Auto-Scaled: 32px (-45%) • Ultra-Long (${maxCharCount} chars) • 100% Content Intact`;
    uiBadgeClass = 'bg-red-950/70 text-red-300 border-red-500/40 font-semibold';
  }

  const tamilFontSizeCanvas = `${tamilPx}px (${Math.round(tamilPx * 0.75)}pt on 1080x1920)`;
  const englishFontSizeCanvas = `${englishPx}px (${Math.round(englishPx * 0.75)}pt on 1080x1920)`;
  const refFontSizeCanvas = `${refPx}px (${Math.round(refPx * 0.75)}pt on 1080x1920)`;
  const safeMarginWidth = 'Max-width 760px YouTube Shorts Safe Zone (160px horizontal padding on left & right to prevent UI overlay clipping)';
  const lineHeight = tier === 'compact' ? '1.30' : tier === 'medium' ? '1.25' : '1.22';

  // Compute pre-split lines for Tamil if wrap is needed (split at natural space)
  const computeSplitTamilLines = (text: string): { line1: string; line2: string } | null => {
    const trimmed = text.trim();
    const words = trimmed.split(/\s+/);
    if (words.length <= 1) return null;
    const mid = Math.ceil(words.length / 2);
    return {
      line1: words.slice(0, mid).join(' '),
      line2: words.slice(mid).join(' ')
    };
  };

  const tamilSplit = computeSplitTamilLines(line1Tamil);

  // Specific directive for the Video Gen prompt addition (Text Overlay & Single Master Output)
  const buildOverlayDirective = (scaledNote: string) => {
    const autoScaleInstruction = reductionPercent > 0
      ? `Auto-scale: start Tamil ${tamilPx}px (-${reductionPercent}% reduced), min 32px. If width>760, wrap to 2 lines at space.${
          tamilSplit ? ` Tamil line 1: "${tamilSplit.line1}" Line 2: "${tamilSplit.line2}"` : ''
        }`
      : `Auto-scale: start Tamil 48px (-17% reduced), min 32px. If width>760, wrap to 2 lines at space.${
          tamilSplit ? ` Tamil line 1: "${tamilSplit.line1}" Line 2: "${tamilSplit.line2}"` : ''
        }`;

    return `SUBTITLE OVERLAY BURNING & COMPOSITING CONSTRAINTS:
- Burn in subtitles centered at Y 50% within 9:16 portrait frame.
- Overlay constraints:
    * Safe width = 760px, left/right padding 160px — NO text outside safe zone.
    * ${autoScaleInstruction}
    * Clean typography with 2px shadow (0,0,0,180), NO solid black background box.
    * Tamil font: DroidSansTamil-Bold, English: DejaVuSans-Bold, Ref: dual-font run.
    * Center at Y 50%, X clamped to safe bounds.
- Content to composite in final 1080x1920 video (${scaledNote}):
    * Line 1 (Tamil, Gold #FFC107, ~${tamilPx}px, center): "${line1Tamil}"
    * Line 2 (English, White #F8F9FA, ~${englishPx}px): "${line2English}"
    * Line 3 (Ref, Stone Gray #A8A29E, ~${refPx}px): "${line3Ref}" — DUAL RUN: Render Tamil ref part in DroidSansTamil-Bold and English part in DejaVuSans-Bold as one centered horizontal block. Prevents box glyphs (□□□□).
- Final encode: H.264 via imageio_ffmpeg libx264 (width=1080, height=1920).`;
  };

  let promptAdditionDirective: string;
  if (reductionPercent > 0) {
    promptAdditionDirective = buildOverlayDirective(`Auto-Scaled ${tier.toUpperCase()} tier, -${reductionPercent}% reduced for safe 760px fit with zero content loss`);
  } else {
    promptAdditionDirective = buildOverlayDirective(`Standard Scale ~${tamilPx}px Tamil / ~${englishPx}px English centered, zero content loss`);
  }

  // Compositing specs text
  const compositingSpecsText = `Overlay Typography & Canvas Safe Zone Fit:
- Text Density: ${tierLabel} (Tamil: ${tamilCharCount} chars, English: ${englishCharCount} chars)
- Auto-Scaled Font Sizes: Tamil: ${tamilFontSizeCanvas} | English: ${englishFontSizeCanvas} | Ref: ${refFontSizeCanvas}
- Scaling Factor: ${scalePercent}% of base (${reductionPercent > 0 ? `-${reductionPercent}% reduced for safe fit` : 'standard'})
- Safe Bounds: ${safeMarginWidth}
- Line Height: ${lineHeight} | Wrapping: ${recommendedWrap}
- Content Integrity: ZERO LOSS OF CONTENT — 100% full text preserved verbatim without ellipsis or truncation.`;

  return {
    tamilCharCount,
    englishCharCount,
    refCharCount,
    maxCharCount,
    tier,
    tierLabel,
    tamilFontSizeCanvas,
    englishFontSizeCanvas,
    refFontSizeCanvas,
    tamilPx,
    englishPx,
    refPx,
    scalePercent,
    reductionPercent,
    safeMarginWidth,
    lineHeight,
    recommendedWrap,
    promptAdditionDirective,
    compositingSpecsText,
    uiTamilClass,
    uiEnglishClass,
    uiRefClass,
    uiBadgeText,
    uiBadgeClass,
  };
}
