import React, { useState } from 'react';
import { X, Film, Youtube, Check, RotateCcw, Sparkles } from 'lucide-react';
import { CompletionStatusMap } from '../types';
import { 
  setVideoGeneratedUpTo, 
  setYouTubeDeployedUpTo, 
  getCompletionMetrics,
  createDefaultCompletionStatus,
  saveCompletionStatus
} from '../utils/completionStorage';

interface CompletionBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  completionStatusMap: CompletionStatusMap;
  onUpdateStatusMap: (newMap: CompletionStatusMap) => void;
  totalCount: number;
}

export const CompletionBatchModal: React.FC<CompletionBatchModalProps> = ({
  isOpen,
  onClose,
  completionStatusMap,
  onUpdateStatusMap,
  totalCount = 300,
}) => {
  const metrics = getCompletionMetrics(completionStatusMap, totalCount);
  const [videoUpToInput, setVideoUpToInput] = useState<number>(metrics.videoCount || 47);
  const [ytUpToInput, setYtUpToInput] = useState<number>(metrics.ytCount || 30);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleApplyVideoRange = () => {
    const val = Math.max(0, Math.min(totalCount, Number(videoUpToInput) || 0));
    const updated = setVideoGeneratedUpTo(completionStatusMap, val, totalCount);
    onUpdateStatusMap(updated);
    showNotification(`Marked Shorts #1 to #${val} as Video Generated!`);
  };

  const handleApplyYouTubeRange = () => {
    const val = Math.max(0, Math.min(totalCount, Number(ytUpToInput) || 0));
    const updated = setYouTubeDeployedUpTo(completionStatusMap, val, totalCount);
    onUpdateStatusMap(updated);
    showNotification(`Marked Shorts #1 to #${val} as YouTube Deployed!`);
  };

  const handleResetToPresets = () => {
    const preset = createDefaultCompletionStatus(totalCount);
    saveCompletionStatus(preset);
    onUpdateStatusMap(preset);
    setVideoUpToInput(47);
    setYtUpToInput(30);
    showNotification('Reset to defaults: #1–30 YouTube Deployed & #1–47 Video Generated!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif">
                Production & Deployment Progress
              </h3>
              <p className="text-xs text-stone-400">
                Manage batch bookmarks for Video Generation & YouTube Deployment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {notification && (
            <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Current Status Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Video Generated Card */}
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Film className="w-4 h-4 text-indigo-400" />
                  Video Generated
                </span>
                <span className="text-[11px] bg-indigo-500/20 px-2 py-0.5 rounded font-bold">
                  {metrics.videoCount} / {totalCount}
                </span>
              </div>
              <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden border border-indigo-900/50">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${metrics.videoPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400 flex justify-between">
                <span>Completion:</span>
                <span className="font-mono text-indigo-300 font-bold">{metrics.videoPercent}%</span>
              </div>
            </div>

            {/* YouTube Deployed Card */}
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-red-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Youtube className="w-4 h-4 text-red-400" />
                  YouTube Deployed
                </span>
                <span className="text-[11px] bg-red-500/20 px-2 py-0.5 rounded font-bold">
                  {metrics.ytCount} / {totalCount}
                </span>
              </div>
              <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden border border-red-900/50">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${metrics.ytPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400 flex justify-between">
                <span>Completion:</span>
                <span className="font-mono text-red-300 font-bold">{metrics.ytPercent}%</span>
              </div>
            </div>
          </div>

          {/* Batch Range Setters */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
              Set Batch Completion Range
            </h4>

            {/* Batch Video Generated */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-indigo-400" />
                  Mark Video Generated up to Short #:
                </span>
                <span className="text-[10px] text-stone-500 font-mono">1 to {totalCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={totalCount}
                  value={videoUpToInput}
                  onChange={(e) => setVideoUpToInput(Number(e.target.value))}
                  className="w-28 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-sm font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleApplyVideoRange}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Video Range (1–{videoUpToInput})</span>
                </button>
              </div>
            </div>

            {/* Batch YouTube Deployed */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                  <Youtube className="w-3.5 h-3.5 text-red-400" />
                  Mark YouTube Deployed up to Short #:
                </span>
                <span className="text-[10px] text-stone-500 font-mono">1 to {totalCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={totalCount}
                  value={ytUpToInput}
                  onChange={(e) => setYtUpToInput(Number(e.target.value))}
                  className="w-28 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-sm font-mono text-red-300 focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={handleApplyYouTubeRange}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply YouTube Range (1–{ytUpToInput})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-6 py-3.5 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            onClick={handleResetToPresets}
            className="text-xs text-stone-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
            title="Reset bookmarks to user specification: 1..30 YouTube Deployed & 1..47 Video Generated"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard Specification (1–30 YT, 1–47 Video)</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
