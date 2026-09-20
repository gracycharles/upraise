export interface PraiseItem {
  id: number;
  text: string;
  reference: string;
  page: number;
  category?: string;
  notes?: string;
}

export interface BookMetadata {
  title: string;
  subtitle: string;
  author: string;
  organization: string;
  address: string;
  phone: string;
  scriptureVerses: string[];
  foreword: {
    title: string;
    content: string;
    author: string;
  };
}

export interface PageData {
  page: number;
  title: string;
  rawText: string;
  praises: PraiseItem[];
}

export interface CharacterExpression {
  expression: string;
  gesturePosture: string;
  theologicalMood: string;
  sceneAtmosphere: string;
  inculcatedPromptAddition: string;
}

export interface ScriptureVerification {
  citedVerseAnalysis: string;
  exactTitleMatch: string;
  verdict: string;
  fullVerificationText: string;
  nkjvVerseQuote?: string;
}

export interface ShortsBlueprint {
  id: number;
  tamilTitle: string;
  tamilText: string;
  tamilRef: string;
  englishText: string;
  englishRef: string;
  character: string;
  location: string;
  videoPrompt: string;
  voiceProfile: string;
  audioScript: string;
  backgroundAudio: string;
  subtitles: {
    line1Tamil: string;
    line2English: string;
    line3Ref: string;
  };
  seo: {
    title: string;
    description: string;
    tags: string[];
    hashtags: string[];
  };
  verification?: ScriptureVerification;
  characterExpression?: CharacterExpression;
  nkjvText?: string;
  translationVersion?: 'NKJV';
}

export type ViewTab = 'studio' | 'directory';
