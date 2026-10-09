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
Biblical English Translation: ${b.englishText} (${b.englishRef})
${b.nkjvText ? `📖 Scripture Verse: "${b.nkjvText}"\n` : ''}⏱ Target Duration: Strictly 10 seconds (9:16 Vertical Portrait - 1080x1920)

📺 ON-SCREEN TEXT OVERLAY CONTENT & TRANSLATION (BURN-IN SUBTITLES):
${typo.promptAdditionDirective}
- Verification: Exact Unicode codepoints: ${codepoints}

On-Screen Biblical Character:
${b.character}
${expr ? `🎭 Character Cinematography & Inculcation:
- Camera Framing & Shot: ${expr.cameraFraming || 'Dynamic Cinematic Framing (9:16 Vertical)'}
- Physical Posture & Action: ${expr.gesturePosture}
- Facial Expression: ${expr.expression}
- Emotional & Theological Context: ${expr.theologicalMood}
` : ''}
Setting:
${b.location}
${expr ? `Atmosphere: ${expr.sceneAtmosphere}\n` : ''}
🎥 SIMULTANEOUS VIDEO & AUDIO GENERATION PROMPT (9:16 VERTICAL PORTRAIT - 1080x1920):
${b.videoPrompt}

🎬 KEY PRODUCTION MANDATES:
1. STRICT 10-SECOND DURATION & 9:16 VERTICAL FORMAT: Video duration MUST be strictly 10.0 seconds in 9:16 vertical portrait format (1080x1920 resolution for YouTube Shorts).
2. NATIVE TAMIL AUDIO PRONUNCIATION & 100% EVEN LIP SYNC (ZERO HALLUCINATION):
   - Native Tamil Speaker & Authentic Phonetics: Base video & voiceover MUST be generated with authentic native Tamil speaker phonetics (pure Tamil Nadu pronunciation). Ensure exact conjunct and consonant pronunciation for all Tamil words (including conjuncts like க்க, ப்ப, ண்ணு, த்தா, ஸ்தோ). Syllable stress and inflection must be 100% natural and authentic Tamil, never butchered, anglicized, or mispronounced.
   - Character Voice & Tone: Clear, reverent British young female voice tone or authentic biblical witness character voice matching ${b.character} — ${b.voiceProfile}.
   - 100% Synchronized Lip Sync (Strictly 10.0s): Generate video visuals and character voiceover simultaneously. Lip movements MUST be 100% synchronized, continuous, and even throughout all 10 seconds, articulating every single word and syllable of both the Tamil praise (first half) and English translation (second half). No frozen lips, no audio-visual lag. Speak ONLY the exact scripted text: "${b.audioScript}".
   - Background Audio: ${b.backgroundAudio} (Mixed at -18dB).
3. TRUE 1080x1920 RESOLUTION & PRE-SCALE BURN-IN MANDATE (NO OFF-SCREEN CROP):
   - Final MP4 canvas MUST BE true 1080x1920 vertical portrait (full-bleed, strictly forbid letterboxing, pillarboxing, or black borders).
   - CRITICAL PRE-SCALE MANDATE: If source/raw video is 720x1280, upscale to 1080x1920 with Lanczos FIRST before burning on-screen text overlay. NEVER burn text onto 720x1280 and then scale up to 1080x1920 (which multiplies y-coordinates by 1.5x and pushes text out of frame into the bottom YouTube crop).
   - Encode with imageio_ffmpeg libx264 (pixel format yuv420p, CRF 18). FORBID mp4v codec (which fails preview in Shorts player).
   - Verify with ffprobe: width=1080, height=1920, pix_fmt=yuv420p, codec_name=h264, duration 10.0s.
4. SHORTS FRAMING & CINEMATOGRAPHY MANDATE:
   - Dynamic camera framing matching the prompt (ranging across Wide Environmental, Low-Angle Reverent, Medium-Wide 3/4, Side Profile Tracking, Over-the-Shoulder, and Eye-Level Medium).
   - Subject framed naturally with ~15% headroom for vertical 9:16 safe-zone, face clearly visible during synchronized speech articulation.
   - Forbid repetitive hand-on-chest or static poses; ensure active physical interaction with the historic environment.
   - Background must be outdoor authentic 1st-century biblical landscape with natural atmospheric lighting, NOT interior/kitchen, with no black vignette borders.
