import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, CheckCircle2, Video, Hash, BookOpen, Sparkles } from 'lucide-react';
import { ShortsBlueprint } from '../types';
import { 
  formatBlueprintAsText, 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getEnglishTitleOnly,
  getTamilPraiseWithRef,
  getFormattedYouTubeDescription,
  getScriptureVerificationText
} from '../utils/blueprintFormatter';

interface BatchExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprints: ShortsBlueprint[];
}

export const BatchExportModal: React.FC<BatchExportModalProps> = ({
  isOpen,
  onClose,
  blueprints
}) => {
  const [selectedBatch, setSelectedBatch] = useState<'all' | '1-50' | '51-100' | '101-150' | '151-200' | '101-200' | '201-250' | '251-300' | '201-300'>('all');
  const [exportMode, setExportMode] = useState<'all' | 'video-only' | 'youtube-only' | 'english-only' | 'tamil-only' | 'verification-only' | 'expressions-only' | 'nkjv-only'>('all');
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredBlueprints = blueprints.filter(b => {
    if (selectedBatch === '1-50') return b.id >= 1 && b.id <= 50;
    if (selectedBatch === '51-100') return b.id >= 51 && b.id <= 100;
    if (selectedBatch === '101-150') return b.id >= 101 && b.id <= 150;
    if (selectedBatch === '151-200') return b.id >= 151 && b.id <= 200;
    if (selectedBatch === '101-200') return b.id >= 101 && b.id <= 200;
    if (selectedBatch === '201-250') return b.id >= 201 && b.id <= 250;
    if (selectedBatch === '251-300') return b.id >= 251 && b.id <= 300;
    if (selectedBatch === '201-300') return b.id >= 201 && b.id <= 300;
    return true;
  });

  const getExportModeLabel = (mode: typeof exportMode): string => {
    switch (mode) {
      case 'all': return 'Full Blueprint (Video + YouTube)';
      case 'video-only': return '1) Video Generation Alone';
      case 'youtube-only': return '2) YouTube Alone (SEO & Tags)';
      case 'expressions-only': return '3) Character Expressions & Inculcated Scene Prompts';
      case 'nkjv-only': return '4) Scripture Canonical Verses & Titles';
      case 'english-only': return 'English Titles Only';
      case 'tamil-only': return 'Tamil Descriptions Only';
      case 'verification-only': return 'Scripture Reference & Translation Verification';
      default: return 'Full Blueprint';
    }
  };

  const exportHeader = (exportMode === 'english-only' || exportMode === 'tamil-only' || exportMode === 'nkjv-only')
    ? ''
    : `================================================================================
GRACY’S BIBLICAL ECHOES — YOUTUBE SHORTS PRODUCTION BLUEPRINTS
Channel: Gracy’s Biblical Echoes
YouTube Handle: @GracysBiblicalEchoes
Hosted by: Gracy
Schedule: 2 Original Bilingual (Tamil & English) Praise Videos Daily
Atmosphere: 30 AD Authentic Judean & Galilean Cinematic Visuals
Video Pipeline: 9:16 Clean Plate Video + Separate 1080x1920 Alpha Overlay PNG Pipeline (Zero Text in Video, Exact Unicode, No Drop-Shadow)
Key Anchor: "Praise be to You, Abba, Father."
Bible Translation: Faithful Holy Scripture Translation
Export Mode: ${getExportModeLabel(exportMode)}
Batch: ${selectedBatch} (${filteredBlueprints.length} Blueprints)
================================================================================\n\n`;

  const exportContent = exportMode === 'english-only'
    ? filteredBlueprints.map(b => getEnglishTitleOnly(b)).join('\n')
    : exportMode === 'tamil-only'
    ? filteredBlueprints.map(b => getFormattedYouTubeDescription(b)).join('\n\n----------------------------------------\n\n')
    : exportMode === 'nkjv-only'
    ? filteredBlueprints.map(b => `Short #${b.id} | ${b.tamilTitle}\nTitle: ${b.englishText}\nScripture: ${b.englishRef}\nVerse: "${b.nkjvText || b.englishText}"`).join('\n\n')
    : exportMode === 'expressions-only'
    ? filteredBlueprints.map(b => `Short #${b.id}: ${b.tamilTitle} | ${b.englishText}
Character: ${b.character} (${b.location})
Facial Micro-Expression: ${b.characterExpression?.expression || ''}
Posture & Gestures: ${b.characterExpression?.gesturePosture || ''}
Theological Emotion: ${b.characterExpression?.theologicalMood || ''}
Atmosphere: ${b.characterExpression?.sceneAtmosphere || ''}
Inculcated Prompt:
${b.videoPrompt}`).join('\n\n----------------------------------------\n\n')
    : exportMode === 'verification-only'
    ? filteredBlueprints.map(b => `Short #${b.id} | ${b.tamilTitle}\n${getScriptureVerificationText(b)}`).join('\n\n----------------------------------------\n\n')
    : filteredBlueprints.map(b => {
        if (exportMode === 'video-only') {
          return formatVideoGenerationOnlyText(b);
        }
        if (exportMode === 'youtube-only') {
          return `Short #${b.id}: ${b.tamilTitle}
${formatYouTubeOnlyText(b)}`;
        }
        return formatBlueprintAsText(b);
      }).join('\n\n========================================\n\n');

  const exportText = exportHeader + exportContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setCopiedType('all');
    setTimeout(() => {
      setCopied(false);
      setCopiedType(null);
    }, 2000);
  };

  const handleCopyAllEnglish = () => {
    const list = filteredBlueprints.map(b => getEnglishTitleOnly(b)).join('\n');
    navigator.clipboard.writeText(list);
    setCopiedType('english');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAllTamil = () => {
    const list = filteredBlueprints.map(b => getFormattedYouTubeDescription(b)).join('\n\n----------------------------------------\n\n');
    navigator.clipboard.writeText(list);
    setCopiedType('tamil');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAllVerifications = () => {
    const list = filteredBlueprints.map(b => `Short #${b.id} | ${b.tamilTitle}\n${getScriptureVerificationText(b)}`).join('\n\n----------------------------------------\n\n');
    navigator.clipboard.writeText(list);
    setCopiedType('verifications');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAllTagsCsv = () => {
    // Collect all tags from the filtered batch, deduplicate while preserving order
    const allTags = Array.from(new Set(filteredBlueprints.flatMap(b => b.seo.tags)));
    navigator.clipboard.writeText(allTags.join(', '));
    setCopiedType('tags');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAllHashtagsCsv = () => {
    // Collect all hashtags from the filtered batch, deduplicate while preserving order
    const allHashtags = Array.from(new Set(filteredBlueprints.flatMap(b => b.seo.hashtags)));
    navigator.clipboard.writeText(allHashtags.join(', '));
    setCopiedType('hashtags');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gracys-biblical-echoes-blueprints-${selectedBatch}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const exportData = {
      channelName: "Gracy’s Biblical Echoes",
      youtubeHandle: "@GracysBiblicalEchoes",
      hostedBy: "Gracy",
      schedule: "2 original bilingual (Tamil & English) praise videos posted every single day",
      batch: selectedBatch,
      count: filteredBlueprints.length,
      blueprints: filteredBlueprints
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gracys-biblical-echoes-blueprints-${selectedBatch}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-stone-900 border border-stone-800 w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif">
                Gracy’s Biblical Echoes — Batch Export
              </h3>
              <p className="text-xs text-stone-400">
                Formatted for Midjourney, Runway, ElevenLabs & YouTube Studio (@GracysBiblicalEchoes)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Batch Selection Tabs */}
        <div className="px-5 py-3 border-b border-stone-800 bg-stone-950/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-400 font-medium mr-1">Select Batch:</span>
            {(['all', '1-50', '51-100', '101-150', '151-200', '101-200', '201-250', '251-300', '201-300'] as const).map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedBatch === batch
                    ? 'bg-amber-600 text-stone-950'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {batch === 'all' ? `All (${blueprints.length})` : `#${batch}`}
              </button>
            ))}
          </div>

          {/* Mode Selector (Full, Video Gen Only, YouTube Only, English Only, Tamil Only) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-950/70 rounded-xl border border-stone-800">
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 px-2">Scope:</span>
            <button
              onClick={() => setExportMode('all')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'all'
                  ? 'bg-stone-700 text-stone-100 shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Full</span>
            </button>
            <button
              onClick={() => setExportMode('video-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'video-only'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow'
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>1) Video Gen Only</span>
            </button>
            <button
              onClick={() => setExportMode('youtube-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'youtube-only'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-purple-400/80 hover:text-purple-300'
              }`}
            >
              <Hash className="w-3 h-3" />
              <span>2) YouTube Alone</span>
            </button>
            <button
              onClick={() => setExportMode('english-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'english-only'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <Copy className="w-3 h-3" />
              <span>Title Only</span>
            </button>
            <button
              onClick={() => setExportMode('tamil-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'tamil-only'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <Copy className="w-3 h-3" />
              <span>Description Only</span>
            </button>
            <button
              onClick={() => setExportMode('expressions-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'expressions-only'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-amber-300/80 hover:text-amber-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>3) Character Expressions</span>
            </button>
            <button
              onClick={() => setExportMode('nkjv-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'nkjv-only'
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow'
                  : 'text-emerald-300/80 hover:text-emerald-200'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>4) Scripture Verses</span>
            </button>
            <button
              onClick={() => setExportMode('verification-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'verification-only'
                  ? 'bg-teal-500 text-stone-950 font-bold shadow'
                  : 'text-teal-400/80 hover:text-teal-300'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Verification Only</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyAllEnglish}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all shadow"
              title="Copy list of all English titles in this batch"
            >
              {copiedType === 'english' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Titles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copy Title List</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAllTamil}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all shadow"
              title="Copy list of all Tamil descriptions with references in this batch"
            >
              {copiedType === 'tamil' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-400">Copied Descriptions!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Description List</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAllVerifications}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 text-xs font-semibold border border-teal-500/30 transition-all shadow"
              title="Copy Scripture Reference Checks & Translation Verifications for this batch"
            >
              {copiedType === 'verifications' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-teal-400">Copied Verifications!</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  <span>Copy Verification List</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAllTagsCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all shadow"
              title="Copy all tags in this batch as comma-separated values ready for YouTube Studio"
            >
              {copiedType === 'tags' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Tags (CSV)!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Tags (CSV)</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAllHashtagsCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-all shadow"
              title="Copy all hashtags in this batch as comma-separated values ready for YouTube Studio"
            >
              {copiedType === 'hashtags' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Hashtags (CSV)!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-400" />
                  <span>Copy Hashtags (CSV)</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all shadow"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied All!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {filteredBlueprints.length} Blueprints</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
              title="Download as Plain Text (.txt)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>TXT</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
              title="Download as JSON (.json)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* Text Preview Area */}
        <div className="p-5 flex-1 overflow-y-auto bg-stone-950 font-mono text-xs text-stone-300 leading-relaxed whitespace-pre-wrap select-all">
          {exportText}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/70 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ready for batch ingestion into AI generation pipelines</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
