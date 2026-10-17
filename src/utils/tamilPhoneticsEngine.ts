/**
 * Tamil Phonetics Engine for Authentic Tamil Nadu Native Pronunciation
 * Enforces pure Tamil Nadu native speaker (Madurai/Thanjavur accent) and locks the unique
 * Tamil retroflex approximant /ɻ/ (ழகரம் - U+0BB4) with explicit IPA and phonetic engine cues.
 */

export const KNOWN_ZHA_PHONETICS: Record<string, string> = {
  'முழு': 'MU-ZHU [deep /ɻ/]',
  'அவரை முழு இருதயத்தோடு': 'a-va-rai MU-ZHU [deep /ɻ/] i-ru-dha-ya-tho-du...',
  'முழுதும்': 'MU-ZHU-dhum [deep /ɻ/]',
  'முழுமனதோடு': 'MU-ZHU-ma-na-tho-du [deep /ɻ/]',
  'வாழ்வு': 'vaazh-vu [deep /ɻ/]',
  'வாழ்த்துங்கள்': 'vaazhth-thun-gal [deep /ɻ/]',
  'அழியாதது': 'a-zhi-yaa-dha-dhu [deep /ɻ/]',
  'அழைக்கிறார்': 'a-zhaik-ki-raar [deep /ɻ/]',
  'அழைத்தவரே': 'a-zhaith-tha-va-re [deep /ɻ/]',
  'உயிர்த்தெழுந்தவரே': 'u-yirth-the-zhun-dha-va-re [deep /ɻ/]',
  'ஊழியக்காரரின்': 'oo-zhi-yak-kaa-ra-rin [deep /ɻ/]',
  'ஊழியக்காரருக்கு': 'oo-zhi-yak-kaa-ruk-ku [deep /ɻ/]',
  'ஊழியக்காரரை': 'oo-zhi-yak-kaa-ra-rai [deep /ɻ/]',
  'ஊழியக்காரர்மேல்': 'oo-zhi-yak-kaa-rar-mel [deep /ɻ/]',
  'எப்பொழுதும்': 'ep-po-zhu-dhum [deep /ɻ/]',
  'ஏழு': 'E-ZHU [deep /ɻ/]',
  'ஏழைக்கு': 'e-zhaik-ku [deep /ɻ/]',
  'ஏழையின்': 'e-zhai-yin [deep /ɻ/]',
  'ஒழிந்து': 'o-zhin-dhu [deep /ɻ/]',
  'கழுவுங்கள்': 'ka-zhu-vun-gal [deep /ɻ/]',
  'கீழ்க்காற்றை': 'keezhk-kaat-rai [deep /ɻ/]',
  'கீழ்படிந்திருங்கள்': 'keezh-pa-din-dhi-run-gal [deep /ɻ/]',
  'தழும்புகளால்': 'tha-zhum-bu-ga-laal [deep /ɻ/]',
  'தாழ்ப்பாள்களை': 'thaazhp-paal-ga-lai [deep /ɻ/]',
  'பொழிகிறது': 'po-zhi-gi-ra-dhu [deep /ɻ/]',
  'மனமகிழ்ச்சி': 'ma-na-ma-gizhch-chi [deep /ɻ/]',
  'மனமகிழ்ச்சியினால்': 'ma-na-ma-gizhch-chi-yi-naal [deep /ɻ/]',
  'மழை': 'ma-zhai [deep /ɻ/]',
  'மழையை': 'ma-zhai-yai [deep /ɻ/]',
  'வழக்காடுவேன்': 'va-zhak-kaa-du-ven [deep /ɻ/]',
  'வீழ்த்தியவரே': 'veezhth-thi-ya-va-re [deep /ɻ/]'
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
  const isMuzhu = /முழு|அவரை முழு இருதயத்தோடு/.test(text);
  const letterFocus = isMuzhu ? 'ழு = U+0BB4 = /ɻ/' : 'ழ / ழு = U+0BB4 = /ɻ/';
  
  return `\n- CRITICAL TAMIL RETROFLEX APPROXIMANT MANDATE (ழகரம் / IPA: /ɻ/ / U+0BB4):
  • Native Speaker Lock: Authentic native Tamil speaker from Tamil Nadu (Madurai/Thanjavur accent), NOT English accent, NOT Hindi, NOT anglicized. Pure Tamil Nadu native speaker locked.
  • Explicit IPA lock: ${letterFocus} - tongue tip curled far back to hard palate, producing the deep retroflex approximant as in Tamizh (தமிழ்), and NEVER anglicized as 'la' (ல) or 'lla' (ள).
  • Phonetic guide fed to voice engine: ${guide}
  • Audio Verification Cue: Check the Tamil audio at 1-3s — ழு / ழ should have that deep Tamil zha resonance.`;
}
