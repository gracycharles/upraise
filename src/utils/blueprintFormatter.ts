import { ShortsBlueprint, PraiseItem } from '../types';
import { getEnglishReference } from './bibleTranslations';
import { generateCharacterExpression, buildInculcatedVideoPrompt } from './characterExpressionEngine';
import { getNKJVData } from './nkjvTranslations';
import { computeOverlayTypography } from './overlayTypographyEngine';
import { deduplicateTagsCaseInsensitive } from '../data/blueprints';
import { hasTamilZha, extractZhaPhoneticGuide, getZhaPronunciationMandate } from './tamilPhoneticsEngine';

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
   - Native Tamil Speaker & Authentic Phonetics: Authentic native Tamil speaker from Tamil Nadu (Madurai/Thanjavur accent), NOT English accent, NOT Hindi, NOT anglicized. Pure Tamil Nadu native speaker locked. Ensure exact conjunct and consonant pronunciation for all Tamil words (including conjuncts like க்க, ப்ப, ண்ணு, த்தா, ஸ்தோ). Syllable stress and inflection must be 100% natural, deep, and authentic Tamil, never butchered, anglicized, or mispronounced.
    - Character Voice & Tone: Authentic character voice naturally matching ${b.character} — ${b.voiceProfile}. The video generator must choose the voice dynamically based on the on-screen character.${/lovingkindness/i.test(`${b.englishText || ''} ${b.audioScript || ''} ${b.voiceProfile || ''} ${b.subtitles?.line2English || ''} ${b.videoPrompt || ''}`) ? '\n   - Special Pronunciation Directive ("Lovingkindness"): For words such as "lovingkindness", the pronunciation must be strictly LOV-ING-KIND-NESS and NOT LOV-ING-KYND-NESS.' : ''}${/இரட்சண்ய/.test(`${b.tamilText || ''} ${b.tamilTitle || ''} ${b.audioScript || ''} ${b.subtitles?.line1Tamil || ''} ${b.videoPrompt || ''}`) ? '\n   - Special Pronunciation Directive ("இரட்சண்ய" / RATCHANYA): Written form stays "இரட்சண்ய", but spoken audio MUST pronounce "இரட்சண்ய" as "ரட்சண்ய" / Ratchanya (Rat-cha-nya Kom-be Sthothiram) — initial vowel silent, NOT Iratchanya.' : ''}${!/இரட்சண்ய/.test(`${b.tamilText || ''} ${b.tamilTitle || ''}`) && /இரட்சி|இரட்சக|இரட்சிக்க/.test(`${b.tamilText || ''} ${b.tamilTitle || ''} ${b.audioScript || ''} ${b.subtitles?.line1Tamil || ''} ${b.videoPrompt || ''}`) ? '\n   - Special Pronunciation Directive ("இரட்சிப்பு" / "இரட்சிப்பின்" / "இரட்சகர்" / "இரட்சிக்க"): Written form stays "இரட்சிப்பு" / "இரட்சிப்பின்" / "இரட்சகர்" / "இரட்சிக்க", but spoken audio MUST pronounce them with initial vowel "இ" silent: pronounce as "ரட்சிப்பு" / Ratchippu (Rat-chip-pu), "ரட்சிப்பின்" / Ratchippin (Rat-chip-pin), "ரட்சகர்" / Ratchagar (Rat-cha-gar), "ரட்சிக்க" / Ratchikka (Rat-chik-ka) — initial vowel silent, NOT Iratchippu/Iratchikka.' : ''}${hasTamilZha(`${b.tamilText || ''} ${b.tamilTitle || ''} ${b.audioScript || ''} ${b.subtitles?.line1Tamil || ''} ${b.videoPrompt || ''}`) ? `\n   - Special Pronunciation Directive ("ழகரம்" / Retroflex Approximant /ɻ/ - U+0BB4): MUST pronounce ழு / ழ as Tamil unique retroflex approximant 'zha' (ழகரம் - IPA: /ɻ/, U+0BB4) as in Tamizh (தமிழ்), tongue tip curled far back to hard palate, NOT 'la' (ல) or 'lla' (ள). Explicit phonetic guide fed to voice engine: ${extractZhaPhoneticGuide(`${b.tamilText || ''} ${b.tamilTitle || ''} ${b.audioScript || ''} ${b.subtitles?.line1Tamil || ''}`)}. Check the Tamil audio at 1-3s — ழு / ழ should have that deep Tamil zha resonance.` : ''}
   - Natural Reverent Pause Before ஸ்தோத்திரம் (Audio Cadence): In the spoken Tamil audio, the speaker must introduce a distinct, natural, reverent pause (as if an unwritten comma exists) immediately before speaking "ஸ்தோத்திரம்" (e.g., "[Tamil phrase] [subtle reverent pause] ஸ்தோத்திரம்"). This breath/cadence pause applies exclusively to audio voiceover generation and lip-sync cadence; the on-screen text overlay remains clean without introducing an extra comma.
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
  const hasLovingkindness = /lovingkindness/i.test(
    `${b.englishText || ''} ${b.audioScript || ''} ${b.voiceProfile || ''} ${b.subtitles?.line2English || ''} ${b.videoPrompt || ''}`
  );
  const lovingkindnessDirective = hasLovingkindness
    ? '\n- CRITICAL PRONUNCIATION MANDATE ("LOVINGKINDNESS"): For words such as "lovingkindness", the pronunciation must be strictly LOV-ING-KIND-NESS and NOT LOV-ING-KYND-NESS.'
    : '';

  const hasRatchanya = /இரட்சண்ய/.test(
    `${b.tamilText || ''} ${b.tamilTitle || ''} ${b.audioScript || ''} ${b.subtitles?.line1Tamil || ''} ${b.videoPrompt || ''}`
  );
  const ratchanyaDirective = hasRatchanya
    ? '\n- CRITICAL PRONUNCIATION MANDATE FOR "இரட்சண்ய" (Ratchanya): Written form stays "இரட்சண்ய", but spoken audio MUST pronounce "இரட்சண்ய" as "ரட்சண்ய" / Ratchanya (Rat-cha-nya Kom-be Sthothiram) — initial vowel silent, NOT Iratchanya.'
    : '';

  const hasIratchippu = !hasRatchanya && /இரட்சி|இரட்சக|இரட்சிக்க/.test(
    `${b.tamilText || ''} ${b.tamilTitle || ''} ${b.audioScript || ''} ${b.subtitles?.line1Tamil || ''} ${b.videoPrompt || ''}`
  );
  const iratchippuDirective = hasIratchippu
    ? '\n- CRITICAL TAMIL PRONUNCIATION MANDATE ("இரட்சிப்பு" / "இரட்சிப்பின்" / "இரட்சகர்" / "இரட்சிக்க" - Silent Initial "இ"): Written form stays with "இ" ("இரட்சிப்பு", "இரட்சிப்பின்", "இரட்சகர்", "இரட்சிக்க", "இரட்சிப்பை"), but spoken audio MUST pronounce them with initial vowel "இ" silent: pronounce as "ரட்சிப்பு" / Ratchippu (Rat-chip-pu), "ரட்சிப்பின்" / Ratchippin (Rat-chip-pin), "ரட்சகர்" / Ratchagar (Rat-cha-gar), "ரட்சிக்க" / Ratchikka (Rat-chik-ka) — initial vowel silent, NOT Iratchippu/Iratchikka.'
    : '';

  const allTamilText = `${b.tamilText || ''} ${b.tamilTitle || ''} ${b.audioScript || ''} ${b.subtitles?.line1Tamil || ''} ${b.videoPrompt || ''}`;
  const zhaDirective = getZhaPronunciationMandate(allTamilText);

  return `🎙 AUDIO & VOICEOVER PROMPT (NATIVE TAMIL PRONUNCIATION & 100% EVEN LIP SYNC):
- On-Screen Character: ${b.character}
- Voice Profile & Tone: Authentic character voice matching ${b.character} — ${b.voiceProfile}
- Voiceover Script (Strictly 10.0s): "${b.audioScript}"
- CHARACTER-MATCHED VOICE SELECTION: The video generator must choose the voice dynamically based on the character, authentically matching ${b.character} in age, gender, and timbre.${lovingkindnessDirective}${ratchanyaDirective}${iratchippuDirective}${zhaDirective}
- CRITICAL TAMIL PRONUNCIATION MANDATE: Spoken Tamil must be voiced by an authentic native Tamil speaker from Tamil Nadu (Madurai/Thanjavur accent), NOT English accent, NOT Hindi, NOT anglicized. Pure Tamil Nadu native speaker locked. Correct conjunct pronunciation (e.g. க்க, ப்ப, ண்ணு, த்தா, ஸ்தோ) and natural syllable stress. Zero anglicized or broken phonetics.
- NATURAL REVERENT PAUSE BEFORE ஸ்தோத்திரம்: When voicing the Tamil praise, introduce a distinct, gentle reverent pause (as if an unwritten comma exists) right before saying "ஸ்தோத்திரம்". The on-screen text overlay retains the original clean script without a comma, but the audio pacing and lip-sync articulation must honor this sacred comma-like pause.
- CRITICAL AUDIO & LIP SYNC DIRECTIVE: Read ONLY the exact scripted text above paced evenly across strictly 10 seconds. Lip movement MUST be 100% even and continuous for every single spoken syllable, articulating every word fully without leaving any word unarticulated or frozen while audio plays. NO EXTRA WORDS, NO INTRO/OUTRO, NO THEOLOGICAL COMMENTARY. Speak only the exact Tamil praise followed by the exact English praise line as scripted. Zero hallucinated sentences.
- Background Audio: ${b.backgroundAudio}`;
}

