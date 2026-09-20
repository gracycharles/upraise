import React, { useState } from 'react';
import { X, Copy, Check, Youtube, Sparkles, Clock, Compass, BookOpen, Heart, Radio } from 'lucide-react';

interface ChannelProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CHANNEL_NAME = "Gracy’s Biblical Echoes";
export const YOUTUBE_HANDLE = "@GracysBiblicalEchoes";
export const HOST_NAME = "Gracy";

export const OFFICIAL_CHANNEL_ABOUT = `Welcome to Gracy’s Biblical Echoes, hosted by Gracy.

Step back in time to 30 AD and experience the scriptures like never before. Through cinematic, historically immersive visuals and heartfelt audio, we bring the praises and prayers of Jesus’s disciples to life.

📖 What We Do:
• Daily Praises & Verses: 2 original bilingual (Tamil & English) praise videos posted every single day to fuel your quiet time.
• Authentic Biblical Context: Visuals crafted to accurately reflect the landscapes, culture, and atmosphere of Jesus's time on Earth.
• Bilingual Worship: Bridging Tamil and standard biblical English to bring deep, spiritual clarity to believers worldwide.

Whether you are looking for a quick daily moment of worship through YouTube Shorts, or seeking to visualize the world of the New Testament, this space is built to anchor your heart in the grace of God.

✨ “Praise be to You, Abba Father.”
Subscribe and journey through the word with us daily. 🙏✨`;

export const CHANNEL_TAGS = [
  "Gracy's Biblical Echoes",
  "GracysBiblicalEchoes",
  "1000 Praises Tamil",
  "Tamil Christian Shorts",
  "30 AD Jesus Disciples",
  "Biblical English Praises",
  "Daily Bible Quiet Time",
  "Tamil Bible Verses",
  "Abba Father Praise",
  "Christian YouTube Shorts",
  "Bilingual Worship Tamil English"
];

export const YOUTUBE_BANNER_PROMPT = `A cinematic ultra-wide 16:9 YouTube banner set in 30 AD Galilee at golden dawn. An authentic first-century stone overlook viewing the tranquil Sea of Galilee. Gentle morning mist rising from the water, soft amber and honey sunrise lighting, ancient olive trees with weathered silver-green leaves. Distant silhouettes of fishermen casting coarse hemp nets from wooden boats. Peaceful, sacred, historical authenticity, biblical realism, photorealistic, 8k resolution, no text, no modern elements. --ar 16:9 --v 6.0`;

export const ChannelProfileModal: React.FC<ChannelProfileModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-950/40">
              <Youtube className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-100 font-serif">
                  {CHANNEL_NAME}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-mono text-[11px] font-semibold">
                  {YOUTUBE_HANDLE}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Official YouTube Channel Identity & Studio Settings • Hosted by {HOST_NAME}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-300 text-xs sm:text-sm">
          
          {/* Channel Hero Card */}
          <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border border-amber-500/20 rounded-xl p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                  Official YouTube Brand
                </span>
                <h4 className="text-xl font-serif font-bold text-amber-200 mt-0.5">
                  Gracy’s Biblical Echoes
                </h4>
                <p className="text-xs text-stone-400 font-mono mt-0.5">
                  Handle: <strong className="text-stone-200">{YOUTUBE_HANDLE}</strong> • Host: <strong className="text-amber-300">{HOST_NAME}</strong>
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>2 Videos Every Single Day</span>
                </div>
                <span className="text-[11px] text-stone-400">
                  Morning & Evening Quiet Time
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/60">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">Daily Praises</div>
                  <div className="text-[11px] text-stone-400">2 bilingual videos daily for quiet time</div>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/60">
                <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">30 AD Judea & Galilee</div>
                  <div className="text-[11px] text-stone-400">Authentic 1st-century historical visuals</div>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/60">
                <Radio className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">Bilingual Worship</div>
                  <div className="text-[11px] text-stone-400">Tamil & Classical Biblical English</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section for YouTube Studio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Channel About & Bio (For YouTube Studio)
              </span>
              <button
                onClick={() => copyText(OFFICIAL_CHANNEL_ABOUT, 'about')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'about' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Bio</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 font-mono text-xs text-stone-300 whitespace-pre-line leading-relaxed selection:bg-amber-500/20">
              {OFFICIAL_CHANNEL_ABOUT}
            </div>
          </div>

          {/* Recommended Channel Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Recommended Channel Keywords & Tags
              </span>
              <button
                onClick={() => copyText(CHANNEL_TAGS.join(', '), 'tags')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'tags' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Tags!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Tags</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-stone-950 p-3 rounded-xl border border-stone-800">
              {CHANNEL_TAGS.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300 font-mono text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Channel Banner AI Generation Prompt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Midjourney Prompt for YouTube Channel Banner (16:9)
              </span>
              <button
                onClick={() => copyText(YOUTUBE_BANNER_PROMPT, 'banner')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'banner' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Banner Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 font-mono text-xs text-stone-300 leading-relaxed">
              {YOUTUBE_BANNER_PROMPT}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-6 py-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>“Praise be to You, Abba Father.” — Short #1</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
