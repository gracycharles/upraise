/**
 * Tamil Phonetics Engine for Authentic Tamil Nadu Native Pronunciation
 * Enforces pure Tamil Nadu native speaker (Madurai/Thanjavur accent) and locks the unique
 * Tamil retroflex approximant /ɻ/ (ழகரம் - U+0BB4) with explicit IPA and phonetic engine cues.
 */

export const KNOWN_ZHA_PHONETICS: Record<string, string> = {
  'முழு': 'MU-ZHU [deep retroflex /ɻ/, NOT mu-lu]',
  'அவரை முழு இருதயத்தோடு': 'a-va-rai MU-ZHU [deep retroflex /ɻ/] i-ru-dha-ya-tho-du...',
  'முழுதும்': 'MU-ZHU-dhum [deep retroflex /ɻ/]',
  'முழுமனதோடு': 'MU-ZHU-ma-na-tho-du [deep retroflex /ɻ/]',
  'வாழ்வு': 'vaazh-vu [deep retroflex /ɻ/]',
  'வாழ்த்துங்கள்': 'vaazhth-thun-gal [deep retroflex /ɻ/]',
  'அழியாதது': 'a-zhi-yaa-dha-dhu [deep retroflex /ɻ/]',
  'அழைக்கிறார்': 'a-zhaik-ki-raar [deep retroflex /ɻ/]',
  'அழைத்தவரே': 'a-ZHAITH-tha-va-rey [where ZHAI = /ɻai/, retroflex /ɻ/, NOT a-laith-tha-va-re]',
  'உயிர்த்தெழுந்தவரே': 'u-yir-th-tha-e-ZHU-n-tha-va-re-e [where ZHU = /ɻu/, IPA: ujirt̪t̪eɻun̪d̪aʋareː with strong retroflex — hear at 1-3s as ezhundha (eɻun̪d̪a) NOT elundha]',
  'ஊழியக்காரரின்': 'oo-ZHI-yak-kaa-ra-rin [where ZHI = /ɻi/, retroflex /ɻ/, NOT oo-li-yak-kaa-ra-rin]',
  'ஊழியக்காரருக்கு': 'oo-ZHI-yak-kaa-ruk-ku [where ZHI = /ɻi/, retroflex /ɻ/, NOT oo-li-yak-kaa-ruk-ku]',
  'ஊழியக்காரரை': 'oo-ZHI-yak-kaa-ra-rai [where ZHI = /ɻi/, retroflex /ɻ/, NOT oo-li-yak-kaa-ra-rai]',
  'ஊழியக்காரர்மேல்': 'oo-ZHI-yak-kaa-rar-meyl [where ZHI = /ɻi/, retroflex /ɻ/, NOT oo-li-yak-kaa-rar-mel]',
  'எப்பொழுதும்': 'ep-po-zhu-dhum [deep retroflex /ɻ/]',
  'ஏழு': 'E-ZHU [deep retroflex /ɻ/, NOT ey-lu]',
  'ஏழைக்கு': 'e-zhaik-ku [deep retroflex /ɻ/]',
  'ஏழையின்': 'e-zhai-yin [deep retroflex /ɻ/]',
  'ஒழிந்து': 'o-ZHIN-dhu [where ZHI = /ɻi/, retroflex /ɻ/, NOT o-lin-dhu]',
  'கழுவுங்கள்': 'ka-zhu-vun-gal [deep retroflex /ɻ/]',
  'கீழ்க்காற்றை': 'keezhk-kaat-rai [deep retroflex /ɻ/]',
  'கீழ்படிந்திருங்கள்': 'keezh-pa-din-dhi-run-gal [deep retroflex /ɻ/]',
  'தழும்புகளால்': 'tha-zhum-bu-ga-laal [deep retroflex /ɻ/]',
  'தாழ்ப்பாள்களை': 'thaazhp-paal-ga-lai [deep retroflex /ɻ/]',
  'பொழிகிறது': 'po-ZHI-gi-ra-dhu [where ZHI = /ɻi/, retroflex /ɻ/, NOT po-li-gi-ra-dhu]',
  'மனமகிழ்ச்சி': 'ma-na-ma-giZH-ch-chi [where ZHI = /ɻi/, retroflex /ɻ/, NOT ma-gi-lich-chi]',
  'மனமகிழ்ச்சியினால்': 'ma-na-ma-giZH-ch-chi-yi-naal [where ZHI = /ɻi/, retroflex /ɻ/]',
  'மழை': 'ma-zhai [deep retroflex /ɻ/]',
  'மழையை': 'ma-zhai-yai [deep retroflex /ɻ/]',
  'வழக்காடுவேன்': 'va-zhak-kaa-du-ven [deep retroflex /ɻ/]',
  'வீழ்த்தியவரே': 'veezhth-thi-ya-va-rey [where ZHI = /ɻi/, retroflex /ɻ/, NOT veel-thi-ya-va-re]'
};

