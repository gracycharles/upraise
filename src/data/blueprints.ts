import { ShortsBlueprint } from '../types';
import { BLUEPRINTS_1_TO_50 } from './blueprints1to50';
import { BLUEPRINTS_51_TO_100 } from './blueprints51to100';
import { BLUEPRINTS_101_TO_150 } from './blueprints101to150';
import { BLUEPRINTS_151_TO_200 } from './blueprints151to200';
import { BLUEPRINTS_201_TO_250 } from './blueprints201to250';
import { BLUEPRINTS_251_TO_300 } from './blueprints251to300';
import { enrichBlueprintWithVerification } from './scriptureVerifications';
import { generateCharacterExpression, buildInculcatedVideoPrompt } from '../utils/characterExpressionEngine';
import { getNKJVData } from '../utils/nkjvTranslations';
import { getConciseEnglishTitle } from '../utils/conciseTitleEngine';
import { getFormattedYouTubeDescription } from '../utils/descriptionFormatter';

const RAW_BLUEPRINTS: ShortsBlueprint[] = [
  ...BLUEPRINTS_1_TO_50,
  ...BLUEPRINTS_51_TO_100,
  ...BLUEPRINTS_101_TO_150,
  ...BLUEPRINTS_151_TO_200,
  ...BLUEPRINTS_201_TO_250,
  ...BLUEPRINTS_251_TO_300
];

const TARGET_TAMIL_ALGORITHM_TAGS = [
  'Tamil',
  'TamilNadu',
  'Chennai',
  'TamilVlog',
  'Tanglish',
  'TamilYouTuber'
];

function enrichBlueprintWithExpressionsAndNKJV(raw: ShortsBlueprint): ShortsBlueprint {
  const nkjv = getNKJVData(raw);
  const charExpr = generateCharacterExpression(raw);
  const videoPromptInculcated = buildInculcatedVideoPrompt(raw, charExpr);
  const conciseTitle = getConciseEnglishTitle(raw, raw.id);
  const englishTextNKJV = (nkjv.praiseTitle || raw.englishText).replace(/\.$/, '').trim();
  const tamilTextClean = (raw.subtitles?.line1Tamil || raw.tamilText || raw.tamilTitle).trim();

  // Combine existing tags with target audience algorithm tags (without hash)
  const existingTags = (raw.seo?.tags || []).map(t => t.replace(/^#/, '').trim());
  const mergedTags = Array.from(new Set([...existingTags, ...TARGET_TAMIL_ALGORITHM_TAGS]));

  // Audio text and on-screen overlay text must be 100% identical and synchronized:
  // Spoken Tamil: Line 1 Tamil overlay
  // Spoken English: Line 2 English overlay
  const unifiedAudioScript = `[Pause] ${tamilTextClean} ... ${englishTextNKJV}.`;
  // Character-and-scene-matched voice profile: Voice, tone, gender, age, and intonation authentically match the on-screen biblical character and historical scene.
  const characterMatchingVoice = raw.voiceProfile || `Devout, reverent voice authentically matching the on-screen biblical character with solemn adoration, emotional depth, and prayerful cadence.`;

  const enriched: ShortsBlueprint = {
    ...raw,
    englishText: englishTextNKJV,
    voiceProfile: characterMatchingVoice,
    audioScript: unifiedAudioScript,
    nkjvText: nkjv.verseText,
    translationVersion: 'NKJV',
    characterExpression: charExpr,
    videoPrompt: videoPromptInculcated,
    subtitles: {
      ...raw.subtitles,
      line1Tamil: tamilTextClean,
      line2English: englishTextNKJV,
      line3Ref: `${raw.tamilRef} | ${raw.englishRef} (NKJV)`
    },
    seo: {
      ...raw.seo,
      title: `${raw.tamilTitle} | ${conciseTitle} | 1000 Praises #${raw.id} | Gracy's Biblical Echoes`,
      description: getFormattedYouTubeDescription(raw),
      tags: mergedTags
    }
  };

  return enrichBlueprintWithVerification(enriched);
}

export const INITIAL_BLUEPRINTS: ShortsBlueprint[] = RAW_BLUEPRINTS.map(enrichBlueprintWithExpressionsAndNKJV);

export const TOTAL_PRAISES_TARGET = 1000;
export const CURRENT_VERIFIED_COUNT = INITIAL_BLUEPRINTS.length;



