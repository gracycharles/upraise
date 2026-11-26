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
  'ஊழியக்காரரின்': 'oo-li-ya-kkaa-ra-rin / oo-zhi-ya-kkaa-ra-rin [ழி (li / zhi) = Tamil retroflex approximant /ɻ/: curl tongue tip slightly back toward roof of mouth without touching it, soft American r / dark l with a "zh" hint; க்க = doubled strong kaa; ர = light tapped ra; ரி = short ri; ன் = final n]',
  'ஊழியக்காரருக்கு': 'oo-li-ya-kkaa-ra-ruk-ku / oo-zhi-ya-kkaa-ra-ruk-ku [ழி (li / zhi) = Tamil retroflex approximant /ɻ/: curl tongue tip slightly back toward roof of mouth without touching it, soft American r / dark l with a "zh" hint; க்க = doubled strong kaa; ர = light tapped ra; ரு = short ru; க்கு = doubled kku]',
  'ஊழியக்காரரை': 'oo-li-ya-kkaa-ra-rai / oo-zhi-ya-kkaa-ra-rai [ழி (li / zhi) = Tamil retroflex approximant /ɻ/: curl tongue tip slightly back toward roof of mouth without touching it, soft American r / dark l with a "zh" hint; க்க = doubled strong kaa; ர = light tapped ra; ரை = rai like rye]',
  'ஊழியக்காரர்மேல்': 'oo-li-ya-kkaa-rar-mēl / oo-zhi-ya-kkaa-rar-mēl [ழி (li / zhi) = Tamil retroflex approximant /ɻ/: curl tongue tip slightly back toward roof of mouth without touching it, soft American r / dark l with a "zh" hint; க்க = doubled strong kaa; ர = light tapped ra; ர் = tapped r; மேல் = long mēl]',
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

export interface VasanamPhoneticDetails {
  word: string;
  wordIPA: string;
  latinSyllables: string;
  fullPhraseIPA: string;
}

const KNOWN_VASANAM_PHRASES: Array<{ pattern: RegExp; details: VasanamPhoneticDetails }> = [
  {
    // Short #31
    pattern: /அவர் தமது வசனத்தை அனுப்பி குணமாக்குகிறார்/,
    details: {
      word: 'வசனத்தை',
      wordIPA: '[ʋa.sa.n̪at̪.t̪ai̯] (root வசனம் = [ʋa.sa.nam])',
      latinSyllables: 'va-sa-nath-thai',
      fullPhraseIPA: '/a.ʋaɾ t̪a.ma.d̪u ʋa.sa.n̪at̪.t̪ai̯ a.n̪up.pi ku.ɳa.maːk.ku.ɡi.ɾaːɾ st̪oːt̪.t̪i.ɾam/'
    }
  },
  {
    // Short #179
    pattern: /உம்முடைய வசனம் என் கால்களுக்கு தீபம்/,
    details: {
      word: 'வசனம்',
      wordIPA: '[ʋa.sa.nam]',
      latinSyllables: 'va-sa-nam',
      fullPhraseIPA: '/um.mu.ɖai̯.ja ʋa.sa.nam en̪ kaːl.ɡa.ɭuk.ku t̪iː.bam st̪oːt̪.t̪i.ɾam/'
    }
  },
  {
    // Short #180
    pattern: /உம்முடைய வசனம் என் பாதைக்கு வெளிச்சம்/,
    details: {
      word: 'வசனம்',
      wordIPA: '[ʋa.sa.nam]',
      latinSyllables: 'va-sa-nam',
      fullPhraseIPA: '/um.mu.ɖai̯.ja ʋa.sa.nam en̪ paː.d̪ai̯k.ku ʋe.ɭit.tʃam st̪oːt̪.t̪i.ɾam/'
    }
  },
  {
    // Short #216
    pattern: /என் வசனத்திற்கு நடுங்குபவனையே நோக்கி பார்ப்பேன்/,
    details: {
      word: 'வசனத்திற்கு',
      wordIPA: '[ʋa.sa.n̪at̪.t̪iɾ.ku] (root வசனம் = [ʋa.sa.nam])',
      latinSyllables: 'va-sa-nath-thir-ku',
      fullPhraseIPA: '/en̪ ʋa.sa.n̪at̪.t̪iɾ.ku n̪a.ɖuŋ.ɡu.ba.ʋa.n̪ai̯.jeː n̪oːk.ki paːɾp.peːn en.dra.ʋa.ɾeː st̪oːt̪.t̪i.ɾam/'
    }
  },
  {
    // Short #393
    pattern: /கிறிஸ்துவின் வசனம் உங்களுக்குள்ளிருப்பதாக/,
    details: {
      word: 'வசனம்',
      wordIPA: '[ʋa.sa.nam]',
      latinSyllables: 'va-sa-nam',
      fullPhraseIPA: '/ki.ɾis.t̪u.ʋin ʋa.sa.nam uŋ.ɡa.ɭuk.kuɭ.ɭi.ɾup.pa.d̪aː.ɡa st̪oːt̪.t̪i.ɾam/'
    }
  },
  {
    // Short #465 (future data readiness)
    pattern: /கேள்வி தேவனுடைய வசனத்தினால் வரும்/,
    details: {
      word: 'வசனத்தினால்',
      wordIPA: '[ʋa.sa.n̪at̪.t̪i.n̪aːl] (root வசனம் = [ʋa.sa.nam])',
      latinSyllables: 'va-sa-nath-thi-naal',
      fullPhraseIPA: '/keːɭ.ʋi t̪eː.ʋa.n̪u.ɖai̯.ja ʋa.sa.n̪at̪.t̪i.n̪aːl ʋa.ɾum st̪oːt̪.t̪i.ɾam/'
    }
  }
];

