import { ShortsBlueprint, PraiseItem } from '../types';
import { getEnglishReference } from './bibleTranslations';
import { generateCharacterExpression, buildInculcatedVideoPrompt } from './characterExpressionEngine';
import { getNKJVData } from './nkjvTranslations';
import { computeOverlayTypography } from './overlayTypographyEngine';

/**
 * Formats a ShortsBlueprint into the exact template requested by the user
 */
export function formatBlueprintAsText(b: ShortsBlueprint): string {
  return `${formatVideoGenerationOnlyText(b)}

${formatYouTubeOnlyText(b)}`;
}

/**
 * Converts a string into uppercase Unicode codepoints
 * e.g. "தேவனே" -> "U+0BA4 U+0BC7 U+0BB5 U+0BA9 U+0BC7"
 */
export function getUnicodeCodepoints(text: string): string {
  return Array.from(text)
    .map(c => {
      const code = c.codePointAt(0);
      return code ? 'U+' + code.toString(16).toUpperCase().padStart(4, '0') : '';
    })
    .filter(Boolean)
    .join(' ');
}

/**
 * 1) Video Generation Prompt - Simultaneous Video & Audio Generation with Post-Production Overlay
 * Generates 9:16 portrait video and character voiceover audio simultaneously to guarantee perfect lip-sync, followed by code-level transparent text overlay.
 */
export function formatVideoGenerationOnlyText(b: ShortsBlueprint): string {
  const codepoints = getUnicodeCodepoints(b.subtitles.line1Tamil);
  const expr = b.characterExpression;
  const typo = computeOverlayTypography(b.subtitles.line1Tamil, b.subtitles.line2English, b.subtitles.line3Ref);

  return `Short #${b.id}: ${b.tamilTitle}
Tamil Text: ${b.tamilText} (${b.tamilRef})
Biblical English (NKJV): ${b.englishText} (${b.englishRef})
${b.nkjvText ? `📖 Scripture Verse (NKJV): "${b.nkjvText}"\n` : ''}⏱ Target Duration: Strictly 10 seconds (9:16 Vertical Portrait - 1080x1920)

On-Screen Biblical Character:
${b.character}
${expr ? `🎭 Character Inculcation:
- Facial Expression: ${expr.expression}
- Posture & Hand Gestures: ${expr.gesturePosture}
- Emotional & Theological Context: ${expr.theologicalMood}
` : ''}
Setting:
${b.location}
${expr ? `Atmosphere: ${expr.sceneAtmosphere}\n` : ''}
🎥 SIMULTANEOUS VIDEO & AUDIO GENERATION PROMPT (9:16 VERTICAL PORTRAIT - 1080x1920):
${b.videoPrompt}

🎬 KEY PRODUCTION MANDATES:
1. STRICT 10-SECOND DURATION & 9:16 VERTICAL FORMAT: Video duration MUST be strictly 10.0 seconds in 9:16 vertical portrait format (1080x1920 resolution for YouTube Shorts).
2. SIMULTANEOUS SYNCHRONIZED VIDEO & AUDIO (100% EVEN LIP SYNC): Generate video visuals and character spoken voiceover audio at the exact same time. The character's lip movements MUST be 100% synchronized and even throughout all 10 seconds — articulating every single word without skipping, lagging, or trailing off while audio sounds.
   - Voice Profile: ${b.voiceProfile}
   - Exact Spoken Script (Strictly 10.0s): "${b.audioScript}"
   - Background Audio: ${b.backgroundAudio} (Mixed at -18dB)
3. STRICT ZERO-HALLUCINATION AUDIO ENFORCEMENT: Speak ONLY the exact scripted text above: "${b.audioScript}". No other words, no intro/outro, no unscripted commentary. Zero hallucination.
4. TRUE 1080x1920 CONTENT MANDATE (NO BLACK BARS / FULL-BLEED):
   - Final MP4 pixels MUST BE 1080x1920 of actual video content, never 720x1280 centered inside a 1080x1920 canvas.
   - Strictly forbid letterboxing, pillarboxing, or black borders of any kind.
   - If source is 720x1280, upscale with Lanczos to 1080x1920 to fill the frame completely — full-bleed vertical portrait.
   - Verify with ffprobe: width=1080, height=1920.
5. SHORTS FRAMING MANDATE:
   - Subject placed in lower 1/3rd to 2/3rds of vertical frame, with ~15% headroom above head for outdoor sky/background visibility.
   - Medium close-up chest-up, centered horizontally, face clearly visible.
   - Background must be outdoor authentic 1st-century biblical landscape, NOT interior/kitchen, with no black vignette borders.

${typo.promptAdditionDirective}
- Verification: Exact Unicode codepoints: ${codepoints}`;
}

/**
 * Formats the Subtitle / Text Overlay layout alone with Unicode specs for post-production compositing
 */