5. YOUTUBE SHORTS SAFE-ZONE TEXT OVERLAY MANDATE (CLEAN TRANSPARENT • NO BLACK BACKGROUND):
   - CLEAN TRANSPARENT TEXT OVERLAY (NO BLACK BACKGROUND): Strictly NO black background, NO dark plate, NO black box or vignette behind the text overlay. Overlay is 100% transparent with subtle 2px drop-shadow (0,0,0,180) for contrast directly over the 1080x1920 video frame.
   - YouTube Shorts UI occludes: bottom 350px (title, description, channel info), right 180px (like, comment, share, subscribe), top 120px (search).
   - SUBTITLE SAFE AREA = x: 160-900px (760px safe width), y: 750-1250px (center band only). Max y=1300. Bottom 350px UI strictly clear.
   - Center horizontally at x=540 anchor="mm".
   - Pillow HarfBuzz Shaping: language="ta", font Noto Sans Tamil Bold, anchor="mm"/"lm" so conjuncts (க்க, ப்ப, ண்ணு, த்தா, ஸ்தோ) form correctly. FORBID raw ffmpeg drawtext filter.`;
}

/**
 * Formats the Subtitle / Text Overlay layout alone with Unicode specs for post-production compositing
 */
export function formatSubtitlesOnlyText(b: ShortsBlueprint): string {
  const codepoints = getUnicodeCodepoints(b.subtitles.line1Tamil);
  const typo = computeOverlayTypography(b.subtitles.line1Tamil, b.subtitles.line2English, b.subtitles.line3Ref);

  return `${typo.promptAdditionDirective}
- Verification: Exact Unicode codepoints: ${codepoints}
- Typography Specs:
    * Font Sizes: Tamil: ${typo.tamilFontSizeCanvas} | English: ${typo.englishFontSizeCanvas} | Ref: ${typo.refFontSizeCanvas}
    * Safe Bounds: ${typo.safeMarginWidth}
    * Wrapping: ${typo.recommendedWrap}
    * Overlay Background: 100% Clean Transparent (NO black background / NO dark plate)
    * Content Guarantee: ZERO LOSS OF OVERLAY CONTENT — complete praise text rendered without truncation.`;
}

/**
 * Formats the Video Generation Prompt alone
 */
export function formatVideoPromptOnlyText(b: ShortsBlueprint): string {
  const codepoints = getUnicodeCodepoints(b.subtitles.line1Tamil);
  const typo = computeOverlayTypography(b.subtitles.line1Tamil, b.subtitles.line2English, b.subtitles.line3Ref);

  return `📺 ON-SCREEN TEXT OVERLAY CONTENT & TRANSLATION (CLEAN TRANSPARENT • NO BLACK BACKGROUND):
${typo.promptAdditionDirective}
- Verification: Exact Unicode codepoints: ${codepoints}

🎥 SIMULTANEOUS VIDEO & AUDIO GENERATION PROMPT (9:16 VERTICAL - PORTRAIT 1080x1920):
${b.videoPrompt}`;
}

/**
 * Formats the Audio & Voiceover Prompt alone with zero-hallucination mandate
 */
export function formatAudioOnlyText(b: ShortsBlueprint): string {
  return `🎙 AUDIO & VOICEOVER PROMPT (NATIVE TAMIL PRONUNCIATION & 100% EVEN LIP SYNC):
- On-Screen Character: ${b.character}
- Voice Profile & Tone: British young female voice tone or devout biblical witness character voice — ${b.voiceProfile}
- Voiceover Script (Strictly 10.0s): "${b.audioScript}"
- CRITICAL TAMIL PRONUNCIATION MANDATE: Must be voiced by an authentic native Tamil speaker with pure Tamil Nadu phonetics. Correct conjunct pronunciation (e.g. க்க, ப்ப, ண்ணு, த்தா, ஸ்தோ) and natural syllable stress. Zero anglicized or broken phonetics.
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
Camera Framing & Shot: ${expr.cameraFraming || 'Dynamic Cinematic Framing (9:16 Vertical)'}
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
    voiceProfile: `Devout British young female voice tone or reverent biblical witness voice matching the on-screen character with authentic native Tamil pronunciation, solemn adoration, and prayerful cadence.`,
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
      tags: [
        cleanTitle, 
        engRef, 
        "India",
        "morning devotion",
        "Christian devotion",
        "praise",
        "praises",
        "Morning Devotion",
        "Christian Devotion",
        "Morning Prayer",
        "Daily Devotion",
        "Christian Devotional",
        "Tamil Christian",
        "Tamil Praise",
        "Gracy's Biblical Echoes", 
        "GracysBiblicalEchoes", 
        "30 AD Bible", 
        "1000 Praises", 
        "Tamil", 
        "TamilNadu", 
        "Chennai", 
        "TamilVlog", 
        "Tanglish", 
        "TamilYouTuber"
      ],
      hashtags: ["#GracysBiblicalEchoes", "#BiblicalEchoes", "#1000Praises", "#TamilChristian", "#India", "#MorningDevotion", "#ChristianDevotion", "#Praise", "#Praises", "#BibleVerse", "#Shorts"]
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
    voiceProfile: baseBlueprint.voiceProfile || `Devout British young female voice tone or reverent biblical witness voice matching the on-screen character with authentic native Tamil pronunciation, solemn adoration, and prayerful cadence.`,
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