/**
 * Checks if text contains வசனம் or its inflections (வசனத்தை, வசனத்திற்கு, வசனத்தினால், etc.)
 */
export function hasTamilVasanam(text: string): boolean {
  return /வசன/.test(text);
}

/**
 * Resolves exact IPA and pronunciation lock details for a phrase containing வசனம் / inflections
 */
export function getVasanamPhoneticDetails(text: string): VasanamPhoneticDetails | null {
  if (!hasTamilVasanam(text)) return null;
  for (const entry of KNOWN_VASANAM_PHRASES) {
    if (entry.pattern.test(text)) {
      return entry.details;
    }
  }
  const matchedWord = (text.match(/[\u0B80-\u0BFF]*வசன[\u0B80-\u0BFF]*/) || ['வசனம்'])[0];
  return {
    word: matchedWord,
    wordIPA: matchedWord === 'வசனம்' ? '[ʋa.sa.nam]' : `[ʋa.sa.n̪a...] (root வசனம் = [ʋa.sa.nam])`,
    latinSyllables: 'va-sa-nam',
    fullPhraseIPA: `Full phrase with ${matchedWord} locked to pure crisp [s] ([ʋa.sa.nam]) and st̪oːt̪.t̪i.ɾam`
  };
}

/**
 * Returns just the full-phrase IPA string for display or prompt embedding
 */
export function getVasanamFullPhraseIPA(text: string): string {
  return getVasanamPhoneticDetails(text)?.fullPhraseIPA || '';
}

/**
 * Generates the full-phrase IPA lock & crisp /s/ mandate for வசனம் ([ʋa.sa.nam])
 */
export function getVasanamPronunciationMandate(text: string): string {
  const details = getVasanamPhoneticDetails(text);
  if (!details) return '';

  return `\n- CRITICAL TAMIL FULL-PHRASE IPA LOCK & CRISP /s/ MANDATE ("${details.word}" → [ʋa.sa.nam]):
  • Full-Phrase IPA Lock: ${details.fullPhraseIPA}
  • Native Script Lock: Spoken script and TTS input MUST remain pure native Tamil "${details.word}" — do NOT alter to Grantha "ஸ", which triggers an unwanted "sha" (/ʃ/) sound.
  • Target Word Lock: "${details.word}" = ${details.wordIPA} (${details.latinSyllables}) — just clean "vasanam" using a crisp, pure voiceless /s/ (as in "sun" / "sand").
  • Strictly Forbidden Sounds: NEVER pronounce with a "sha" sound (/ʃ/ as in "shoe"), NEVER "cha" (/tʃ/ as in "chair"), and NEVER "za" (/z/ as in "zoo"). Just clean vasanam with crisp /s/ ONLY.
  • Cadence: Maintain authentic native Tamil Nadu delivery with a natural reverent pause before "ஸ்தோத்திரம்" ([st̪oːt̪.t̪i.ɾam]).`;
}

