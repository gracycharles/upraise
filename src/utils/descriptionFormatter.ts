import { ShortsBlueprint, PraiseItem } from '../types';
import { CANONICAL_300_PRAISES } from '../data/canonical300';
import { PERSONAL_AFFIRMATIONS_300 } from '../data/personalAffirmations300';

/**
 * YouTube Description Formatter
 * 
 * Strict format:
 * [Line 1]: தமிழ் ஸ்தோத்திரம் (வேத மேற்கோள்)
 * 
 * [Line 2]: [NKJV Scripture Verse Text]
 * 
 * [Line 3]: [Personal prayer / affirmation / oath / resolution / confession / admission - 2 to 3 sentences max]
 * 
 * Example:
 * அப்பா பிதாவே ஸ்தோத்திரம் (ரோம. 8:15)
 * 
 * For you did not receive the spirit of bondage again to fear, but you received the Spirit of adoption by whom we cry out, 'Abba, Father.'
 * 
 * Heavenly Father, I confess that I am no longer a slave to fear, but Your beloved child welcomed through the Spirit of adoption. Today, I rest in the unfailing security of Your embrace and boldly cry out, 'Abba, Father!' I resolve to live this day in complete confidence and childlike trust in Your loving care.
 */

export function getFormattedYouTubeDescription(
  item: ShortsBlueprint | PraiseItem | { id: number; tamilTitle?: string; tamilRef?: string; tamilText?: string; reference?: string }
): string {
  const id = item.id;
  const canon = CANONICAL_300_PRAISES[id];

  // 1. Line 1: Tamil praise title with Tamil scripture reference in parentheses
  let line1Tamil = '';
  if (canon && canon.tamilText && canon.tamilRef) {
    const cleanTamil = canon.tamilText.replace(/\.$/, '').trim();
    line1Tamil = `${cleanTamil} (${canon.tamilRef})`;
  } else if ('tamilTitle' in item && item.tamilTitle && 'tamilRef' in item && item.tamilRef) {
    const cleanTamil = item.tamilTitle.replace(/\.$/, '').trim();
    line1Tamil = `${cleanTamil} (${item.tamilRef})`;
  } else if ('tamilText' in item && item.tamilText) {
    const cleanTamil = item.tamilText.replace(/\.$/, '').trim();
    const ref = ('tamilRef' in item ? item.tamilRef : '') || '';
    line1Tamil = ref ? `${cleanTamil} (${ref})` : cleanTamil;
  } else if ('text' in item && item.text) {
    const cleanTamil = item.text.replace(/\.$/, '').trim();
    const ref = ('reference' in item ? item.reference : '') || '';
    line1Tamil = ref ? `${cleanTamil} (${ref})` : cleanTamil;
  }

  // 2. Line 2: NKJV Scripture Verse Text
  let line2Verse = '';
  if (canon && canon.verseText) {
    line2Verse = canon.verseText.trim();
  } else if ('verification' in item && (item as ShortsBlueprint).verification?.nkjvVerseQuote) {
    line2Verse = ((item as ShortsBlueprint).verification!.nkjvVerseQuote || '').trim();
  }

  // 3. Line 3: Personal prayer / affirmation / resolution (2 to 3 sentences)
  let line3Affirmation = '';
  if (id && PERSONAL_AFFIRMATIONS_300[id]) {
    line3Affirmation = PERSONAL_AFFIRMATIONS_300[id].trim();
  } else if (canon && canon.theologicalContext) {
    line3Affirmation = canon.theologicalContext.trim();
  }

  // Combine into structured 3-part layout
  const parts: string[] = [];
  if (line1Tamil) parts.push(line1Tamil);
  if (line2Verse) parts.push(line2Verse);
  if (line3Affirmation) parts.push(line3Affirmation);

  return parts.join('\n\n');
}