/**
 * Checks if text contains the Tamil retroflex approximant letter ழ (U+0BB4)
 */
export function hasTamilZha(text: string): boolean {
  return /[\u0BB4]/.test(text);
}

/**
 * Extracts phonetic guides for words containing ழ in the given Tamil text
 */
export function extractZhaPhoneticGuide(text: string): string {
  if (text.includes('உயிர்த்தெழுந்தவரே')) {
    return 'u-yir-th-tha-e-ZHU-n-tha-va-re-e [where ZHU = /ɻu/, IPA: ujirt̪t̪eɻun̪d̪aʋareː with strong retroflex — hear at 1-3s as ezhundha (eɻun̪d̪a) NOT elundha]';
  }
  if (text.includes('அவரை முழு இருதயத்தோடு')) {
    return 'a-va-rai MU-ZHU [deep /ɻ/] i-ru-dha-ya-tho-du...';
  }
  
  // Find words with \u0BB4
  const words = text.match(/[\u0B80-\u0BFF]*\u0BB4[\u0B80-\u0BFF]*/g) || [];
  if (words.length === 0) return '';
  
  const guides: string[] = [];
  const seen = new Set<string>();
  
  for (const w of words) {
    const cleanWord = w.trim();
    if (!cleanWord || seen.has(cleanWord)) continue;
    seen.add(cleanWord);
    
    if (KNOWN_ZHA_PHONETICS[cleanWord]) {
      guides.push(`${cleanWord} → ${KNOWN_ZHA_PHONETICS[cleanWord]}`);
    } else {
      // General transliteration hint
      guides.push(`${cleanWord} [explicit deep retroflex approximant /ɻ/ - ழகரம்]`);
    }
  }
  
  return guides.join(', ');
}

/**
 * Generates the complete mandate string for audio & video generation prompts
 */
export function getZhaPronunciationMandate(text: string): string {
  if (!hasTamilZha(text)) return '';
  
  const guide = extractZhaPhoneticGuide(text);
  const isUyirth = /உயிர்த்தெழுந்தவரே/.test(text);
  const isMuzhu = /முழு|அவரை முழு இருதயத்தோடு/.test(text);
  const letterFocus = isUyirth
    ? 'ழு = U+0BB4 = /ɻ/ (உயிர்த்தெழுந்தவரே: forced IPA [ujirt̪t̪eɻun̪d̪aʋareː])'
    : isMuzhu
    ? 'ழு = U+0BB4 = /ɻ/'
    : 'ழ / ழு = U+0BB4 = /ɻ/';
  
  return `\n- CRITICAL TAMIL RETROFLEX APPROXIMANT MANDATE (ழகரம் / IPA: /ɻ/ / U+0BB4):
  • Native Speaker Lock: Authentic native Tamil speaker from Tamil Nadu (Madurai/Thanjavur accent), NOT English accent, NOT Hindi, NOT anglicized. Pure Tamil Nadu native speaker locked.
  • Explicit IPA lock: ${letterFocus} - tongue tip curled far back to hard palate, producing the deep retroflex approximant as in Tamizh (தமிழ்), and NEVER anglicized as 'la' (ல) or 'lla' (ள).
  • Phonetic guide fed to voice engine: ${guide}
  • Audio Verification Cue: Check the Tamil audio at 1-3s — ழு / ழ should have that deep Tamil zha resonance (e.g. ezhundha [eɻun̪d̪a] NOT elundha).
  • ஸ்தோத்திரம் Conjunct & Gemination: "ஸ்தோத்திரம்" → stho-th-thi-ram with crisp geminated த்த and proper ஸ்தோ conjunct closure.
  • Reverent Audio Cadence: Natural reverent pause before "ஸ்தோத்திரம்" in spoken audio/lip-sync cadence, while on-screen text overlay remains clean.`;
}