/**
 * Checks if text contains ஊற்றுத்தண்ணீரே (O spring water / fountain water)
 */
export function hasOottrutthanneere(text: string): boolean {
  return /ஊற்றுத்தண்ணீரே/.test(text);
}

export const OOTRUTHANNEERE_TRANSLITERATION = 'Ootruthaṇṇeerē';

/**
 * Generates the exact transliteration (Ootruthaṇṇeerē), phonetic & narrow/allophonic IPA,
 * syllable-by-syllable breakdown, and Tamil articulation mandate for ஊற்றுத்தண்ணீரே.
 */
export function getOottrutthanneerePronunciationMandate(text: string): string {
  if (!hasOottrutthanneere(text)) return '';

  return `\n- CRITICAL TAMIL TRANSLITERATION, IPA & ARTICULATION MANDATE ("ஊற்றுத்தண்ணீரே" / ${OOTRUTHANNEERE_TRANSLITERATION} | /uːrːɯt̪ːɐɳːiːreː/ | [uːtrɯt̪ːɐɳːiːreː]):
  • Standard / Phonetic (Everyday) Transliteration: ${OOTRUTHANNEERE_TRANSLITERATION} (Oot-ru-thaṇ-ṇee-rē)
  • Phonetic IPA: /uːrːɯt̪ːɐɳːiːreː/ | Narrow/Allophonic IPA: [uːtrɯt̪ːɐɳːiːreː]
  • Syllable-by-Syllable Breakdown (${OOTRUTHANNEERE_TRANSLITERATION}):
    1. ஊற் (Oot / ooṟ) → /uːrː/ or [uːtr]: Long "oo" (like "boot"), followed by a strong retroflex trill/stop (ṟ).
    2. றுத் (ru+t / ṟut) → /rːɯt̪/: Short unrounded back vowel /ɯ/ + dental "t" (tongue against upper teeth).
    3. தண் (thaṇ) → /t̪ɐɳ/: Dental "th" + short "a" (like "uh/a" in "about") + retroflex ṇ (tongue curled back).
    4. ணீ (ṇee / ṇī) → /ɳiː/: Retroflex ṇ + long "ee" (like "see").
    5. ரே (rē) → /reː/: Flapped/trilled "r" + long "ay" (like "say", held steady without a strong glide).
  • Key Tamil Articulation Tips:
    - ஊற் / று (ṟṟ): Pronounced as a geminated trill /rː/ or with a [tr]-like release [uːtrɯ] in careful speech — curl tongue back slightly and tap/trill firmly rather than using an English "r".
    - த் (th): Keep tongue on the back of the upper front teeth (dental), closer to a soft "th" or unaspirated "t" rather than English "th" in "think".
    - தண் / ணீ (ṇ): Curl tip of tongue back toward the roof of the mouth for retroflex nasal ṇ.
    - ரே (rē): End on a clean, pure long "e" (/eː/), similar to the vowel in "day" held steady.
  • Spoken Cadence: "ஊற்றுத்தண்ணீரே [natural reverent pause] ஸ்தோத்திரம்" (${OOTRUTHANNEERE_TRANSLITERATION} [pause] sthōththiram | /uːrːɯt̪ːɐɳːiːreː st̪oːt̪.t̪i.ɾam/).`;
}

export interface OozhiyakkaararSyllable {
  tamil: string;
  translit: string;
  description: string;
}

export interface OozhiyakkaararDetails {
  word: string;
  pronunciationPrimary: string;
  pronunciationAlt: string;
  meaning: string;
  syllables: OozhiyakkaararSyllable[];
  structure: OozhiyakkaararSyllable[];
}