export function formatSubtitlesOnlyText(b: ShortsBlueprint): string {
  const codepoints = getUnicodeCodepoints(b.subtitles.line1Tamil);
  const typo = computeOverlayTypography(b.subtitles.line1Tamil, b.subtitles.line2English, b.subtitles.line3Ref);

  return `POST-PRODUCTION OVERLAY — DO NOT BURN IN VIDEO MODEL:
- Generate clean 9:16 plate ONLY, no text.
- I will composite PNG in code with PIL.
- Overlay constraints:
    * Safe width = 760px, left/right padding 160px — NO text outside.
    * Auto-scale: start Tamil 58px, reduce until width <=760, min 28px.
    * If still >760, wrap to 2 lines at natural word break.
    * No black box, only 2px shadow (0,0,0,180).
    * Tamil font: DroidSansTamil-Bold, English: DejaVuSans-Bold, Ref: split fonts.
    * Center at Y 50%, X clamped to safe bounds.
- Content to composite in PNG overlay (${typo.tierLabel}):
    * Line 1 (Tamil, Gold #FFC107, ~${typo.tamilPx}px, center): "${b.subtitles.line1Tamil}"
    * Line 2 (English, White #F8F9FA, ~${typo.englishPx}px): "${b.subtitles.line2English}"
    * Line 3 (Ref, Stone Gray #A8A29E, ~${typo.refPx}px): "${b.subtitles.line3Ref}" — DUAL RUN: Render Tamil ref part in DroidSansTamil-Bold and English part in DejaVuSans-Bold as one centered horizontal block. Prevents box glyphs (□□□□).
- Final encode: H.264 via imageio_ffmpeg libx264, not system ffmpeg libopenh264.
- Verification: Exact Unicode codepoints: ${codepoints}
- Typography Specs:
    * Font Sizes: Tamil: ${typo.tamilFontSizeCanvas} | English: ${typo.englishFontSizeCanvas} | Ref: ${typo.refFontSizeCanvas}
    * Safe Bounds: ${typo.safeMarginWidth}
    * Wrapping: ${typo.recommendedWrap}
    * Content Guarantee: ZERO LOSS OF OVERLAY CONTENT — complete praise text rendered without truncation.`;
}

/**
 * Formats the Video Generation Prompt alone
 */
export function formatVideoPromptOnlyText(b: ShortsBlueprint): string {
  const codepoints = getUnicodeCodepoints(b.subtitles.line1Tamil);
  const typo = computeOverlayTypography(b.subtitles.line1Tamil, b.subtitles.line2English, b.subtitles.line3Ref);

  return `🎥 SIMULTANEOUS VIDEO & AUDIO GENERATION PROMPT (9:16 VERTICAL - PORTRAIT 1080x1920):
${b.videoPrompt}

${typo.promptAdditionDirective}
- Verification: Exact Unicode codepoints: ${codepoints}`;
}

/**
 * Formats the Audio & Voiceover Prompt alone with zero-hallucination mandate
 */
export function formatAudioOnlyText(b: ShortsBlueprint): string {
  return `🎙 AUDIO & VOICEOVER PROMPT (STRICT ZERO-HALLUCINATION SCRIPT & 100% EVEN LIP SYNC):
- Voice Profile: ${b.voiceProfile}
- Voiceover Script (Strictly 10.0s): "${b.audioScript}"
- CRITICAL AUDIO & LIP SYNC DIRECTIVE: Read ONLY the exact scripted text above paced evenly across strictly 10 seconds. Lip movement MUST be 100% even and continuous for every single spoken syllable, articulating every word fully without leaving any word unarticulated or frozen while audio plays. NO EXTRA WORDS, NO INTRO/OUTRO, NO THEOLOGICAL COMMENTARY. Speak only the exact Tamil praise followed by the exact English praise line as scripted. Zero hallucinated sentences.
- Background Audio: ${b.backgroundAudio}`;
}

/**
 * 2) YouTube SEO & Tags alone (Title, Description, Tags CSV, Hashtags CSV)
 */
export function formatYouTubeOnlyText(b: ShortsBlueprint): string {
  return `🏷 YouTube SEO & Tags (Comma-Separated for YouTube Studio):
- Title: ${b.seo.title}
- Description: ${b.seo.description}
- Tags (CSV): ${b.seo.tags.join(', ')}
- Hashtags (CSV): ${b.seo.hashtags.join(', ')}`;
}

import { getConciseEnglishTitle } from './conciseTitleEngine';

/**
 * Extracts ONLY the concise, meaningful English praise title
 * e.g. "Praise to You, Abba, Father", "Praise to You, The Invisible God"
 */
export function getEnglishTitleOnly(b: ShortsBlueprint): string {
  return getConciseEnglishTitle(b);
}

/**
 * Formats the Character Expression and Scene Inculcation details
 */
