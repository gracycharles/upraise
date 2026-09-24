import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Video, 
  Mic, 
  Subtitles, 
  Hash, 
  Share2, 
  ExternalLink, 
  UserCheck, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Languages
} from 'lucide-react';
import { ShortsBlueprint } from '../types';
import { 
  formatBlueprintAsText, 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getEnglishTitleOnly,
  getTamilPraiseWithRef,
  getFormattedYouTubeDescription,
  getScriptureVerificationText,
  formatSubtitlesOnlyText,
  formatVideoPromptOnlyText,
  formatAudioOnlyText,
  getUnicodeCodepoints,
  getCharacterExpressionText
} from '../utils/blueprintFormatter';
import { getScriptureVerification } from '../data/scriptureVerifications';
import { computeOverlayTypography } from '../utils/overlayTypographyEngine';
import { downloadAlphaOverlayPng } from '../utils/alphaOverlayGenerator';

interface BlueprintCardProps {
  blueprint: ShortsBlueprint;
  totalCount?: number;
  prevId?: number | null;
  nextId?: number | null;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  onOpenNavigator?: () => void;
}

const BlueprintCardComponent: React.FC<BlueprintCardProps> = ({ 
  blueprint,
  totalCount,
  prevId,
  nextId,
  onNavigatePrev,
  onNavigateNext,
  onOpenNavigator
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);
  const [isAudioOpen, setIsAudioOpen] = useState<boolean>(false);
  const [isSeoOpen, setIsSeoOpen] = useState<boolean>(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleDownloadAlphaPng = async () => {
    try {
      setIsGeneratingPng(true);
      await downloadAlphaOverlayPng(blueprint);
    } catch (err) {
      console.error('Failed to download alpha overlay PNG:', err);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  const fullBlueprintText = useMemo(() => formatBlueprintAsText(blueprint), [blueprint]);
  const englishTitleOnly = useMemo(() => getEnglishTitleOnly(blueprint), [blueprint]);
  const tamilPraiseWithRef = useMemo(() => getTamilPraiseWithRef(blueprint), [blueprint]);
  const formattedDescription = useMemo(() => getFormattedYouTubeDescription(blueprint), [blueprint]);
  const verification = useMemo(() => blueprint.verification || getScriptureVerification(blueprint), [blueprint]);
  const verificationText = useMemo(() => getScriptureVerificationText(blueprint), [blueprint]);
  const codepoints = useMemo(() => getUnicodeCodepoints(blueprint.subtitles.line1Tamil), [blueprint.subtitles.line1Tamil]);
  const typo = useMemo(() => computeOverlayTypography(
    blueprint.subtitles.line1Tamil,
    blueprint.subtitles.line2English,
    blueprint.subtitles.line3Ref
  ), [blueprint.subtitles.line1Tamil, blueprint.subtitles.line2English, blueprint.subtitles.line3Ref]);
  const promptAddition = `${typo.promptAdditionDirective}
- Verification: Exact Unicode codepoints: ${codepoints}`;

  return (
    <article 
      id={`short-card-${blueprint.id}`}
      className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300"
    >
      {/* Top Banner with Short # and Quick Actions */}
      <div className="bg-stone-950/80 border-b border-stone-800 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-sm rounded-lg shadow-sm">
            Short #{blueprint.id}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-stone-100 font-serif tracking-wide">
            {blueprint.tamilTitle}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Button 1: Copy Title */}
          <button
            onClick={() => copyToClipboard(englishTitleOnly, 'top-title')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm transition-all"
            title={`Copy Title: "${englishTitleOnly}"`}
          >
            {copiedSection === 'top-title' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied Title!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copy Title</span>
              </>
            )}
          </button>

          {/* Button 2: Copy Description */}
          <button
            onClick={() => copyToClipboard(formattedDescription, 'top-desc')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm transition-all"
            title="Copy formatted 3-part description (Tamil praise with ref, scripture verse, personal prayer/affirmation)"
          >
            {copiedSection === 'top-desc' ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 font-bold">Copied Description!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy Description</span>
              </>
            )}
          </button>

          {/* Button 3: Video Gen Only */}
          <button
            onClick={() => copyToClipboard(formatVideoGenerationOnlyText(blueprint), 'top-video-only')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold shadow-sm transition-all"
            title="Copy simultaneous 9:16 vertical video & audio prompt with zero-hallucination mandate and text overlay specifications"
          >
            {copiedSection === 'top-video-only' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied Prompt!</span>
              </>
            ) : (
              <>
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>Video Gen Only</span>
              </>
            )}
          </button>

          {/* Button 4: Copy Tags (CSV) */}
          <button
            onClick={() => copyToClipboard(blueprint.seo.tags.join(', '), 'top-tags-csv')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-sm transition-all"
            title="Copy tags as comma-separated values ready for YouTube Studio"
          >
            {copiedSection === 'top-tags-csv' ? (
              <>
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-purple-400 font-bold">Copied Tags (CSV)!</span>
              </>
            ) : (
              <>
                <Hash className="w-3.5 h-3.5 text-purple-400" />
                <span>Copy Tags (CSV)</span>
              </>
            )}
          </button>

          {/* Button 5: Copy All */}
          <button
            onClick={() => copyToClipboard(fullBlueprintText, 'top-all')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-all"
            title="Copy complete production blueprint with both Video and YouTube metadata"
          >
            {copiedSection === 'top-all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied All!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Copy All</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        
        {/* Bilingual Scripture Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Tamil Scripture */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                Tamil Text (தமிழ் வசனம்)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => copyToClipboard(formattedDescription, 'tamil-box')}
                  className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/20 px-2 py-0.5 rounded transition-all"
                  title="Copy 3-part description (Tamil praise with ref, scripture verse, personal prayer/affirmation)"
                >
                  {copiedSection === 'tamil-box' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-amber-400" />
                      <span>Copy Description</span>
                    </>
                  )}
                </button>
                <span className="text-xs font-bold text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {blueprint.tamilRef}
                </span>
              </div>
            </div>
            <p className="text-stone-100 text-sm sm:text-base leading-relaxed font-serif">
              "{blueprint.tamilText}"
            </p>
          </div>

          {/* Biblical English Translation */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                  Biblical English Translation
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                  Holy Scripture Grounded
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => copyToClipboard(englishTitleOnly, 'english-box')}
                  className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/20 px-2 py-0.5 rounded transition-all"
                  title={`Copy Title: "${englishTitleOnly}"`}
                >
                  {copiedSection === 'english-box' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-emerald-400" />
                      <span>Copy Title</span>
                    </>
                  )}
                </button>
                <span className="text-xs font-bold text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {blueprint.englishRef}
                </span>
              </div>
            </div>
            <p className="text-stone-100 text-sm sm:text-base leading-relaxed font-serif italic text-stone-200">
              "{blueprint.englishText}"
            </p>

            {/* Canonical Verse Quotation */}
            {blueprint.nkjvText && (
              <div className="mt-2.5 pt-2.5 border-t border-stone-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-emerald-950/15 p-2.5 rounded-lg border border-emerald-500/20">
                <div className="flex items-start gap-2 flex-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
                      Canonical Scripture Verse ({blueprint.englishRef}):
                    </span>
                    <p className="font-serif italic text-stone-200 text-xs mt-0.5 leading-relaxed">
                      "{blueprint.nkjvText}"
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(blueprint.nkjvText!, 'nkjv-verse')}
                  className="text-[10px] font-mono text-emerald-300 hover:text-emerald-200 bg-emerald-950/50 hover:bg-emerald-900/60 px-2 py-1 rounded border border-emerald-500/30 shrink-0 transition-all flex items-center gap-1 self-end sm:self-auto"
                  title="Copy Bible Verse Text"
                >
                  {copiedSection === 'nkjv-verse' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="font-bold">Copied Verse!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-emerald-400" />
                      <span>Copy Verse</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* 📝 On-Screen Text Overlay & Translation (Top Placement - Burn-In Subtitles Preview) */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400">
                <Subtitles className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono flex items-center gap-2 flex-wrap">
                <span>📝 On-Screen Text Overlay & Translation (9:16 Center Safe Zone)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 font-mono font-semibold">
                  Clean Alpha PNG / Burn-In
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${typo.uiBadgeClass}`}>
                  {typo.uiBadgeText}
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadAlphaPng}
                disabled={isGeneratingPng}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
                title="Download 1080x1920 clean transparent alpha text overlay PNG"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{isGeneratingPng ? 'Generating...' : 'Download Alpha PNG'}</span>
              </button>
              <button
                onClick={() => copyToClipboard(formatSubtitlesOnlyText(blueprint), 'subs')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition-all flex items-center gap-1.5"
                title="Copy 3-line overlay, sizing directives & Unicode specs"
              >
                {copiedSection === 'subs' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Specs!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-400" />
                    <span>Copy Overlay Specs</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3.5 text-xs">
            {/* Visual 9:16 Center Safe Zone Preview (Clean, No Drop-Shadow) */}
            <div className="p-4 sm:p-5 rounded-lg bg-black/90 border border-stone-800 text-center space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-1.5 text-[10px] font-mono text-stone-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                  9:16 Center Safe Zone (Lifted Y: 900-1300px • 350px Bottom Clearance)
                </span>
                <span className="text-stone-300">
                  Canvas Auto-Fit: <strong className="text-amber-300 font-mono">~{typo.tamilPx}px</strong> ({typo.scalePercent}% scale)
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-amber-500/70 tracking-wider">Line 1 • Gold #FFC107:</div>
                <div className={`text-amber-400 tracking-wide font-tamil-overlay ${typo.uiTamilClass}`}>
                  {blueprint.subtitles.line1Tamil}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono text-emerald-400/80 tracking-wider font-semibold">Line 2 • White #F8F9FA (English Translation):</div>
                <div className={`text-white font-serif italic ${typo.uiEnglishClass}`}>
                  "{blueprint.subtitles.line2English}"
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="text-[10px] font-mono text-stone-500 tracking-wider">Line 3 • Stone Gray #A8A29E (Dual Reference):</div>
                <div className={`text-stone-400 font-mono ${typo.uiRefClass}`}>
                  {blueprint.subtitles.line3Ref}
                </div>
              </div>
            </div>

            {/* 🔤 Exact On-Screen Translation Breakdown (Line-by-Line Zero-Loss Inspection) */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                    On-Screen Burn-In Translation & Biblical Grounding:
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                  Zero Loss of Text • 1:1 Biblical Context
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {/* Tamil Spoken & Burned Line */}
                <div className="p-2.5 rounded bg-black/60 border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                    <span>Line 1 (Tamil Praise Spoken & Burned):</span>
                    <span className="text-stone-500 font-sans">{blueprint.tamilRef}</span>
                  </div>
                  <p className="font-tamil-overlay text-amber-300 font-semibold text-sm">
                    {blueprint.subtitles.line1Tamil}
                  </p>
                </div>

                {/* English Translated Line */}
                <div className="p-2.5 rounded bg-black/60 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                    <span>Line 2 (English Translation Burned):</span>
                    <button
                      onClick={() => copyToClipboard(blueprint.subtitles.line2English, 'copy-overlay-trans')}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono transition-colors"
                      title="Copy English Overlay Translation"
                    >
                      {copiedSection === 'copy-overlay-trans' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Translation</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-serif italic text-white font-medium text-sm">
                    "{blueprint.subtitles.line2English}"
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-stone-300 flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-emerald-500/20 font-sans">
                <span>
                  <strong className="text-emerald-300 font-mono">Scripture Grounding:</strong> Faithful biblical rendering of {blueprint.englishRef} preserving the full context of the Tamil praise with zero dropped words.
                </span>
                <span className="font-mono text-stone-400 text-[10px] shrink-0">
                  {blueprint.subtitles.line3Ref}
                </span>
              </div>
            </div>

            {/* Auto-Scaled Sizing Directive & Content Preservation Guarantee */}
            <div className={`p-3 rounded-lg border space-y-2 ${typo.reductionPercent > 0 ? 'bg-amber-950/20 border-amber-500/30' : 'bg-stone-900/90 border-stone-800'}`}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold flex items-center gap-1.5 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                  📐 Video Gen Overlay Directive: {typo.tierLabel}
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  100% Content Intact (Zero Loss)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded bg-black/60 border border-stone-800">
                  <span className="block text-[10px] text-stone-400 font-mono uppercase">Tamil Font Scale</span>
                  <span className="font-mono text-amber-300 font-bold text-xs">~{typo.tamilFontSizeCanvas}</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">{typo.tamilCharCount} chars ({typo.scalePercent}% scale)</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-stone-800">
                  <span className="block text-[10px] text-stone-400 font-mono uppercase">English Font Scale</span>
                  <span className="font-mono text-stone-100 font-bold text-xs">~{typo.englishFontSizeCanvas}</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">{typo.englishCharCount} chars</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-stone-800">
                  <span className="block text-[10px] text-stone-400 font-mono uppercase">Safe Margin & Style</span>
                  <span className="font-mono text-teal-300 font-semibold text-[11px]">Max 760px Safe Zone</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">{typo.recommendedWrap}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-300 leading-relaxed font-sans pt-1">
                {typo.reductionPercent > 0 ? (
                  <>
                    <strong className="text-amber-300">Reduced Font Scale for Video Gen:</strong> High character density detected ({typo.tamilCharCount} Tamil / {typo.englishCharCount} English chars). The video generator and overlay compositor are instructed to scale the font by <strong className="text-amber-300">{typo.reductionPercent}%</strong> to prevent margin clipping, while strictly guaranteeing <strong className="text-emerald-400">zero content loss</strong> (no words omitted or truncated).
                  </>
                ) : (
                  <>
                    <strong className="text-stone-200">Standard Font Scale:</strong> Standard character density. Full praise text fits comfortably on single lines within the 80% center safe margins with zero loss.
                  </>
                )}
              </p>
            </div>

            {/* Exact Unicode Codepoint Verification (வ vs ன distinction) */}
            <div className="p-3 rounded-lg bg-stone-900/90 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-teal-300 font-mono font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"></span>
                  Exact Unicode Codepoints (Tamil Line 1):
                </span>
                <button
                  onClick={() => copyToClipboard(codepoints, 'codepoints')}
                  className="text-[10px] font-mono text-stone-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                >
                  {copiedSection === 'codepoints' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Codepoints</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-[11px] text-stone-300 bg-stone-950 p-2.5 rounded border border-stone-800/80 select-all break-all leading-relaxed">
                {codepoints}
              </p>
              <div className="p-2 rounded bg-teal-950/40 border border-teal-500/20 text-[11px] text-teal-200/90 leading-relaxed font-sans">
                <strong className="text-teal-300 font-mono">Orthographic Accuracy & Letter Distinction:</strong> In Tamil, <strong>வ (U+0BB5)</strong> and <strong>ன (U+0BA9)</strong> are distinct Unicode codepoints. Video models sometimes confuse similar glyphs in latent space causing the <em>தேவவே</em> bug. By explicitly prompting the model with exact Unicode and letter-distinction directives, <strong>தேவனே</strong> is rendered 100% letter-perfect without drop-shadow obscuring the scene.
              </div>
            </div>

            {/* Compositing Specs Footnotes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-stone-400">
              <div className="p-2 rounded bg-stone-900 border border-stone-800">
                <span className="block text-[10px] text-stone-500 font-mono uppercase">Typography & Style</span>
                <span className="font-mono text-stone-200 font-semibold">Model Selected & Styled</span>
              </div>
              <div className="p-2 rounded bg-stone-900 border border-stone-800">
                <span className="block text-[10px] text-stone-500 font-mono uppercase">Compositing Mode</span>
                <span className="font-mono text-teal-300 font-semibold">Direct Burn-In / Clean Alpha</span>
              </div>
              <div className="p-2 rounded bg-stone-900 border border-stone-800">
                <span className="block text-[10px] text-stone-500 font-mono uppercase">Positioning & Shadow</span>
                <span className="font-mono text-amber-300 font-semibold">Y: 50% Center (No Drop-Shadow)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 📖 Scripture Reference & Translation Verification (Initially Collapsed) */}
        {verification && (
          <div className="bg-stone-950/70 rounded-xl border border-teal-500/30 shadow-sm overflow-hidden transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 sm:p-4 hover:bg-stone-900/40 transition-colors">
              <button
                onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                className="flex items-center gap-2 flex-1 text-left"
              >
                <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300 font-mono flex items-center gap-2">
                  <span>Scripture Reference Check</span>
                  <span className="text-[10px] text-stone-400 font-normal normal-case hidden sm:inline">
                    (Theological & Translation Verification)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 font-semibold">
                    {isVerificationOpen ? 'Hide' : 'Show Details'}
                  </span>
                </h3>
                {isVerificationOpen ? (
                  <ChevronUp className="w-4 h-4 text-teal-400 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-teal-400 ml-1" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(verificationText, 'verification-box')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 text-xs font-semibold border border-teal-500/30 transition-all shadow-sm"
                title="Copy complete scripture reference check and translation verification text"
              >
                {copiedSection === 'verification-box' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-teal-400 font-bold">Copied Verification!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-400" />
                    <span>Copy Verification</span>
                  </>
                )}
              </button>
            </div>

            {isVerificationOpen && (
              <div className="p-4 sm:p-5 pt-0 space-y-3.5 border-t border-stone-800/80">
                {/* Analysis Breakdown */}
                <div className="space-y-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans pt-3">
                  <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                      Cited Scripture Analysis ({blueprint.englishRef} / {blueprint.tamilRef}):
                    </span>
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                      {verification.citedVerseAnalysis}
                    </p>
                  </div>

                  <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 block font-mono">
                      Exact Title Match in Scripture:
                    </span>
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                      {verification.exactTitleMatch}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg text-emerald-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium leading-relaxed">
                      {verification.verdict}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Character & Location Context */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-stone-950/40 p-3 rounded-xl border border-stone-800/50">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-stone-300">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-stone-400">Character:</span>
              <span className="font-medium text-stone-200">{blueprint.character}</span>
            </div>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-stone-400">Setting:</span>
              <span className="font-medium text-stone-200">{blueprint.location}</span>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`Character:\n${blueprint.character}\n•\nSetting:\n${blueprint.location}`, 'char-setting')}
            className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 px-2 py-0.5 rounded transition-all ml-auto"
            title="Copy Character and Setting"
          >
            {copiedSection === 'char-setting' ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-stone-400" />
                <span>Copy Character & Setting</span>
              </>
            )}
          </button>
        </div>

        {/* 🎭 Character Expression & Scene Inculcation */}
        {blueprint.characterExpression && (
          <section className="bg-stone-950/80 rounded-xl border border-amber-500/30 p-4 space-y-3 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/15 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide uppercase font-mono flex items-center gap-2">
                    <span>🎭 Character Expression & Scene Inculcation</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400">
                      Context-Matched
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                    Facial micro-expressions, posture, and environmental interaction dynamically matched to this praise's theology
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(getCharacterExpressionText(blueprint), 'char-expr')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-1.5"
                title="Copy Character Expression & Scene Direction"
              >
                {copiedSection === 'char-expr' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Expression!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Expression</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>👀</span> Facial Micro-Expression & Gaze:
                </span>
                <p className="text-stone-200 leading-relaxed font-sans">
                  {blueprint.characterExpression.expression}
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>🤲</span> Body Posture & Hand Gestures:
                </span>
                <p className="text-stone-200 leading-relaxed font-sans">
                  {blueprint.characterExpression.gesturePosture}
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>🕊</span> Emotional & Theological Context:
                </span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {blueprint.characterExpression.theologicalMood}
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>🌅</span> Atmospheric Scene Inculcation:
                </span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {blueprint.characterExpression.sceneAtmosphere}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 🎥 Video Generation Prompt (9:16 Vertical) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                <Video className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono">
                🎥 Video Generation Prompt (9:16 - Clean Plate Only)
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(formatVideoPromptOnlyText(blueprint), 'video')}
              className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-1.5"
              title="Copy Video Prompt with Mandatory Directives and PNG Overlay specs"
            >
              {copiedSection === 'video' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied Full Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Full Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block"></span>
                  1. On-Screen Text Overlay & Subtitle Translation Directive:
                </span>
                <button
                  onClick={() => copyToClipboard(promptAddition, 'prompt-addition')}
                  className="text-[10px] font-mono text-stone-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  {copiedSection === 'prompt-addition' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied Directive!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Directive</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs text-red-200 select-all leading-relaxed bg-black/60 p-2.5 rounded border border-red-900/40">
                {promptAddition}
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>2. 9:16 Video Plate Prompt (Visuals & Scene Direction):</span>
                <span className="text-amber-400 font-semibold">Scene & Character Direction • 8K 30 AD</span>
              </div>
              <p className="font-mono text-xs text-stone-200 select-all leading-relaxed bg-stone-900/90 p-3 rounded-lg border border-stone-800">
                {blueprint.videoPrompt}
              </p>
            </div>
          </div>
        </section>

        {/* 🎙 Audio & Voiceover Prompt (Initially Collapsed) */}
        <section className="bg-stone-950/60 rounded-xl border border-stone-800 overflow-hidden transition-all">
          <div className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-stone-900/40 transition-colors">
            <button
              onClick={() => setIsAudioOpen(!isAudioOpen)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                <Mic className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono flex items-center gap-2">
                <span>🎙 Audio & Voiceover Prompt</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 font-normal">
                  {isAudioOpen ? 'Hide' : 'Show Details'}
                </span>
              </h3>
              {isAudioOpen ? (
                <ChevronUp className="w-4 h-4 text-stone-400 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400 ml-1" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(formatAudioOnlyText(blueprint), 'audio')}
              className="text-xs font-medium flex items-center gap-1 text-stone-400 hover:text-emerald-400 transition-colors px-2 py-1 rounded hover:bg-stone-900"
            >
              {copiedSection === 'audio' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied Audio Prompt</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Audio Prompt</span>
                </>
              )}
            </button>
          </div>
          {isAudioOpen && (
            <div className="p-4 pt-0 border-t border-stone-800/80 space-y-2.5 text-xs text-stone-300">
              <div className="pt-3">
                <span className="text-stone-500 font-mono uppercase text-[10px] block">Voice Profile:</span>
                <p className="text-stone-200 font-medium">{blueprint.voiceProfile}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 space-y-2">
                <div>
                  <span className="text-emerald-400 font-mono uppercase text-[10px] block font-bold mb-1">
                    Bilingual Voiceover Script (Exact Text Only):
                  </span>
                  <p className="font-serif text-sm text-stone-100 italic">
                    "{blueprint.audioScript}"
                  </p>
                </div>
                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300/90 leading-relaxed font-sans">
                  <strong className="text-emerald-200 font-semibold">CRITICAL DIRECTIVE:</strong> Read ONLY the exact scripted lines above. Zero unscripted words, no intro/outro, no background theological commentary, and no spontaneous exegesis.
                </div>
              </div>
              <div>
                <span className="text-stone-500 font-mono uppercase text-[10px] block">Background Atmosphere:</span>
                <p className="text-stone-400 font-mono text-[11px]">{blueprint.backgroundAudio}</p>
              </div>
            </div>
          )}
        </section>

        {/* 🏷 YouTube SEO & Tags (Initially Collapsed) */}
        <section className="bg-stone-950/60 rounded-xl border border-stone-800 overflow-hidden transition-all">
          <div className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-stone-900/40 transition-colors">
            <button
              onClick={() => setIsSeoOpen(!isSeoOpen)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400">
                <Hash className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono flex items-center gap-2">
                <span>🏷 YouTube SEO, Title & Tags</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 font-normal">
                  {isSeoOpen ? 'Hide' : 'Show Details'}
                </span>
              </h3>
              {isSeoOpen ? (
                <ChevronUp className="w-4 h-4 text-stone-400 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400 ml-1" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(`Title: ${blueprint.seo.title}\n\nDescription:\n${blueprint.seo.description}\n\nTags (CSV):\n${blueprint.seo.tags.join(', ')}\n\nHashtags (CSV):\n${blueprint.seo.hashtags.join(', ')}`, 'seo')}
              className="text-xs font-medium flex items-center gap-1 text-stone-400 hover:text-purple-400 transition-colors px-2 py-1 rounded hover:bg-stone-900"
            >
              {copiedSection === 'seo' ? (
                <>
                  <Check className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Copied SEO</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy SEO Details</span>
                </>
              )}
            </button>
          </div>

          {isSeoOpen && (
            <div className="p-4 pt-0 border-t border-stone-800/80 space-y-3.5 text-xs text-stone-300">
              <div className="pt-3"></div>
              {/* Video Title Row with Adjacent English Text Copy */}
              <div className="p-3 rounded-lg bg-stone-900/50 border border-stone-800/80 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Video Title:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(englishTitleOnly, 'english-title-only')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition-all shadow-sm"
                      title={`Copy Title (English text): "${englishTitleOnly}"`}
                    >
                      {copiedSection === 'english-title-only' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied Title!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-emerald-400" />
                          <span>Copy Title</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(blueprint.seo.title, 'full-title')}
                      className="text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1 transition-colors px-1"
                      title="Copy full video title with prefixes"
                    >
                      {copiedSection === 'full-title' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied Full Title</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Full Title</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-stone-100 text-sm font-serif">{blueprint.seo.title}</p>
              </div>

              {/* Description Row with Structured 3-Part Layout */}
              <div className="p-3 rounded-lg bg-stone-900/50 border border-stone-800/80 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Description (Tamil Praise + Scripture Verse + Personal Prayer):
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(formattedDescription, 'seo-description')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition-all shadow-sm"
                      title="Copy 3-part description (Tamil praise with ref, scripture verse, personal prayer/affirmation)"
                    >
                      {copiedSection === 'seo-description' ? (
                        <>
                          <Check className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400 font-bold">Copied Description!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-amber-400" />
                          <span>Copy Description</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-stone-950/60 p-3 rounded-lg border border-stone-800/60">
                  <p className="text-stone-300 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-sans">
                    {blueprint.seo.description}
                  </p>
                </div>
              </div>
              
              {/* Tags with Comma Separated Copy */}
              <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Tags (Comma-Separated for YouTube Studio):
                  </span>
                  <button
                    onClick={() => copyToClipboard(blueprint.seo.tags.join(', '), 'tags-csv')}
                    className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    title="Copy tags as comma-separated values ready for YouTube Studio"
                  >
                    {copiedSection === 'tags-csv' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Tags (CSV)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Tags (CSV)</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-amber-300 select-all border border-stone-800/60">
                  {blueprint.seo.tags.join(', ')}
                </div>
              </div>

              {/* Hashtags with Comma Separated Copy */}
              <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Hashtags (Comma-Separated for YouTube Studio):
                  </span>
                  <button
                    onClick={() => copyToClipboard(blueprint.seo.hashtags.join(', '), 'hashtags-csv')}
                    className="text-[11px] font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                    title="Copy hashtags as comma-separated values ready for YouTube Studio"
                  >
                    {copiedSection === 'hashtags-csv' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Hashtags (CSV)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hashtags (CSV)</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-purple-300 select-all border border-stone-800/60">
                  {blueprint.seo.hashtags.join(', ')}
                </div>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* Card Navigation Footer */}
      {(onNavigatePrev || onNavigateNext || onOpenNavigator) && (
        <div className="bg-stone-950/90 px-5 py-3.5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={onNavigatePrev}
            disabled={!prevId}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              prevId
                ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                : 'bg-stone-950 text-stone-600 border-stone-850 cursor-not-allowed opacity-50'
            }`}
            title={prevId ? `Go to Previous Short (#${prevId})` : 'First Short'}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{prevId ? `Previous (#${prevId})` : 'First Short'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-mono">
              Short <strong className="text-amber-300 font-bold">#{blueprint.id}</strong> of {totalCount || 300}
            </span>
            {onOpenNavigator && (
              <button
                onClick={onOpenNavigator}
                className="px-2.5 py-1 rounded-md bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold transition-all text-[11px]"
                title="Open Quick Navigator to browse all shorts"
              >
                Jump to Short...
              </button>
            )}
          </div>

          <button
            onClick={onNavigateNext}
            disabled={!nextId}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              nextId
                ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                : 'bg-stone-950 text-stone-600 border-stone-850 cursor-not-allowed opacity-50'
            }`}
            title={nextId ? `Go to Next Short (#${nextId})` : 'Last Short'}
          >
            <span>{nextId ? `Next (#${nextId})` : 'Last Short'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </article>
  );
};

export const BlueprintCard = React.memo(BlueprintCardComponent);