/**
 * 2) YouTube SEO & Tags alone (Title, Description, Tags CSV, Hashtags CSV)
 */
export function formatYouTubeOnlyText(b: ShortsBlueprint): string {
  const cleanTags = deduplicateTagsCaseInsensitive(b.seo.tags);
  return `🏷 YouTube SEO & Tags (Comma-Separated for YouTube Studio):
- Title: ${b.seo.title}
- Description: ${b.seo.description}
- Tags (CSV): ${cleanTags.join(', ')}
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
 * Dynamically resolves authentic biblical characters and locations based on scripture context.
 * Inculcates rich characters: King David, Asaph, Prophet Isaiah, Jeremiah, Daniel, Moses, Miriam, 
 * Apostle Peter, Apostle John, Apostle Paul, Mary Magdalene, Martha of Bethany, Lydia, Stephen, etc.
 */
export function getDynamicBiblicalCharacterAndLocation(reference: string, tamilText: string, id: number): { character: string; location: string } {
  const ref = (reference || '').toLowerCase();
  
  // Psalms / சங். / King David, Asaph, Sons of Korah
  if (ref.includes('சங்') || ref.includes('psalm')) {
    const davidicOptions = [
      {
        character: "King David in royal Judean linen, holding a ten-stringed kinnor harp with eyes lifted in reverent praise",
        location: "Mount Zion palace colonnade overlooking sacred Jerusalem at golden sunrise"
      },
      {
        character: "Asaph the chief Levitical cantor in white priestly linen, singing sacred thanksgiving",
        location: "Courtyard of the Tabernacle of David with bronze altar embers glowing in morning mist"
      },
      {
        character: "Sons of Korah in reverent priestly attire, offering harmonious adoration",
        location: "High limestone terrace of Mount Zion facing the Judean hill country at dawn"
      },
      {
        character: "Devout Judean worshiper kneeling in heartfelt adoration with open, prayerful palms",
        location: "Quiet olive grove in the hills surrounding Jerusalem under golden morning light"
      }
    ];
    return davidicOptions[id % davidicOptions.length];
  }

  // Isaiah / ஏசா.
  if (ref.includes('ஏசா') || ref.includes('isaiah')) {
    return {
      character: "Prophet Isaiah in coarse prophet's mantle, standing in reverent awe before God's holy presence",
      location: "Courtyard of the Jerusalem Temple with morning sunlight illuminating ancient limestone columns"
    };
  }

  // Jeremiah / Lamentations / எரே. / புலம்.
  if (ref.includes('எரே') || ref.includes('jeremiah') || ref.includes('புலம்')) {
    return {
      character: "Prophet Jeremiah in humble Judean tunic, reflecting on God's new compassions that are fresh every morning",
      location: "Hillside of Anathoth overlooking the ancient valleys of Benjamin at dawn"
    };
  }

  // Daniel / தானி.
  if (ref.includes('தானி') || ref.includes('daniel')) {
    return {
      character: "Prophet Daniel in dignified Judean elder's attire, kneeling in prayer with unshakeable faith",
      location: "Upper chamber with windows open toward Jerusalem, bathed in soft morning light"
    };
  }

  // Pentateuch / Genesis / Exodus / Leviticus / Numbers / Deuteronomy (ஆதி, யாத், லேவி, எண், உபா)
  if (ref.includes('யாத்') || ref.includes('exod') || ref.includes('உபா') || ref.includes('deut') || ref.includes('ஆதி') || ref.includes('gen')) {
    const mosaicOptions = [
      {
        character: "Moses the servant of God holding his shepherd's staff, standing in dignified communion with the Almighty",
        location: "High rocky promontory overlooking the Jordan Valley with sweeping desert vistas"
      },
      {
        character: "Miriam the prophetess in embroidered linen, raising her voice in joyful praise to the Deliverer",
        location: "Shoreline of the Red Sea under clear desert dawn skies"
      },
      {
        character: "Patriarch Abraham in ancient shepherd's mantle, gazing heavenward at the stars of promise",
        location: "Oaks of Mamre in Hebron under a tranquil starlit sky transitioning to dawn"
      }
    ];
    return mosaicOptions[id % mosaicOptions.length];
  }

  // Gospels: Matthew, Mark, Luke, John (மத், மாற், லூக், யோவா)
  if (ref.includes('மத்') || ref.includes('matt') || ref.includes('மாற்') || ref.includes('mark') || ref.includes('லூக்') || ref.includes('luke') || ref.includes('யோவா') || ref.includes('john')) {
    const gospelOptions = [
      {
        character: "Apostle Peter on the rocky shore of Galilee, looking out with steadfast faith and deep reverence",
        location: "Sea of Galilee shoreline near Capernaum with wooden fishing boats resting in gentle morning surf"
      },
      {
        character: "Apostle John the beloved disciple, countenance glowing with intimate peace and sacred wonder",
        location: "Quiet upper terrace in Jerusalem with view of Mount Olivet in morning light"
      },
      {
        character: "Mary Magdalene in modest 1st-century Galilean tunic, radiant with joyful adoration of the risen Lord",
        location: "Quiet garden path near Jerusalem illuminated by gentle sunrise filtering through olive branches"
      },
      {
        character: "Martha of Bethany pausing from her household duties with hands folded in peaceful worship",
        location: "Sunlit stone courtyard in Bethany surrounded by flowering fig and pomegranate trees"
      },
      {
        character: "Devout Galilean disciple in authentic coarse linen tunic, lifting hands in heartfelt praise",
        location: "Grassy hillside near the Mount of Beatitudes overlooking the shimmering Sea of Galilee"
      }
    ];
    return gospelOptions[id % gospelOptions.length];
  }

  // Acts / அப்.
  if (ref.includes('அப்') || ref.includes('acts')) {
    const apostolicOptions = [
      {
        character: "Apostle Peter standing boldly by the stone columns of the Temple portico, declaring the name of Jesus",
        location: "Solomon's Porch on the Temple Mount in Jerusalem with sunlight streaming between pillars"
      },
      {
        character: "Deacon Stephen with radiant face filled with grace and the Holy Spirit, gazing steadfastly upward",
        location: "Jerusalem stone colonnade under open, serene azure skies"
      },
      {
        character: "Barnabas of Cyprus, son of encouragement, speaking blessings with warm and steadfast brotherly love",
        location: "Ancient stone courtyard in Syrian Antioch where disciples gather in unity"
      }
    ];
    return apostolicOptions[id % apostolicOptions.length];
  }

  // Epistles / Paul / Peter / James / John / Jude / Hebrews (ரோம, கொரி, கலா, எபே, பிலி, கொலோ, தெச, தீமோ, தீத்து, எபி, யாக், பேதுரு)
  if (ref.includes('ரோம') || ref.includes('rom') || ref.includes('கொரி') || ref.includes('cor') || ref.includes('எபே') || ref.includes('eph') || ref.includes('பிலி') || ref.includes('phil') || ref.includes('கொலோ') || ref.includes('col') || ref.includes('எபி') || ref.includes('heb') || ref.includes('யாக்') || ref.includes('james')) {
    const epistlesOptions = [
      {
        character: "Apostle Paul in coarse traveling mantle, dictating sacred epistle with burning apostolic passion and joy",
        location: "Ancient stone study in Corinth with papyrus scrolls and warm lamplight at daybreak"
      },
      {
        character: "Priscilla and Aquila in their artisan workshop, worshiping God in holy fellowship and gratitude",
        location: "Sunlit stone workshop in ancient Corinth with weaver's loom in the background"
      },
      {
        character: "Lydia of Thyatira in dignified purple-dyed Judean mantle, worshiping God with reverent grace",
        location: "Peaceful grassy riverside outside the city gate of Philippi at morning prayer time"
      },
      {
        character: "Young pastor Timothy holding the sacred parchment roll with solemn reverence and pure devotion",
        location: "Stone assembly hall in ancient Ephesus bathed in quiet amber dawn light"
      }
    ];
    return epistlesOptions[id % epistlesOptions.length];
  }

  // Revelation / வெளி.
  if (ref.includes('வெளி') || ref.includes('rev')) {
    return {
      character: "Apostle John in rugged prophet's tunic on the Isle of Patmos, face illuminated with celestial glory",
      location: "High coastal cliff on the Isle of Patmos overlooking the vast sapphire Aegean Sea at dawn"
    };
  }

  // Default biblical witness
  return {
    character: "Devout biblical witness and disciple in first-century Judea, clothed in authentic coarse-weave linen",
    location: "Authentic first-century biblical landscape in Galilee or Jerusalem under tranquil morning skies"
  };
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
  const biblicalContext = getDynamicBiblicalCharacterAndLocation(item.reference, cleanTamil, item.id);

  const baseBlueprint: ShortsBlueprint = {
    id: item.id,
    tamilTitle: cleanTamil,
    tamilText: cleanTamil,
    tamilRef: item.reference,
    englishText: `Praise to You, ${cleanTitle}`,
    englishRef: engRef,
    character: biblicalContext.character,
    location: biblicalContext.location,
    videoPrompt: "",
    voiceProfile: `Devout, reverent voice authentically matching the on-screen biblical character with authentic native Tamil pronunciation, solemn adoration, and prayerful cadence.`,
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
      tags: deduplicateTagsCaseInsensitive([
        cleanTitle, 
        engRef, 
        "India",
        "morning devotion",
        "Christian devotion",
        "praise",
        "praises",
        "India morning devotion",
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
        "TamilYouTuber",
        "English Tamil devotion",
        "Tamil and English Bible devotion",
        "Tamil English"
      ]),
      hashtags: ["#GracysBiblicalEchoes", "#BiblicalEchoes", "#1000Praises", "#TamilChristian", "#India", "#MorningDevotion", "#ChristianDevotion", "#Praise", "#Praises", "#Shorts"]
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
    voiceProfile: baseBlueprint.voiceProfile || `Devout, reverent voice authentically matching the on-screen biblical character with authentic native Tamil pronunciation, solemn adoration, and prayerful cadence.`,
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