export function getCharacterExpressionText(b: ShortsBlueprint): string {
  if (!b.characterExpression) return '';
  const expr = b.characterExpression;
  return `Character: ${b.character}
Facial Expression: ${expr.expression}
Posture & Gesture: ${expr.gesturePosture}
Theological Context: ${expr.theologicalMood}
Atmosphere: ${expr.sceneAtmosphere}`;
}

import { getScriptureVerification } from '../data/scriptureVerifications';
import { getFormattedYouTubeDescription } from './descriptionFormatter';

export { getFormattedYouTubeDescription };

/**
 * Extracts ONLY the Tamil praise text with scripture reference
 * e.g. "அப்பா பிதாவே ஸ்தோத்திரம் (ரோம. 8:15)"
 */
export function getTamilPraiseWithRef(b: ShortsBlueprint): string {
  return `${b.tamilTitle} (${b.tamilRef})`;
}

/**
 * Gets the structured Scripture Reference & Translation Verification text
 */
export function getScriptureVerificationText(b: ShortsBlueprint): string {
  if (b.verification?.fullVerificationText) {
    return b.verification.fullVerificationText;
  }
  return getScriptureVerification(b).fullVerificationText;
}

/**
 * Dynamic generator for remaining praises (101-1000) so the entire collection
 * is instantly accessible with full biblical and 1st-century context
 */
export function generateDynamicBlueprint(item: PraiseItem): ShortsBlueprint {
  const engRef = getEnglishReference(item.reference);
  
  // Clean tamil verse
  const cleanTamil = item.text.trim();
  const cleanTitle = cleanTamil.replace(/ஸ்தோத்திரம்\.?$/, '').trim() || cleanTamil;

  const baseBlueprint: ShortsBlueprint = {
    id: item.id,
    tamilTitle: cleanTamil,
    tamilText: cleanTamil,
    tamilRef: item.reference,
    englishText: `Praise to You, ${cleanTitle}`,
    englishRef: engRef,
    character: "Devout Galilean disciple or biblical witness in first-century Judea",
    location: "Authentic first-century biblical landscape in Galilee or Jerusalem",
    videoPrompt: "",
    voiceProfile: `Devout, reverent voice authentically matching the on-screen biblical witness with solemn adoration, emotional depth, and prayerful cadence.`,
    audioScript: `[Pause] ${cleanTamil} ... Praise to You, ${cleanTitle}.`,
    backgroundAudio: "Sacred acoustic D-major worship pad with ambient string undertones at -18dB.",
    subtitles: {
      line1Tamil: cleanTamil,
      line2English: `Praise to You, ${cleanTitle}`,
      line3Ref: `📖 ${item.reference} | ${engRef}`
    },
    seo: {
      title: `Short #${item.id} | ${cleanTamil} | Praise to You, ${cleanTitle} | Gracy’s Biblical Echoes`,
      description: '',
      tags: [cleanTitle, engRef, "NKJV", "Gracy's Biblical Echoes", "GracysBiblicalEchoes", "Tamil Praise", "30 AD Bible", "1000 Praises", "Tamil", "TamilNadu", "Chennai", "TamilVlog", "Tanglish", "TamilYouTuber"],
      hashtags: ["#GracysBiblicalEchoes", "#BiblicalEchoes", "#1000Praises", "#TamilChristian", "#BibleVerse", "#Shorts", "#NKJV"]
    }
  };

  const nkjv = getNKJVData(baseBlueprint);
  const expr = generateCharacterExpression(baseBlueprint);
  const videoPromptInculcated = buildInculcatedVideoPrompt(baseBlueprint, expr);
  const resolvedEnglish = (nkjv.praiseTitle || baseBlueprint.englishText).replace(/\.$/, '').trim();
  const conciseTitle = getConciseEnglishTitle(baseBlueprint, item.id);

  const enriched: ShortsBlueprint = {
    ...baseBlueprint,
    englishText: resolvedEnglish,
    audioScript: `[Pause] ${cleanTamil} ... ${resolvedEnglish}.`,
    voiceProfile: `Devout, reverent voice authentically matching the on-screen biblical character with solemn adoration, emotional depth, and prayerful cadence.`,
    nkjvText: nkjv.verseText,
    translationVersion: 'NKJV',
    characterExpression: expr,
    videoPrompt: videoPromptInculcated,
    subtitles: {
      ...baseBlueprint.subtitles,
      line1Tamil: cleanTamil,
      line2English: resolvedEnglish
    },
    seo: {
      ...baseBlueprint.seo,
      title: `${cleanTamil} | ${conciseTitle} | 1000 Praises #${item.id} | Gracy's Biblical Echoes`,
      description: getFormattedYouTubeDescription({
        id: item.id,
        tamilTitle: cleanTamil,
        tamilRef: item.reference,
        tamilText: cleanTamil
      })
    }
  };

  return {
    ...enriched,
    verification: getScriptureVerification(enriched)
  };
}