const BASE_OOZHIYAKKAARAR_SYLLABLES: OozhiyakkaararSyllable[] = [
  { tamil: 'ஊ', translit: 'oo', description: 'Long "oo" sound, like the "oo" in "boot".' },
  { tamil: 'ழி', translit: 'li / zhi', description: 'A distinctive retroflex approximant (/ɻ/) unique to Tamil — curl the tip of your tongue slightly back toward the roof of your mouth without touching it, similar to a soft American "r" or a dark "l" with a "zh" hint.' },
  { tamil: 'ய', translit: 'ya', description: 'Like "ya" in "yard".' },
  { tamil: 'க்க', translit: 'kkaa', description: 'A doubled, strong "kaa" sound, like "car" with a long "aa".' },
  { tamil: 'ர', translit: 'ra', description: 'A light tapped "ra" (like a quick "r" in "butter").' }
];

const BASE_OOZHIYAKKAARAR_STRUCTURE: OozhiyakkaararSyllable[] = [
  { tamil: 'ஊழியம்', translit: 'oo-li-yam', description: 'Service, ministry, or work.' },
  { tamil: 'காரர்', translit: 'kaa-rar', description: 'One who does/performs something (a doer, worker, or servant).' }
];

/**
 * Checks if text contains ஊழியக்காரரின் or related inflections (ஊழியக்காரரை, ஊழியக்காரருக்கு, ஊழியக்காரர்மேல்)
 */
export function hasOozhiyakkaarar(text: string): boolean {
  return /ஊழியக்கார/.test(text);
}

export function hasOozhiyakkaararin(text: string): boolean {
  return hasOozhiyakkaarar(text);
}

/**
 * Resolves exact syllable breakdown and word structure for any ஊழியக்கார* inflection
 */
export function getOozhiyakkaararDetails(text: string): OozhiyakkaararDetails | null {
  if (!hasOozhiyakkaarar(text)) return null;

  if (/ஊழியக்காரரை/.test(text)) {
    return {
      word: 'ஊழியக்காரரை',
      pronunciationPrimary: 'oo-li-ya-kkaa-ra-rai',
      pronunciationAlt: 'oo-zhi-ya-kkaa-ra-rai',
      meaning: '"the servants" or "the workers/ministers" (direct object)',
      syllables: [
        ...BASE_OOZHIYAKKAARAR_SYLLABLES,
        { tamil: 'ரை', translit: 'rai', description: 'Light tapped "r" + diphthong "ai" (like "rye").' }
      ],
      structure: [
        ...BASE_OOZHIYAKKAARAR_STRUCTURE,
        { tamil: 'ஐ', translit: 'ai', description: 'An accusative suffix marking the direct object ("the servants / workers").' }
      ]
    };
  }

  if (/ஊழியக்காரருக்கு/.test(text)) {
    return {
      word: 'ஊழியக்காரருக்கு',
      pronunciationPrimary: 'oo-li-ya-kkaa-ra-ruk-ku',
      pronunciationAlt: 'oo-zhi-ya-kkaa-ra-ruk-ku',
      meaning: '"to/unto the servants" or "to the workers/ministers"',
      syllables: [
        ...BASE_OOZHIYAKKAARAR_SYLLABLES,
        { tamil: 'ரு', translit: 'ru', description: 'Short "ru" sound (quick tapped r + short u).' },
        { tamil: 'க்கு', translit: 'kku', description: 'Doubled "kk" + short rounded "u" sound.' }
      ],
      structure: [
        ...BASE_OOZHIYAKKAARAR_STRUCTURE,
        { tamil: 'உக்கு', translit: 'ukku', description: 'A dative suffix meaning "to" or "unto."' }
      ]
    };
  }

  if (/ஊழியக்காரர்மேல்/.test(text)) {
    return {
      word: 'ஊழியக்காரர்மேல்',
      pronunciationPrimary: 'oo-li-ya-kkaa-rar-mēl',
      pronunciationAlt: 'oo-zhi-ya-kkaa-rar-mēl',
      meaning: '"upon/concerning the servants" or "upon the workers/ministers"',
      syllables: [
        ...BASE_OOZHIYAKKAARAR_SYLLABLES,
        { tamil: 'ர்', translit: 'r', description: 'Final light tapped "r" sound.' },
        { tamil: 'மேல்', translit: 'mēl', description: 'Long steady "ē" (like "may") + clear final "l".' }
      ],
      structure: [
        ...BASE_OOZHIYAKKAARAR_STRUCTURE,
        { tamil: 'மேல்', translit: 'mēl', description: 'A postposition meaning "upon" or "concerning."' }
      ]
    };
  }

  return {
    word: 'ஊழியக்காரரின்',
    pronunciationPrimary: 'oo-li-ya-kkaa-ra-rin',
    pronunciationAlt: 'oo-zhi-ya-kkaa-ra-rin',
    meaning: '"of the servant" or "of the worker/minister"',
    syllables: [
      ...BASE_OOZHIYAKKAARAR_SYLLABLES,
      { tamil: 'ரி', translit: 'ri', description: 'Short "ri", like "ri" in "rib".' },
      { tamil: 'ன்', translit: 'n', description: 'Final "n" sound, like the "n" in "sun".' }
    ],
    structure: [
      ...BASE_OOZHIYAKKAARAR_STRUCTURE,
      { tamil: 'இன்', translit: 'in', description: 'A genitive suffix meaning "of" or "belonging to."' }
    ]
  };
}