/**
 * Checks if text contains சேற்றிலிருந்து (miry clay / Psalm 40:2)
 */
export function hasSettrilirundhu(text: string): boolean {
  return /சேற்றிலிருந்து|ஸேற்றிலிருந்து/.test(text);
}

/**
 * Returns the exact phonetic guide and TTS lock for சேற்றிலிருந்து:
 * /tʃeːtːriliɾun̪d̪ɯ/ → [seːtːriliɾun̪d̪u]
 */
export function getSettrilirundhuMandate(text: string): string {
  if (!hasSettrilirundhu(text)) return '';
  return `\n- CRITICAL TAMIL PHONETIC GUIDE & TTS SIBILANT LOCK ("சேற்றிலிருந்து" / [seːtːriliɾun̪d̪u]):
  • Pronunciation Correction: /tʃeːtːriliɾun̪d̪ɯ/ → [seːtːriliɾun̪d̪u]
  • Initial Consonant: Spoken audio MUST articulate initial "சே" with voiceless sibilant [s] as in "sun" / "sail", NEVER affricate "che" (/tʃ/ as in "chair") or "ja".
  • Target IPA: [seːtːriliɾun̪d̪u] (syllables: se - et - tri - li - run - dhu).
  • Geminate Closure: "ற்றி" articulated as hard geminate alveolar plosive stop [tːri] as in "காற்று" (kaat-tru).
  • Final Dental: "-லிருந்து" articulated with soft dental [liɾun̪d̪u].
  • TTS Speech Engine Lock: Video generator TTS engines that default initial "சே" to "che" MUST use phonetic script "ஸேற்றிலிருந்து" (Grantha "ஸே" = /seː/) or Latin "seyt-tri-li-run-dhu" in the speech buffer to force the pure [s] consonant.
  • On-Screen Subtitle: Subtitles retain authentic literary "சேற்றிலிருந்து" with zero visual alteration.`;
}

/**
 * Checks if text contains நான் (1st person singular pronoun /naːn/ "I")
 */
export function hasTamilNaan(text: string): boolean {
  return /நான்/.test(text);
}

/**
 * Returns the exact phonetic guide and lip-sync mandate for நான் (/naːn/):
 * Alveolar nasal 'ன்' (tongue tip up on alveolar ridge, mouth open), NEVER bilabial 'ம்' (lips closed as in naam நாம்).
 */
export function getNaanPronunciationMandate(text: string): string {
  if (!hasTamilNaan(text)) return '';
  const isUnnaiNaan = /உன்னை நான் மீட்டு/.test(text);
  const contextExample = isUnnaiNaan 
    ? 'Long aa + sharp N: "Unnai Naan Meettu Konden" (உன்னை நான் மீட்டுக்கொண்டேன்)' 
    : 'Long aa + sharp N: /naːn/ (நான்)';

  return `\n- CRITICAL TAMIL PRONUNCIATION & LIP-SYNC MANDATE ("நான்" / /naːn/ - 1st Person Singular "I"):
  • Target IPA: /naːn/ ending in alveolar nasal 'ன்' (U+0BA9), NEVER bilabial nasal 'ம்' (naam /naːm/ - "we"). Confusing "நான்" (I) with "நாம்" (we) corrupts the theological meaning.
  • Oral Articulation & Tongue Position: Mouth MUST remain open; tongue tip rests firmly on the alveolar ridge behind upper front teeth — exactly as in English "SUN", "MAN", "PEN".
  • Strictly Forbid Bilabial Closure: FORBID lips from touching or sealing together as in "MOM" / "naam". Lips remain parted/open throughout the final nasal coda.
  • Vowel & Cadence: ${contextExample} with clear, elongated /aː/ transitioning into a crisp alveolar [n].
  • 100% Synchronized Lip-Sync: On-screen character lip movements must show mouth open with visible tongue-tip alveolar contact, never closed lips during "நான்".`;
}