/**
 * Generates the complete syllable-by-syllable pronunciation guide and word structure
 * mandate for ஊழியக்காரரின் / ஊழியக்காரரை / ஊழியக்காரருக்கு / ஊழியக்காரர்மேல்.
 */
export function getOozhiyakkaararinPronunciationMandate(text: string): string {
  const details = getOozhiyakkaararDetails(text);
  if (!details) return '';

  const syllableLines = details.syllables
    .map((s, idx) => `    ${idx + 1}. ${s.tamil} (${s.translit}): ${s.description}`)
    .join('\n');
  const structureLines = details.structure
    .map((st) => `    - ${st.tamil} (${st.translit}): ${st.description}`)
    .join('\n');

  return `\n- CRITICAL TAMIL PRONUNCIATION & WORD STRUCTURE MANDATE ("${details.word}" / ${details.pronunciationPrimary} or ${details.pronunciationAlt}):
  • Meaning: ${details.meaning}.
  • Pronunciation Guide: ${details.pronunciationPrimary} (or ${details.pronunciationAlt}).
  • Syllable-by-Syllable Breakdown:
${syllableLines}
  • Word Structure:
${structureLines}`;
}

/**
 * Checks if text contains ஜூவாலைகளாக்குகிறவரே ("O One who makes [His ministers/servants] flames of fire")
 */
export function hasJooVaaLaiGaLaakKuGiRaVaRay(text: string): boolean {
  return /ஜூவாலைகளாக்குகிறவரே/.test(text);
}

/**
 * Generates the complete syllable-by-syllable pronunciation guide and meaning mandate
 * for ஜூவாலைகளாக்குகிறவரே (Joo-vaa-lai-ga-laak-ku-gi-ra-va-ray).
 */
export function getJooVaaLaiGaLaakKuGiRaVaRayPronunciationMandate(text: string): string {
  if (!hasJooVaaLaiGaLaakKuGiRaVaRay(text)) return '';

  return `\n- CRITICAL TAMIL PRONUNCIATION MANDATE ("ஜூவாலைகளாக்குகிறவரே" / Joo-vaa-lai-ga-laak-ku-gi-ra-va-ray):
  • Pronunciation Guide: Joo-vaa-lai-ga-laak-ku-gi-ra-va-ray
  • Meaning: "O One who makes (His ministers/servants) flames of fire" (poetic/biblical Tamil address).
  • Syllable-by-Syllable Breakdown:
    1. ஜூ (Joo) – like the "joo" in jukebox.
    2. வா (vaa) – like "vah" (long a).
    3. லை (lai) – like "lie".
    4. க (ga) – soft "ga" (in the middle of a word, க sounds like a soft g or h).
    5. ளாக் (laak) – retroflex "laak" (curl the tip of your tongue slightly back against the roof of your mouth for the ள sound, followed by a hard k).
    6. கு (ku) – short "koo" (like the oo in book).
    7. கி (gi) – soft "gi" (like gi in give, or very softly like hi).
    8. ற (ra) – rolled/trilled "ra" (similar to a Spanish single r).
    9. வ (va) – "va" (like vuh).
    10. ரே (ray) – like "ray".`;
}
